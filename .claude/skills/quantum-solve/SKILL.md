---
name: quantum-solve
description: Solution engineering from insights - works backward from goals to eliminate barriers
user-invocable: true
mcp-required:
  - firecrawl
  - kairn
mcp-optional: true
---

# /quantum-solve

Solution engineering engine. Takes insights or problems and designs concrete, executable adaptation roadmaps with confidence-banded scoring.

**User input:** `$ARGUMENTS`

Parse arguments:
- `<input>` (required): URL to repo/resource, problem description, or "contra: [limit to challenge]"
- `--cascade`: Enable cascade mode for contra-mode analysis (optional)

Auto-detects solution mode:
- **repo mode**: Input contains URL → "Can we use this? How do we adapt it?"
- **problem mode**: Problem description → "How do we break through this limitation?"
- **contra mode**: "contra:" prefix → "Why do we accept this limit? Can we break it?"

---

## Implementation

### Step 1: Parse & Mode Detection

- Extract input type (URL/text/contra)
- Determine solution mode
- Validate cascade flag applicability (only for contra mode)

### Step 2: Delegate S0 (Intake + Mode Detection)

Use Agent tool to spawn **intake-processor-agent** (adapted for solution mode):

```
Agent: intake-processor-agent
Model: sonnet
Max turns: 4

Task:
1. Parse input and detect solution mode
2. If URL: Scrape with firecrawl_scrape (markdown, onlyMainContent)
3. Extract key assumptions/claims
4. Return JSON with:
   - mode (repo|problem|contra)
   - raw_input
   - detected_barriers
   - assumptions[]

Constraints:
- Minimal processing
- Just decomposition
```

### Step 3: Delegate S1 (System Scan)

Spawn **system-comparator-agent**:

```
Agent: system-comparator-agent
Model: sonnet
Max turns: 6

Task:
1. Map input against your system (if repo mode)
2. Identify overlaps, gaps, collisions
3. Categorize barriers (assumed/mutable/temporal/immutable)
4. Return 3 sections:
   - Overlap Analysis
   - Gap Map
   - Collision Points

Constraints:
- Understand your system context
- Be specific about barriers
```

### Step 4: Optional S1.5 (Deep Dive for Repo Mode)

If mode == "repo":

```
Agent: system-comparator-agent
Model: sonnet
Max turns: 8

Task:
1. Deeper analysis of repo content
2. Map technical integration points
3. Identify adaptation requirements
4. Return extended barrier taxonomy
```

### Step 5: Delegate S2 (Engineering)

For **repo/problem modes**: Spawn both agents in parallel

```
Agent: reverse-engineer-agent
Model: opus
Max turns: 10

Task:
1. Work backward from goals
2. Challenge current barriers
3. Find wavelength changes (where could we shift approach?)
4. Return section: Reverse Path (goal → current state)
```

```
Agent: adaptation-architect-agent
Model: sonnet
Max turns: 8

Task:
1. Design executable adaptation paths
2. Include rollback strategies
3. Map resource/skill requirements
4. Return section: Adaptation Roadmap
```

For **contra mode**: Skip standard engineering, go to cascade (S2.5)

### Step 6: Optional S2.5 (Cascade for Contra + --cascade)

If mode == "contra" AND --cascade flag:

```
Agent: boundary-dissolver-agent
Model: sonnet
Max turns: 6

Task:
1. Challenge the limit itself
2. Find isomorphisms from other domains
3. Propose radical alternatives (ignore feasibility)
4. Return section: Limit-Breaking Options
```

### Step 7: Delegate S3 (Synthesis)

Spawn **solution-synthesizer-agent**:

```
Agent: solution-synthesizer-agent
Model: opus
Max turns: 10

Task:
1. Apply DSV-gated scoring (confidence-banded)
2. Devil's advocate each solution
3. Integrate all paths
4. Return 4 sections:
   - Scoring Summary (1-10 per solution, with confidence band)
   - Devil's Advocate (risks + mitigations)
   - Integrated Roadmap
   - Action Gate (what to do first)
```

### Step 8: Do S4 Inline (Persist)

1. Read template: `.claude/scenarios/quantum-lens/templates/solution-template.md`
2. Format output following template
3. Track barriers (assumed/mutable/temporal/immutable lifecycle)
4. Save if score >= 7 (via Kairn or outputs directory)

---

## Output

7-section solution report:

```
# Solution Engineering: [Input Title]

## 1. Problem/Goal Statement
[Mode + core question]

## 2. Barrier Analysis
[Categorized barriers with lifecycle]

## 3. System Map
[Overlap/gap/collision analysis]

## 4. Reverse Path
[Working backward from goal]

## 5. Adaptation Roadmap
[Executable steps with rollback]

## 6. Confidence-Banded Scoring
[Solutions ranked by confidence]

## 7. Action Gate
[What to do first + next steps]
```

---

## Examples

```
/quantum-solve https://github.com/example/repo
/quantum-solve "We're blocked by authentication latency in onboarding"
/quantum-solve contra: "Why do we require password authentication?"
/quantum-solve contra: "Can we eliminate the need for schema migration?" --cascade
```

---

## Error Handling

| Error | Recovery |
|-------|----------|
| URL fetch fails | Fall back to problem mode if user can paste content |
| No barriers detected | Note assumption and continue |
| Synthesis fails | Present raw roadmap without confidence scoring |

