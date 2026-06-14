---
name: quantum-lens
description: Run a radical multi-perspective deconstruction analysis using quantum-inspired cognitive lenses
user-invocable: true
mcp-required:
  - firecrawl
  - kairn
mcp-optional: true
---

# /quantum-lens

Radical multi-perspective deconstruction engine. Decomposes input into atomic claims, runs through parallel cognitive lenses with enforced anti-convergence, detects interference patterns, identifies cruxes, and produces actionable insights.

**User input:** `$ARGUMENTS`

Parse arguments:
- `<input>` (required): URL, pasted text, or concept (prefix with "concept: ")
- `--depth MODE`: Force depth mode (quick|standard|deep). Default: auto-detect
- `--lenses LENS1,LENS2`: Override depth selection with specific lenses

Natural language depth detection:
- "deep/volles/full/alle" → `deep`
- "quick/schnelles/kurze" → `quick`
- Default → `standard` (or auto from input length)

---

## Workflow Overview

**Phase 0: Intake + Atomization** → Break input into tagged atoms, generate naive reading, detect domain/divergence

**Phase 1: Diverge** → Run 2-6 cognitive lenses in parallel based on depth mode

**Phase 2: Interfere** → Meta-analysis: find convergence/divergence patterns, cruxes, isomorphisms, Killer Question

**Phase 3: Converge** → Synthesize into 8-section analysis report with breakthrough scoring

---

## Implementation

### Step 1: Parse & Validate Input

- Check if input is empty → prompt user for analysis target
- Detect input type: URL (http/https), text file path, or raw text
- If URL: mark for firecrawl scraping
- Extract depth mode from natural language if no explicit flag

### Step 2: Delegate Phase 0 (Intake)

Use Agent tool to spawn **intake-processor-agent**:

```
Agent: intake-processor-agent
Model: sonnet
Max turns: 6

Task:
1. Process raw input into 5-12 tagged atoms (AoT decomposition)
2. Generate naive reading (1-2 paragraphs)
3. Detect input domain and divergence level
4. If URL: Use firecrawl_scrape (markdown, onlyMainContent)
   Fallback: Use WebFetch if firecrawl unavailable
5. Return JSON with:
   - atoms[] (id, text, type, tags)
   - naive_reading
   - domain
   - divergence_level
   - input_mode (url|text|concept)

Constraints:
- Do NOT analyze or interpret
- Just decompose
- Reference quantum-lens scenario knowledge files for context
```

### Step 3: Delegate Phase 1 (Diverge - Parallel Lenses)

Based on detected depth, spawn parallel agents:

**Quick Mode** (2 lenses):
- void-reader-agent
- failure-romantic-agent

**Standard Mode** (4 lenses) [default]:
- void-reader-agent
- paradox-hunter-agent
- boundary-dissolver-agent
- failure-romantic-agent

**Deep Mode** (6 lenses):
- void-reader-agent
- paradox-hunter-agent
- boundary-dissolver-agent
- temporal-archaeologist-agent
- scale-shifter-agent
- failure-romantic-agent

For each lens agent:

```
Agent: {lens}-agent
Model: sonnet
Max turns: 8

Task:
1. Read lens definition from .claude/scenarios/quantum-lens/agents/{lens}-agent.md
2. Apply cognitive mode + quantum instrument to atoms
3. Produce 3-5 raw insights (unfiltered, wild)
4. Tag each insight semantically
5. Contradict at least 2 claims from naive reading with evidence
6. Produce REQUIRED output section (per lens type):
   - Void Reader: Absence Map
   - Paradox Hunter: Impossibility Register
   - Boundary Dissolver: Boundary Map
   - Temporal Archaeologist: Temporal Dig
   - Scale Shifter: Scale Map
   - Failure Romantic: Failure Love Letter
7. Reference specific atom IDs

Constraints:
- Be disagreeable
- These are perception instruments, not advisors
- No synthesis or resolution
- Must contradict naive reading
```

**Inter-phase gate**: Verify at least 1 lens contradicts the naive reading. If all affirm without contradiction, re-run with anti-convergence pressure note.

### Step 4: Delegate Phase 2 (Interfere)

Spawn **interference-reader-agent**:

```
Agent: interference-reader-agent
Model: opus
Max turns: 12

Task:
1. Read all lens outputs
2. Map constructive interference (convergence points)
3. Map destructive interference (contradictions)
4. Identify CRUXes (minimal factual claims resolving disagreements)
5. Find cross-lens isomorphisms via structure-mapping
6. Apply 80/20 relevance filter
7. Formulate Killer Question (MUST be specific, reference an atom, have YES/NO implications)
8. Return 4 sections:
   - Constructive Map
   - Destructive Map + Cruxes
   - Isomorphisms
   - Killer Question

Constraints:
- Generic questions fail
- If question could apply to any input, it has failed
- Question must be testable

Input context:
- Labeled lens output blocks (one per active lens)
- atoms[], naive_reading, domain, depth, input_title
```

### Step 5: Do Phase 3 Inline (Converge)

1. Read template: `.claude/scenarios/quantum-lens/templates/analysis-template.md`
2. Assemble 8 sections following template:
   - Section 1: Atoms (top 5-8)
   - Section 2: Naive Reading + Domain
   - Section 3: Divergence Summary (per lens)
   - Section 4: Convergence Map
   - Section 5: Killer Question + Cruxes
   - Section 6: Top 3-5 Insights with action paths
   - Section 7: Superposition View
   - Section 8: Breakthrough Scoring
3. Assign Breakthrough Score (1-10) per insight:
   - 1-3: Conventional reframing
   - 4-6: Non-obvious connection
   - 7-8: Genuine breakthrough
   - 9-10: Paradigm-level
4. Calculate overall score (average of top 3 insights)

### Step 6: Persist (Optional)

Based on overall score:
- Score >= 7: If Kairn available, auto-save via `kn_learn` (type: insight, tags: [quantum-lens, domain, lenses])
  Otherwise: save to `outputs/analyses/{date}-{title}.md`
- Score >= 9: Also save extended analysis
- Score < 7: Conversational only

---

## Output

Full 8-section analysis following the template. All sections required.

Example structure:

```
# Quantum Lens Analysis: [Input Title]

## 1. Atoms
[Top 5-8 atomized claims]

## 2. Naive Reading
[Initial 1-2 paragraph interpretation]
Domain: [domain]
Divergence Level: [level]

## 3. Divergence by Lens
[Per-lens insights summary]

## 4. Convergence Map
[Where lenses agree]

## 5. Cruxes & Killer Question
[Minimal claims + testable question]

## 6. Top Insights with Action Paths
[3-5 actionable insights with scores]

## 7. Superposition View
[Goal-conditioned collapse options]

## 8. Breakthrough Scoring
[Overall score + calibration notes]
```

---

## Examples

```
/quantum-lens https://arxiv.org/abs/2502.12018
/quantum-lens "AI agents will replace 80% of knowledge workers by 2030"
/quantum-lens concept: the attention economy
/quantum-lens "long article text..." --depth standard
/quantum-lens https://blog.example.com/post --depth quick
```

---

## Error Handling

| Error | Recovery |
|-------|----------|
| No input provided | Prompt user for analysis target |
| URL fetch fails (firecrawl & WebFetch down) | Stop and ask user to paste content instead |
| All lenses affirm without contradiction | Re-run with anti-convergence pressure note |
| Killer Question is generic | Note for prompt revision and present question anyway |
| File I/O fails on save | Continue analysis, skip save, inform user |

---

## Knowledge References

Required files for agent context:
- `.claude/scenarios/quantum-lens/knowledge/quantum-framework.md`
- `.claude/scenarios/quantum-lens/knowledge/lens-definitions.md`
- `.claude/scenarios/quantum-lens/knowledge/anti-convergence-rules.md`
- `.claude/scenarios/quantum-lens/knowledge/instrument-procedures.md`
- `.claude/scenarios/quantum-lens/knowledge/scoring-rubric.md`
- `.claude/scenarios/quantum-lens/agents/{lens}-agent.md` (per active lens)
- `.claude/scenarios/quantum-lens/templates/analysis-template.md`

