// Query coverage: every pattern in queries/*.scm matches somewhere in a
// sample program, and every capture name it declares is captured, so a
// pattern that can never match (a misspelt node type or field, or a
// predicate that always fails) is found.

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import Parser from 'tree-sitter';
import { language, parse } from '../proof/harness.js';

const SOURCE = `#!/usr/bin/env swipl
% A program that every query pattern matches.
:- module(shapes, [area/2]).
:- use_module(library(lists)).
:- dynamic counter/1.
:- table fib/2.
unit.
area(square(S), A) :- A is S * S, X = _, Y rem 2 =:= 0.
shapes:perimeter(square(S), P) :- P is 4 * S.
shapes:origin.
grow(X, Y), X > 0 => Y = "bigger".
done, true => true.
fib(N, F) :- N > 1, !, F = f{n: N}.k, G = D.put(k, 1), H = 1.5, I = 1r3, J = 0'c, K = \`b\`, L = [a|T], M = {c}, (a ; b).
init :- dynamic(foo/1), discontiguous foo/1.
?- area(square(2), A).
`;

for (const name of ['highlights', 'locals', 'tags']) {
  test(`every pattern and capture of ${name}.scm matches`, () => {
    const source = readFileSync(new URL(`../../queries/${name}.scm`, import.meta.url), 'utf8');
    const query = new Parser.Query(language, source);
    const patternCount = query.predicates.length;
    const captureNames = [...new Set(source.replace(/;.*$/gm, '').match(/@[\w.]+/g))].map(c => c.slice(1));
    const tree = parse(SOURCE);
    assert.equal(tree.rootNode.hasError, false, tree.rootNode.toString());
    const matches = query.matches(tree.rootNode);
    const matched = new Set(matches.map(m => m.pattern));
    const unmatched = [];
    for (let i = 0; i < patternCount; i++) if (!matched.has(i)) unmatched.push(i);
    assert.ok(patternCount > 0);
    assert.deepEqual(unmatched, [], `patterns of ${name}.scm that never match`);
    const captured = new Set(matches.flatMap(m => m.captures.map(c => c.name)));
    assert.deepEqual(captureNames.filter(c => !captured.has(c)), []);
  });
}
