"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process = require("child_process");
const selectors_1 = require("../selectors");
class Grep {
    run(cssFilePath, searchOnly = ".", printer = null) {
        const selectors = new selectors_1.Selectors();
        const cleanSelectors = selectors.fromFile(cssFilePath);
        return selectors.findUsages(this, searchOnly, cleanSelectors, printer);
    }
    call(selector, path) {
        const call = child_process.spawnSync("grep", [
            "-r",
            "-i",
            "--exclude=*.css",
            "--exclude=*.scss",
            selector,
            path,
        ], {
            stdio: "pipe",
            encoding: "utf-8",
        });
        return call;
    }
}
exports.Grep = Grep;
//# sourceMappingURL=grep.js.map