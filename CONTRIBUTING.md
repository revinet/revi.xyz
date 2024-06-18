# Contributiion Docs

> [!NOTE]
>
> This is a WIP document.

(mostly for self-documentation purpose though)

Most of commit go through [`arc`](https://we.phorge.it/book/phorge/article/arcanist/) (AKA `arcanist`),
which is part of [phorge](https://we.phorge.it)'s differential code-review system.
`arc` handles basic lints like json syntax check, yamllint.

<!-- eslint and prettier TBD. -->

There are some cases where commit do not go through Arcanist:

- Dependabot/renovatebot commits, which doesn't have arcanist
  (phorge differential) support.
- Hotfix to unbreak obvious mistakes (ie. typo, build error fixable by quick commit)

If you are not me and are about to submit Pull Request, feel free to do so.
However please note that your PR will be imported to Differential via arc and
code-reviewed there, and my phorge instance requires an account to see
differential revisions.

The rest are mostly for my future reference, but this is written as if I'm
explaining this to third party.

## Glossary

- `arc`: [arcanist](https://we.phorge.it/book/phorge/article/arcanist/), phorge's cli tool.
- `Differential`: Phorge's [pre-commit code review tool](https://we.phorge.it/book/phorge/article/differential/)
- `Herald`: Phorge's [ruleset engine](https://we.phorge.it/book/phorge/article/herald/).
- `Maniphest`: Phorge's issue/task/work management tool.
- `Phorge`: [Phorge](https://we.phorge.it), you may be more familiar with `Phabricator`.
- `Revision`: One unit of review uploaded for commit in `Phorge` `Differential`.
  Revisions are identified by their number, in `D<number>` format.
- `Task`: The same thing as GitHub Issue. Tasks are identified by their
  number, in `T<number>` format.

## Commit Message

- See also:
  - [How to write a Git Commit Message](https://cbea.ms/git-commit/)
  - [chromium commit format](https://chromium.googlesource.com/chromium/src/+/main/docs/contributing.md#chromium_specific-description-tips)
  - [go.dev commit format](https://go.dev/doc/contribute#commit_messages)
  - [MediaWiki commit format](https://www.mediawiki.org/wiki/Gerrit/Commit_message_guidelines)

### Title

- First line of commit message is well-known as header.
  It becomes `Title` in Differential. Titles do not get autolink in phorge,
  so avoid using T<num> or D<num> in title field.
  - git convention is to limit the title below somewhere 50 chars, but I just
    care it's somewhere below 72.
  - `Title` is special in git, in that `git log --oneline` or `git log --graph`
    opts to display first line of a commit (the `Title`) only; make sure it is
    descriptive enough.
  - ^ means you need a blank line before the rest of the commit message; it is
    also used to differentiate `Title` and `Summary`.
  - Title should be in this format: `(area of change): what changed`.
    `area of change` historically was generally CI, docusaurus, meta, and this kind of stuff.
    As of this documentation, I settled with this syntax:
    - CI: CI/CD tools like GitHub Actions, lint/testing like `arc lint` and `yamllint`
    - docusaurus: docusaurus edits, that is NOT page edit. (See `path` for that.)
    - meta: meta-repository edit that does not belong to anything else. Dependabot
      or renovate may use `chore` for this.
    - path[^1]: Edits the path page.
  - `what changed`: describe what was changed.
- Remember to leave line 2 empty.

### Body

- Line 3 ~ is body of the commit message. When using `arc`, this translates into
  `Summary:` field. In body field, try to stay within general best practice of
  72 chars per line. Links are only exceptions where it is OK to violate this.
- When applicable, start the body with following command to link revisions with
  tasks:
  - `Ref T<num>` will cosmetically link the differential revision to Maniphest
    tasks. (Simple `T<num>` just make a link, without systemic link.) Use this
    when the revision does relate to the task, but doesn't attempt to fix the task.
  - `Fix T<num>` (`Fixes T<num>` also work) will close the task as `Resolved`.
  - `Obsolete T<num>` (plural form also work) closes the task as `Obsolete`.
  - `Invalidates T<num>` closes the task as `Invalid`.
- Using any of the command above will link the revision with task at revision
  on revision creation, but (except `Ref`) will not close the task in question.
  Just like the GitHub PR and issues, task closure happens after the Code Review,
  when the commit is pushed (in phorge term, `landed`) to the default branch.
- Plain `T<num>` or `D<num>` will simply generate a link to that task/revision.
  (Reciprocal link notification will be made at other side of link, just like GitHub.
  However phorge has better ACL system than GitHub issues, and as such, if you
  do not have read access to the task/revision being linked, it may not be clickable
  (displayed in plain text).)
- When you want to refer to other commit, use full git hash followed by `Differential`
  revision number (or vice versa) - for example
  `a290cc333c6fd1d405dfc860ab371d29a07ba834 (D350)` or
  `D350 (a290cc333c6fd1d405dfc860ab371d29a07ba834)`.
  If the commit has not landed (in review @ `Differential`), use the revision ID (`D350`).
  (in this case, hash will change when `arc land`ing, so link will rot.)
- If a `revision` depends on other `revision`, declare it in `Depends on D<num>`.
  Usually this is spelled out at the beginning of the Body, after the task
  declarations (if any). `Differential` will detect it and create a `Stack` chain,
  and instruct `arc` to fetch all the chained revisions together when
  downloading the patch.
- When you do `git revert`, amend the commit to describe what you revert (after
  the commit message generated by git), it will save you time because you
  will need to type that in `arc diff` stage anyway.
- It's up to you how you structure the commit message. Just remember the 72
  chars rule. I'll tell you if I want certain part of commit message changed.
- `Signed-off-by:` is required. It signifies the acceptance of
  [Developer Certificate of Origin](https://developercertificate.org/). Put it at the
  bottom of the commit message, which will be just two lines above (one line
  in between being an empty line) the `Test Plan:` at `arc diff` time.
  Differential's policy check (via `Herald`) will raise an error if the string
  `Signed-off-by:` is missing, and I will double check the message anyway.
- At the end of Differential review, what is in the `Title`, `Summary`,
  and `Test Plans` part becomes the final commit message that is logged.
  So once the revision is up for review, you can just disregard the local commit
  message and/or history. It will be squashed into one commit. If you want to edit
  differential revision texts in terminal, you can do `arc diff --edit` when you
  send the revised changes for review. It will show the current revision
  title/summary/test plan for edit, and then prompt you to describe what has changed.

### Test Plan

- During the `arc diff` flow, the template will prompt you for `Test Plan:`.
  Strictly speaking this is not required, but it is a good practice anyway to
  document how to verify the change. (Remember, Trust But Verify.)
- For simple changes, Read the Docs :tm: is sufficient. But things like `npm run`
  changes should have a test plan to verify what it claims is what it does.
- If a change is not testable by the command, something is going horribly wrong.

### Reviewers and Subscribers

Generally speaking you do not need to fill this. System will automatically decide
appropriate reviewer (me) and if someone has subscription rule via `Herald`,
they will auto-subscribe if they would normally have read permission to the
revision being edited.

## Lint, Test, and CI

There are various lint and tests to discover and fix easy mistakes. For example,

- `arc lint` discovers:
  - wrong file mode (ie. non-executing files with `+x`.)
  - csslint via [npm csslint](https://www.npmjs.com/package/csslint)
  - jshint via [npm jshint](https://www.npmjs.com/package/jshint)
  - json syntax check (jsonc files in `.vscode` and like are excluded)
  - Merge conflict residues are not left over
  - quick English spellcheck
  - Quick text file lints (ie. use `lf`, instead of `crlf`)
  - yaml syntax check via [pip yamllint](https://yamllint.readthedocs.io/en/stable/index.html)
- `.editorconfig` 'corrects' the syntax automatically for
  [supporting editors](https://editorconfig.org/#pre-installed) and `prettier`.
  This is usually about `charset`, `end_of_line`, `indent_size` kind of stuff.
- `eslint` does some js/ts linting (not really working well right now)
- `markdownlint` via `vscode` does some markdown file lint.
- `prettier` 'corrects' the syntax to be consistent. (`prettier` will not
  check for 80 lines requirement. Markdownlint generally does that.)

Generally I will download the patch via `arc patch` and verify the patch locally.
However since GitHub Actions' server resource has more CPU/RAM than my local
environment, I may push it to GitHub, directing GitHub Actions to try
some build testing.

After the patch lands, GitHub Actions (the CI tool) will run some validations,
either already performed by `arc lint` or on their own.

- It will run `prettier --check .` to see if there's prettier validation warning.
- It will run `renovate-config-validator` to validate `.github/renovate.json`.
- It will build the site, and run `npx lhci autorun --workspace=docusaurus` to
  check against [Chromium Core Web Vitals](https://web.dev/articles/vitals).
  (I just take this for measurements. Chromium support is not a priority,
  and anything this reports against chromium is a second-class issue.)
- It will build the site, and deploy it @ `$random-hash.revi-xyz.pages.dev`.
  This test deploy site requires Cloudflare Access authorization to access.
  This is to verify the site is buildable and deployable to Cloudflare Pages
  which hosts the contents.
- It will run CodeQL (like Chromium Core Web Vitals, this is for measurements.
  I mostly rely on Docusaurus for almost everything and don't do much
  in-house editing.)
- It will run jsonlint via `jq` and `yamllint`.

For pull requests, `CodeQL`, `jsonlint`, and `yamllint` is required to pass before
it can be merged. (Remember, PR is mostly for dependabot or renovate.)

[^1]: in this example `https://revi.xyz/time`, path is `/time`.
