// What a set of parse trees covers of the grammar, as node-types.json
// describes it: every node type (named and anonymous), every field of every
// type with every type its value can have, and every type a node's
// unnamed-field children can have.

import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { NODE_TYPES } from '../../grammar/node-types.js';

const root = fileURLToPath(new URL('../..', import.meta.url));

const name = (type, named) => (named ? type : JSON.stringify(type));

/** Every item of grammar coverage node-types.json asks for. */
export function expectedItems() {
  const items = new Set();
  for (const t of NODE_TYPES) {
    if (t.type === 'ERROR') continue;
    items.add(`type ${name(t.type, t.named)}`);
    for (const [field, spec] of Object.entries(t.fields ?? {})) {
      for (const c of spec.types) items.add(`${t.type}.${field} ${name(c.type, c.named)}`);
    }
    for (const c of t.children?.types ?? []) items.add(`${t.type}[] ${name(c.type, c.named)}`);
  }
  return items;
}

/** The items of grammar coverage that `tree` reaches. */
export function coveredItems(tree, items = new Set()) {
  const visit = (node) => {
    items.add(`type ${name(node.type, node.isNamed)}`);
    const cursor = node.walk();
    if (cursor.gotoFirstChild()) {
      do {
        const child = cursor.currentNode;
        const field = cursor.currentFieldName;
        if (field) items.add(`${node.type}.${field} ${name(child.type, child.isNamed)}`);
        else if (child.isNamed && !child.isExtra) items.add(`${node.type}[] ${name(child.type, true)}`);
        visit(child);
      } while (cursor.gotoNextSibling());
    }
  };
  visit(tree.rootNode);
  return items;
}

/** The inputs of the tree-sitter test corpus in test/corpus/. */
export function corpusInputs() {
  const dir = path.join(root, 'test/corpus');
  return readdirSync(dir).filter(f => f.endsWith('.txt')).sort().flatMap((file) => {
    const text = readFileSync(path.join(dir, file), 'utf8');
    // ===\nname\n===\ninput\n---\nexpected
    return [...text.matchAll(/^=+\n.*\n=+\n([\s\S]*?)\n-{3,}\n/gm)].map(m => m[1]);
  });
}
