<!--
SPDX-FileCopyrightText: (C) 2026 Hong Yongmin (https://revi.xyz/) <yewon@revi.email>

SPDX-License-Identifier: Apache-2.0
-->

# Repository Guidelines

## Project Structure & Module Organization

The Docusaurus site lives in `docusaurus/`: pages and posts are in `src/pages/`
and `blog/`, components and theme overrides in `src/components/` and
`src/theme/`, styles in `src/css/`, translations in `i18n/`, and public files in
`static/`. Playwright tests live in `tests/`, automation in `scripts/`, and
vendored tools in `third-party/`.

## Build, Test, and Development Commands

Use the Node.js version specified in `.node-version` and install the locked
dependency tree with `npm ci`.

- `npm run dstart`: clear caches and start the development server.
- `npm run dbuild`: create a production build in `docusaurus/build/`.
- `npm test`: run all Playwright projects; install browsers first with
  `npm run pw:i`.
- `npm run lint`: run all linters; build first for HTML validation.
- `npm run p:w -- .`: format the repository with Prettier.

If `arc` is installed, also try `arc lint`.

## Coding Style & Naming Conventions

Follow `.editorconfig`: UTF-8, LF endings, two-space indentation, final
newlines, no trailing whitespace, and an 80-column target. Use Prettier, ESLint,
Stylelint, and Markdownlint. Name React components in PascalCase and tests as
descriptive `*.spec.ts` files. Preserve date-based blog names. Add appropriate
SPDX headers to new files; use `reuse annotate` when practical.

## Testing Guidelines

Use user-visible Playwright locators such as roles and accessible names. Add a
focused spec in `tests/` for changed routes or behavior.
Run `npm run dbuild` and `npm test` before review. There is no numeric coverage
threshold; the configured desktop and mobile browser checks are the acceptance
signal.

## Commit & Pull Request Guidelines

Follow `CONTRIBUTING.md`: prefer `(area): what changed`, for example
`docusaurus: fix footer link`, keep the title below 72 characters, leave the
second line blank, and wrap body text near 72 columns. Include a
`Signed-off-by:` trailer for DCO acceptance. Use `Ref T123`, `Fix T123`, or
`Depends on D123` when applicable.

Most changes use `arc diff` and Differential review, though external pull
requests are welcome and may be imported there. PRs should explain the change,
link relevant tasks, provide a concrete test plan, and include screenshots for
UI changes. Ensure required CodeQL, JSON, and YAML checks pass.

## Automated Contributor Guidance

All automated contributors must follow shared rules, preserve work, run
checks, and report skipped validation. Keep tool-only guidance below.

Under Agent-Specific Notes, each agent may edit only its own section. Before
editing another agent's section, present the proposed change to a human and
obtain approval.

When an LLM authors or materially contributes to a commit, append the following
trailers identifying the agent, model, reasoning configuration, and co-author.
For user-facing communication, append the same metadata lines only to the final
response, not to intermediate updates, so they can be copied directly. Use the
actual values exposed in the current session. Do not guess missing model or
reasoning details; write `not-exposed` when the runtime does not expose a value.
Use a valid `Agent name <agent@email>` identity in the `Co-authored-by:`
trailer. In final responses, place the lines after all other content in a
triple-backtick fenced code block. In commit messages, keep the trailers
unfenced.

```
LLM-Agent: <tool name>
LLM-Model: <provider and model identifier> <reasoning effort or configuration>
Co-authored-by: Agent name <agent@email>
```

## Agent-Specific Notes

### Antigravity

Prefer dedicated tools (`view_file`, `grep_search`, `list_dir`,
`replace_file_content`, `multi_replace_file_content`) for file discovery and
edits. Use `run_command` for build and test execution, and subagents or
background tasks for long-running operations. Before editing, inspect the
working tree and preserve user-owned changes.

Report the model name and reasoning level separated with parentheses, such as
`Google Gemini 3.6 Flash (high)`. When authoring commits or ending final
user-facing responses, include `LLM-Agent: Antigravity`, the formatted
`LLM-Model` details, and the `Co-authored-by:` trailer. Check active session
metadata, user setting updates, or session context to determine model and
reasoning level before using `not-exposed`.

Run checks appropriate to the change and report any validation that was
skipped.

### Codex

Prefer `rg` and `rg --files` for discovery and `apply_patch` for targeted edits.
Before editing, inspect the working tree and treat existing changes as
user-owned. Keep updates concise, scope edits to the request, and do not discard
or overwrite unrelated work.

Report the complete model identifier and reasoning effort exposed by the Codex
runtime, such as `OpenAI gpt-5.6-sol (medium)`. Do not shorten a known
identifier to a broad family name such as `GPT-5`; treat a generic family name
as insufficient and potentially stale. Check the active session's runtime
metadata or turn context first, then the model selector or status line, Codex
session logs or rollouts, the local model cache (`~/.codex/models_cache.json`),
and the default user configuration (`~/.codex/config.toml`) before reporting
`not-exposed`. Prefer active-session metadata over defaults, which an override
may supersede.

Run checks appropriate to the change and report any validation that was
skipped.

### Grok Build

Prefer dedicated tools (`grep`, `read_file`, `search_replace`, `list_dir`) for
discovery and edits. Use the shell for builds, tests, package scripts, and git;
it does not provide `grep`, `find`, `head`, `tail`, `sed`, or `awk`. Before
editing, inspect the working tree and treat existing changes as user-owned.
Keep updates concise, scope edits to the request, and do not discard or
overwrite unrelated work. Confirm before destructive or irreversible actions
(force-push, hard reset, deleting shared state).

When authoring commits, include `LLM-Agent: Grok Build` and the session model
details in the trailers. Report the complete model identifier and reasoning
effort together, such as `xAI grok-4.5 (high)`. Do not omit a known effort
level or fall back to `not-exposed` without checking the sources below; the
TUI often shows the active effort in parentheses next to the model (for
example `(high)`, `(medium)`, `(low)`, or `(xhigh)`).

Resolve values in this order, and prefer active-session state over defaults
(an override may supersede catalog or config defaults):

1. Turn or runtime metadata for the current session.
2. The agent UI: status line, model picker (`Ctrl+M` / `/model`), and
   `/session-info` (aliases `/status`, `/info`).
3. Explicit effort controls: `/effort` and `/model <name> <effort>`.
4. User config (`~/.grok/config.toml`, including
   `[models].default_reasoning_effort` when set).
5. The local model catalog (`~/.grok/models_cache.json`), including each
   model's `reasoning_effort` default and `supports_reasoning_effort`.

Use `not-exposed` only for a field that remains unavailable after those
checks. Do not invent an effort level that no source shows.

Run checks appropriate to the change and report any validation that was
skipped.
