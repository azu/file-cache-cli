// LICENSE : MIT
"use strict";
const fs = require("fs");
export default class FileCache {
    constructor({filePath, hash, lastChecked}) {
        this.filePath = filePath;
        this.hash = hash;
        this.lastChecked = lastChecked;
    }

    /**
     * @param {FileCache} fileCache
     * @returns {boolean}
     */
    equals(fileCache) {
        if (fileCache.filePath !== this.filePath) {
            return false;
        }
        if (fileCache.hash !== this.hash) {
            return false;
        }
        return true;
    }

    toJSON() {
        return {
            filePath: this.filePath,
            hash: this.hash,
            lastChecked: this.lastChecked
        }
    }
}