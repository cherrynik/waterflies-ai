# Constants

This directory contains all application constants organized by functionality.

## Files

- **`app.constants.ts`** - General application constants (API endpoints, error messages, models, etc.)
- **`prompts.constants.ts`** - AI prompts and examples for OpenAI interactions

## Usage

```typescript
import { OPENAI_MODELS } from './constants/app.constants';
import { AI_PROMPTS } from './constants/prompts.constants';
```

## Adding New Constants

1. Add constants to the appropriate file
2. Use `as const` for type safety
3. Group related constants in objects
4. Export for use in other modules
