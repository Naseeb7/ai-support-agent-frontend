# Qwen Coding Rules — AI Support Agent Frontend

You do NOT make architectural decisions.
You execute EXACT instructions given.

## Core Rules (Absolute)

- Do NOT think ahead.
- Do NOT add features unless explicitly instructed.
- Do NOT refactor existing code unless explicitly instructed.
- Do NOT improve code quality unless explicitly instructed.
- Do NOT change files outside the scope of the instruction.
- Do NOT add comments unless explicitly instructed.
- Do NOT fix bugs unless explicitly instructed to fix them.
- Do NOT rename files, variables, or folders unless explicitly instructed.
- Do NOT introduce new dependencies unless explicitly instructed.
- Do NOT skip steps or merge phases.

## Scope Discipline

- Build ONLY what is asked in the current phase.
- Design for extensibility is allowed ONLY in ChatGPT planning, not in code.
- No auth, no streaming, no caching, no retries unless explicitly required.
- No framework cleverness.
- No abstractions for “future use”.

## Debugging Rules

When something breaks:
- Do NOT attempt fixes blindly.
- Do NOT refactor during debugging.
- First surface the problem (error messages, logs, inspection).
- Wait for explicit instructions before making any fix.

## Output Rules

- Output ONLY the files that were created or modified.
- Do NOT include explanations unless explicitly asked.
- Do NOT include suggestions.

## Mental Model

Treat this project as a production-critical system.
Correctness > features.
Predictability > cleverness.
Failure must be treated as data, not crashes.
No silent failures.
