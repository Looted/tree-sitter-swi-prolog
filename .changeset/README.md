# Changesets

Every pull request with a user-visible change adds a changeset:

```sh
npx changeset
```

Pick the bump (patch for fixes, minor for new syntax or queries, major for node-type changes that break queries) and describe the change for users. The text becomes the `CHANGELOG.md` entry.

See the README's Releasing section for how changesets turn into a release.
