#!/usr/bin/env node
// Parses every .pl/.plt/.pro file under the given directories and fails when
// the share of top-level terms without ERROR or MISSING nodes drops below
// --min (default 0.995). Files that declare their own operators with op/3
// are expected to leave a few terms unparsed.
//
// Usage: node scripts/check-corpus.mjs [--wasm path] [--min 0.995] dir...

import fs from 'node:fs';
import path from 'node:path';
import { Language, Parser } from 'web-tree-sitter';

const args = process.argv.slice(2);
let wasm = 'tree-sitter-swi_prolog.wasm';
let min = 0.995;
const dirs = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--wasm') wasm = args[++i];
  else if (args[i] === '--min') min = Number(args[++i]);
  else dirs.push(args[i]);
}
if (dirs.length === 0) {
  console.error('usage: check-corpus.mjs [--wasm path] [--min ratio] dir...');
  process.exit(2);
}

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(pl|plt|pro)$/.test(entry.name)) yield full;
  }
}

await Parser.init();
const parser = new Parser();
parser.setLanguage(await Language.load(wasm));

let files = 0;
let cleanFiles = 0;
let terms = 0;
let brokenTerms = 0;
const worst = [];

for (const dir of dirs) {
  for (const file of walk(dir)) {
    const source = fs.readFileSync(file, 'utf8');
    const tree = parser.parse(source);
    let broken = 0;
    let count = 0;
    for (const node of tree.rootNode.namedChildren) {
      if (node.type === 'comment' || node.type === 'shebang') continue;
      count++;
      if (node.type === 'ERROR' || node.hasError) broken++;
    }
    files++;
    terms += count;
    brokenTerms += broken;
    if (!tree.rootNode.hasError) cleanFiles++;
    else worst.push([broken, file]);
    tree.delete();
  }
}

const ratio = terms === 0 ? 1 : (terms - brokenTerms) / terms;
worst.sort((a, b) => b[0] - a[0]);
for (const [broken, file] of worst.slice(0, 15)) {
  console.log(`${String(broken).padStart(5)}  ${file}`);
}
console.log(
  `files ${cleanFiles}/${files} clean, terms ${terms - brokenTerms}/${terms} clean ` +
  `(${(ratio * 100).toFixed(2)}%, minimum ${(min * 100).toFixed(2)}%)`,
);
process.exit(ratio >= min ? 0 : 1);
