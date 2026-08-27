# Ghazal Store Project Rules

These rules were established following the AI-Assisted Workflow Drill for Account Settings. AI assistants must follow these concrete guidelines when contributing to this codebase.

## 1. Form and Validation Architecture
Forms must use the project's existing validation pattern defined in `src/lib/validation.ts` leveraging the `zod` schema library. Do not write inline naive validation checks (e.g., `!email.includes('@')`). Instead, define a robust Zod schema (e.g., `z.string().email()`) and pass it through the `validateSchema` utility.

## 2. UI Components and Accessibility
All user-facing form inputs must use the custom `Input` component (`src/components/ui/Input.tsx`) and the custom `Button` component (`src/components/ui/Button.tsx`). Do not use raw `<input>` or `<button>` HTML tags. When using the `Input` component, you must ensure it receives an accessible `label` prop, and any validation errors must be passed via the `error` prop and associated correctly with the `aria-invalid` property.

## 3. Mandatory Test Coverage for New Features
Every new feature containing forms or validation logic must include a corresponding `.test.tsx` file (e.g., `page.test.tsx`). The test suite must cover:
- Required-field validation and empty states.
- Invalid input validation (e.g., invalid email formats).
- Valid submission behavior, including success UI feedback.
You must use `@testing-library/react` and ensure the tests pass under the project's type-checker (`tsc --noEmit`) before declaring a task complete.
