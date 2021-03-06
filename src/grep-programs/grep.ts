const child_process = require("child_process");
import { IGrep } from "../interfaces/IGrep";
import { Printer } from "../printer";
import { Selector } from "../selector";
import { Selectors } from "../selectors";

class Grep implements IGrep {

    public run(cssFilePath: string, searchOnly: string = ".", printer: Printer | null = null): Selector[]  {
        const selectors = new Selectors();
        const cleanSelectors = selectors.fromFile(cssFilePath);
        return selectors.findUsages(this, searchOnly, cleanSelectors, printer);
    }

    public call(selector: string, path: string) {
        const call = child_process.spawnSync(
            "grep",
            [
                "-r",
                "-i",
                "--exclude=*.css",
                "--exclude=*.scss",
                selector,
                path,
            ],
            {
                stdio: "pipe",
                encoding: "utf-8",
            },
        );

        // Seems to be some deviation between node 8 and 9>
        // where args is empty on 9 and greater.
        // We'll just force it in instead...
        call.args = [
            "grep", 
            "-r",
            "-i",
            "--exclude=*.css",
            "--exclude=*.scss",
            selector,
            path,
        ];

        return call;
    }
}

export { Grep };
