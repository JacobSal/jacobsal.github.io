---
name: quantum-review
description: Review past quantum lens analyses - effectiveness, recurring cruxes, patterns
user-invocable: true
mcp-required:
  - kairn
mcp-optional: true
---

# /quantum-review

Review, analyze, and learn from past quantum lens analyses.

**User input:** `$ARGUMENTS`

Parse arguments:
- `--recent N`: Show last N analyses (default: 10)
- `--since DATE`: Analyses after this date (YYYY-MM-DD)
- `--by-score`: Sort by breakthrough score (high to low)
- `--by-domain`: Group by domain
- `--crux-analysis`: Find recurring cruxes across analyses
- `--lens-effectiveness`: Which lenses produced breakthroughs?
- `--export`: Export summary to file

---

## Commands

### View Recent Analyses

```
/quantum-review --recent 10
/quantum-review --since 2024-01-01
/quantum-review --by-score
```

Shows:
- Title
- Domain
- Depth mode used
- Breakthrough score
- Top insight
- Date

### Domain Analysis

```
/quantum-review --by-domain
/quantum-review --by-domain "AI"
```

Groups analyses by domain, shows:
- Domain name
- Count of analyses
- Average breakthrough score
- Most common Killer Question pattern

### Crux Analysis

```
/quantum-review --crux-analysis
```

Finds recurring cruxes across all analyses:
- Most frequent cruxes (ranked)
- Which analyses share cruxes
- Patterns in crux types (assumed vs mutable vs temporal)
- Recommendations based on patterns

### Lens Effectiveness

```
/quantum-review --lens-effectiveness
```

Analyzes lens performance:
- Which lenses most frequently produce 8+ insights
- Which lenses generated 7+ breakthrough ideas
- Lens pairing effectiveness (which lenses together produce best results)
- Depth mode effectiveness (when does each mode excel?)

### Export Summary

```
/quantum-review --export analyses-summary.md
/quantum-review --recent 20 --export recent-analyses.md
```

Creates markdown report with selected analyses, patterns, insights.

### Detailed Review

```
/quantum-review --detail {analysis-id}
/quantum-review --detail "2024-01-15-ai-agents"
```

Shows full analysis with:
- All 8 sections
- Lens outputs
- Interference patterns
- Action items status (if tracked)

---

## Implementation

### Step 1: Source Data

If Kairn available:
```
kn_search type:insight tags:quantum-lens
```

Otherwise, read from outputs directory:
```
outputs/analyses/*.md
```

### Step 2: Parse & Index

For each analysis file:
- Extract metadata (date, title, domain, score)
- Parse cruxes and Killer Questions
- Index lenses used
- Store in memory (for session analysis)

### Step 3: Execute Analysis

Based on command:
- **--recent**: Sort chronologically, show summaries
- **--by-domain**: Group by extracted domain
- **--crux-analysis**: Aggregate crux data, find patterns
- **--lens-effectiveness**: Score each lens contribution

### Step 4: Generate Report

Format output as:
- Summary statistics (total analyses, avg score, domains covered)
- Requested analysis (recent, by-domain, cruxes, etc.)
- Patterns and recommendations
- Export if requested

---

## Output Examples

### Crux Analysis Output

```
## Recurring Cruxes Across 47 Analyses

### Most Frequent

1. "Assumption: Scale always requires coordination overhead"
   - Appears in: 8 analyses (AI/distributed systems/org design)
   - Type: Assumed
   - Related insights: 12
   
2. "Paradox: We need innovation AND stability"
   - Appears in: 6 analyses (product/engineering/strategy)
   - Type: Paradox
   - Suggested approach: Boundary-Dissolver lens for this domain
```

### Lens Effectiveness Output

```
## Lens Performance

### By Breakthrough Rate (7+ score)
1. Paradox Hunter: 78% (breakthrough on 18/23 analyses)
2. Boundary Dissolver: 71% (16/22)
3. Temporal Archaeologist: 65% (11/17)
4. Void Reader: 52% (13/25)

### Most Productive Lens Pairs
1. Paradox Hunter + Boundary Dissolver: avg 7.8 score
2. Temporal Archaeologist + Scale Shifter: avg 7.4 score
3. Void Reader + Paradox Hunter: avg 7.1 score

### Best Depth Mode by Domain
- AI/Technical: Deep (avg 7.9)
- Strategy/Business: Standard (avg 7.2)
- Architecture/Design: Standard (avg 7.1)
```

---

## Examples

```
/quantum-review
/quantum-review --recent 5
/quantum-review --by-domain
/quantum-review --crux-analysis
/quantum-review --lens-effectiveness
/quantum-review --since 2024-06-01
/quantum-review --by-score
/quantum-review --export summary.md
/quantum-review --detail "2024-06-01-distributed-systems"
```

---

## Error Handling

| Error | Recovery |
|-------|----------|
| No analyses found | Show message "No previous quantum lens analyses found. Start with /quantum-lens" |
| Kairn unavailable | Fall back to outputs directory |
| File parse fails | Skip that analysis, continue with others |
| Export fails | Present summary in chat instead |

---

## Data Persistence

Analyses stored via:
1. **Kairn** (if available): type=insight, tags=[quantum-lens, domain, lenses]
2. **File system** (fallback): outputs/analyses/{date}-{title}.md

Review works with either source seamlessly.

