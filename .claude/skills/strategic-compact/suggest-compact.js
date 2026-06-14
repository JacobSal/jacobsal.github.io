#!/usr/bin/env node
/*
 * strategic-compact / suggest-compact.js
 *
 * PreToolUse (Edit|Write) hook. Counts tool invocations per session and
 * suggests a manual `/compact` at a configurable threshold, then reminds
 * periodically. Behavior is specified in SKILL.md.
 *
 * Config (env):
 *   COMPACT_THRESHOLD  - tool calls before first suggestion (default 50)
 *   COMPACT_REMIND     - reminder interval after threshold (default 25)
 *
 * Contract: read hook JSON from stdin, never block (always exit 0). Emit a
 * Claude Code hook response with `systemMessage` only when a suggestion fires;
 * otherwise emit nothing. All failures are swallowed so the hook can never
 * break a tool call.
 */

const fs = require("fs");
const os = require("os");
const path = require("path");

const THRESHOLD = parseInt(process.env.COMPACT_THRESHOLD || "50", 10);
const REMIND = parseInt(process.env.COMPACT_REMIND || "25", 10);

function readStdin() {
  try {
    return fs.readFileSync(0, "utf-8");
  } catch (_) {
    return "";
  }
}

function main() {
  const raw = readStdin();
  let sessionId = process.env.CLAUDE_SESSION_ID || "";
  if (!sessionId) {
    try {
      const data = JSON.parse(raw || "{}");
      sessionId = data.session_id || data.sessionId || "default";
    } catch (_) {
      sessionId = "default";
    }
  }

  const stateFile = path.join(
    os.tmpdir(),
    `strategic-compact-${sessionId}.count`
  );

  let count = 0;
  try {
    count = parseInt(fs.readFileSync(stateFile, "utf-8").trim(), 10) || 0;
  } catch (_) {
    count = 0;
  }
  count += 1;
  try {
    fs.writeFileSync(stateFile, String(count), "utf-8");
  } catch (_) {
    // non-fatal
  }

  let message = null;
  if (count === THRESHOLD) {
    message =
      `Strategic compact: ${count} tool calls this session. Consider ` +
      `\`/compact\` at the next logical boundary (after research/before ` +
      `execution, or after a milestone). See strategic-compact SKILL.md.`;
  } else if (count > THRESHOLD && (count - THRESHOLD) % REMIND === 0) {
    message =
      `Strategic compact reminder: ${count} tool calls. If you just ` +
      `finished a phase, \`/compact\` to free context before the next one.`;
  }

  if (message) {
    process.stdout.write(JSON.stringify({ systemMessage: message }));
  }
  process.exit(0);
}

try {
  main();
} catch (_) {
  process.exit(0);
}
