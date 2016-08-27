#!/usr/bin/env node
const cli = require("../lib/cli");
const getStdin = require("get-stdin");
getStdin().then(string => {
    const filePathList = string.split("\n");
    const results = cli.exec(filePathList);
    console.log(results.join("\n"));
});