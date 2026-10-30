import XCTest
import SwiftTreeSitter
import TreeSitterSwiProlog

final class TreeSitterSwiPrologTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_swi_prolog())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading SWI-Prolog grammar")
    }
}
