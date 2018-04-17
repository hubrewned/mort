#!/usr/bin/env node

import { GitGrep } from "./grep-programs/gitgrep";
import { RipGrep } from "./grep-programs/ripgrep";
import { IGrep } from "./interfaces/IGrep";
import { Printer } from "./printer";
import { Program } from "./program";

const program = require("commander");

const executable = new Program();
const printer = new Printer();
const version = "0.1.2";

program
    .version(version)
    .option("-u, --usage-count", "Show warnings for any css selector <= usage-count.")
    .option("-v, --verbose", "Detailed information about the matches will be displayed.", 0)
    .option("-f, --file <path>", "The css file to run mort against.")
    .option("-p, --program <program>", "Force mort to use a grep program of your choice. " +
                              "Supported ones are 'ripgrep' and 'gitgrep'.")
    .parse(process.argv);

if (!program.file) {
    console.log("Please supply a css file");
} else {

    let grepProgram: IGrep;

    // Infer the best grepProgram to use
    if (executable.isExecutable("rg")) {
        grepProgram = new RipGrep();
    } else if (executable.isExecutable("git")) {
        console.log("Ripgrep 'rg' not found, falling back to using 'git grep'");
        grepProgram = new GitGrep();
    } else {
        console.log("No compatible grep programs found. mort supports either ripgrep or git grep.");
    }

    // Respect the user's program
    if (program.program === "gitgrep") {
        grepProgram = new GitGrep();
    }

    if (program.program === "ripgrep") {
        grepProgram = new RipGrep();
    }

    const usages = grepProgram.run(
        program.file,
        ".",
    );

    printer.printUsages(
        usages,
        0,
        program.verbose,
    );
}
