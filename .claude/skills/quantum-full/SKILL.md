---
name: quantum-full
description: Complete pipeline - perception analysis followed by solution engineering
user-invocable: true
mcp-required:
  - firecrawl
  - kairn
mcp-optional: true
---

# /quantum-full

Complete quantum-lens pipeline: **QL × SE** (not QL + SE).

Runs full perception (7 lenses, interference detection) followed by solution engineering that uses the cruxes and killer question to engineer solutions.

**User input:** `$ARGUMENTS`

Parse arguments:
- `<input>` (required): URL, problem description, or concept
- `--depth MODE`: Force perception depth (quick|standard|deep). Default: standard
- `--cascade`: Enable cascade for contra-mode solution (optional)

---

## Implementation

### Phase A: Run Perception (/quantum-lens)

Delegate full perception pipeline:

```
Agent: quantum-lens-orchestrator
Model: opus
Max turns: 20

Task:
1. Run /quantum-lens workflow on input
2. Generate full 8-section analysis
3. Extract cruxes and Killer Question
4. Return perception output
```

### Phase B: Smart Filter

Analyze perception output to determine solution approach:

1. Extract top 3-5 insights from perception
2. Identify decision points (where the Killer Question points)
3. Detect implicit barriers from cruxes
4. Route to solution mode:
   - If URL present in original input → **repo mode**
   - If problem framing in insights → **problem mode**
   - If paradox or limit-breaking → **contra mode**

### Phase C: Run Solution Engineering

Delegate solution engineering using perception context:

```
Agent: solution-synthesizer-agent
Model: opus
Max turns: 15

Task:
1. Receive perception output + identified barriers from Smart Filter
2. Run full /quantum-solve workflow
3. Ground solutions in perception cruxes
4. Return 7-section solution report

Constraints:
- Use Killer Question to prioritize solutions
- Solutions must address identified cruxes
- Scoring must consider perception confidence
```

### Phase D: Synthesis Report

Create combined report (10-section output):

1. **Perception Summary** (condensed from QL output)
2. **Killer Question** (the crux)
3. **Atoms** (most relevant from perception)
4. **Divergence by Lens** (brief summary)
5. **Solution Roadmap** (from SE)
6. **Barrier Lifecycle** (how barriers change through solutions)
7. **Confidence-Banded Action Plan**
8. **Superposition: If Goal is X** (goal-conditioned collapse)
9. **Killer Insight** (highest-scoring combined insight)
10. **Next Questions** (follow-on killer questions)

---

## Output Format

```
# Quantum Analysis + Solution: [Input Title]

## 1. Perception Summary
[Condensed QL output]

## 2. Killer Question
[The crux]

## 3. Atoms
[Top 5-8 relevant atoms]

## 4. Lens Divergence
[Brief per-lens summary]

## 5. Solution Roadmap
[From SE, grounded in perception]

## 6. Barrier Lifecycle
[How barriers transform through solutions]

## 7. Confidence-Banded Action Plan
[What to do, in order, with confidence scores]

## 8. Superposition View
[Goal-conditioned collapse options]

## 9. Killer Insight
[Highest-impact combined insight]

## 10. Next Questions
[Follow-on Killer Questions]
```

---

## Examples

```
/quantum-full https://arxiv.org/abs/2502.12018
/quantum-full "We want to reduce onboarding time by 50% but can't cut any required steps"
/quantum-full concept: distributed systems consensus --depth deep
```

---

## Error Handling

| Error | Recovery |
|-------|----------|
| Perception fails | Stop, present error |
| Solution synthesis fails | Present perception output + raw roadmap |
| Smart filter misdetects mode | Present both repo and problem solutions |

---

## Notes

- QL × SE: Perception *informs* solution engineering, not just followed by it
- Cruxes from perception become the core of solution design
- Killer Question guides which solution paths matter most
- Combined output is typically 4000-6000 words for deep analysis

