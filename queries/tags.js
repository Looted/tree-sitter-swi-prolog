/**
 * @file Tag kinds of queries/tags.scm
 * @license MIT
 */

// The kinds of tag queries/tags.scm produces (`definition.function`,
// `reference.call`, ...), read from the query file itself so they cannot
// drift from it. The Kibi proof in test/proof/queries.test.js ranges over
// them.

import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('./tags.scm', import.meta.url), 'utf8')
  .replace(/;.*$/gm, '');

/** Every `@definition.*` and `@reference.*` capture in tags.scm, once each. */
export const TAG_KINDS = [...new Set(
  [...source.matchAll(/@((?:definition|reference)\.[\w.]+)/g)].map(m => m[1]),
)];
