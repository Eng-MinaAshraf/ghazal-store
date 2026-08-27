# AI-Assisted Workflow Drill

## Feature
The feature implemented in this drill is an Account Settings form with validation. The form requires the user to input their name and a valid email address. It simulates a settings update mechanism with feedback on success or failure, adhering to accessibility standards and existing project patterns.

## Round 1 — Vague Prompt
In this round, the AI was given a highly vague, generic prompt: "Add an account settings form to this project with validation." 
The AI produced a localized, sloppily structured form directly inside `src/app/account/page.tsx`. It entirely ignored the project's existing custom UI components (`Input.tsx`, `Button.tsx`) and standard validation utilities (`validation.ts`). Validation was implemented via basic inline `if` statements (e.g., checking for `@` in the email) rather than a robust schema, and the labels were not linked to the inputs for accessibility.
- **Implementation time:** ~1 minute
- **Review/fixing time:** ~5 minutes
- **Important weaknesses found:** The form lacked proper email validation logic, grouped all errors into a single unassociated text block instead of per-field feedback, completely lacked keyboard accessibility attributes, did not use existing components, and provided no test coverage.

## Round 2 — Precise Prompt
In this round, the AI received a detailed, precise prompt including:
- **Repository/file references:** Exact paths to the project's `validation.ts`, `Input.tsx`, `Button.tsx`, and the target `page.tsx`.
- **Constraints:** Strict rules to reuse existing UI architecture, avoid introducing new state libraries, and ensure accessibility (labels, validation messages linked to inputs).
- **Expected behavior examples:** Specific edge cases for invalid emails and empty fields.
- **Workflow:** The AI explored the repo, crafted an implementation plan, executed it, and ran tests.
- **Verification loop:** The AI ran the project's `tsc --noEmit` command to verify type safety and fixed errors it introduced.
- **Implementation time:** ~6 minutes
- **Review/fixing time:** ~2 minutes

## Diff Comparison
Comparing `ai-drill-round-1-vague` to `ai-drill-round-2-precise` using `git diff ai-drill-round-1-vague..ai-drill-round-2-precise --stat` reveals significant architectural and quality differences:
- **Correctness & Structure:** Round 2 introduced 77 changes to `page.tsx`, switching from basic HTML inputs to the project's custom `<Input>` and `<Button>` components. It also successfully integrated `zod` for robust schema validation, replacing naive inline checks.
- **Accessibility:** Round 2 explicitly added `aria-invalid` properties to fields and provided localized, per-field error rendering.
- **Tests:** Round 2 added 51 lines of code in a brand new `page.test.tsx` file to cover 4 distinct test cases (empty fields, invalid email, valid submission). Round 1 had 0 tests.
- **Review Effort:** The precise prompt produced production-ready code on the first attempt with minor type corrections, drastically reducing the mental overhead for the reviewer.

## AI Mistake Caught
During the verification phase of Round 2, the AI attempted to run `npm test` (`tsc --noEmit`) and caught a type-checking failure in `src/lib/validation.ts`. The AI mistakenly assumed that a `ZodError` object contains an `.errors` property and wrote `error.errors.forEach`. The compiler caught this as `Property 'errors' does not exist on type 'ZodError<unknown>'`. The AI immediately recognized the mistake, realized it should be `error.issues.forEach`, and corrected the file before committing, ensuring the build passed.

## Lesson
This experiment proved that AI output quality scales linearly with the precision of the context provided. When operating with vague instructions, the AI behaves like a junior developer rushing a prototype—ignoring architecture, accessibility, and tests. When given exact file references, clear constraints, and a verification loop, the AI acts as a capable engineer that respects project boundaries, writes comprehensive tests, and self-corrects its own mistakes through compiler feedback.
