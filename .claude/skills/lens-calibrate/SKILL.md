---
name: lens-calibrate
description: Customize quantum lens configuration - enable/disable lenses, adjust depth defaults
user-invocable: true
---

# /lens-calibrate

Customize your quantum lens setup. Enable/disable lenses, adjust depth mode defaults, add custom lenses, tune anti-convergence pressure.

**User input:** `$ARGUMENTS` (interactive or direct commands)

---

## Commands

### View Current Config

```
/lens-calibrate --show
```

Displays:
- Active lenses per depth mode
- Current defaults
- Custom lenses (if any)
- Anti-convergence settings

### Enable/Disable Lenses

```
/lens-calibrate --disable void-reader
/lens-calibrate --enable temporal-archaeologist
/lens-calibrate --depth deep --only paradox-hunter,boundary-dissolver
```

Options:
- `--disable LENS`: Remove lens from all modes
- `--enable LENS`: Add lens back
- `--depth MODE --only LENS1,LENS2`: Override depth mode lens selection
- `--reset`: Restore defaults

### Add Custom Lens

```
/lens-calibrate --add-custom "lens-name" "cognitive mode description"
```

Creates new lens entry. Will prompt for:
- Lens name
- Cognitive mode
- Core question
- Wave compatibility (quick/standard/deep)
- Output section name
- Quantum instrument to use

### Adjust Defaults

```
/lens-calibrate --default-depth standard
/lens-calibrate --anti-convergence high
```

Options:
- `--default-depth MODE`: Set default mode (quick|standard|deep)
- `--anti-convergence LEVEL`: Pressure level (low|standard|high)

### Interactive Mode

```
/lens-calibrate --wizard
```

Guided configuration with prompts for each setting.

---

## Configuration Storage

Settings saved to:
```
.claude/scenarios/quantum-lens/config/user-config.json
```

Format:
```json
{
  "defaultDepth": "standard",
  "antiConvergencePressure": "standard",
  "lenses": {
    "quick": ["void-reader", "failure-romantic"],
    "standard": ["void-reader", "paradox-hunter", "boundary-dissolver", "failure-romantic"],
    "deep": ["void-reader", "paradox-hunter", "boundary-dissolver", "temporal-archaeologist", "scale-shifter", "failure-romantic"]
  },
  "customLenses": [
    {
      "id": "custom-lens-1",
      "name": "Example Lens",
      "cognitiveMode": "Description",
      "coreQuestion": "What is the question?",
      "waves": ["standard", "deep"],
      "outputSection": "Output Name"
    }
  ],
  "disabled": []
}
```

---

## Examples

```
/lens-calibrate --show
/lens-calibrate --disable void-reader
/lens-calibrate --depth deep --only paradox-hunter,boundary-dissolver,temporal-archaeologist
/lens-calibrate --default-depth deep
/lens-calibrate --anti-convergence high
/lens-calibrate --reset
/lens-calibrate --wizard
```

---

## Implementation

1. **Display**: Show current settings via Read of config file
2. **Parse**: Extract command flags from arguments
3. **Validate**: Check lens names against available lenses
4. **Update**: Modify config.json with changes
5. **Confirm**: Show diff of old vs new settings
6. **Persist**: Write updated config

---

## Built-in Lenses (Cannot Delete)

- void-reader
- paradox-hunter
- boundary-dissolver
- temporal-archaeologist
- scale-shifter
- failure-romantic

Custom lenses can be added and removed freely.

