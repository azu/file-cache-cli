// LICENSE : MIT
"use strict";
const md5 = require("md5");
const fs = require("fs");
const path = require("path");
const os = require("os");
import FileCache from "./FileCache";
const defaultOptions = {
    cacheDir: os.tmpdir(),
    // default: 5 minutes
    maxAge: 5 * 60 * 1000
};
export default class FileCacheManager {
    constructor(options = {}) {
        this.cacheDir = options.cacheDir || defaultOptions.cacheDir;
        this.cacheFilePath = path.join(this.cacheDir, ".file-cache-cli.json");
        this.maxAge = options.maxAge !== undefined ? options.maxAge : defaultOptions.maxAge;
    }

    /**
     * @returns {FileCache[]}
     */
    get fileCaches() {
        try {
            const json = require(this.cacheFilePath);
            return json.map(object => new FileCache(object));
        } catch (error) {
            return [];
        }
    }

    /**
     * Update cache data
     * @param {FileCache[]} data
     */
    set fileCaches(data) {
        fs.writeFileSync(this.cacheFilePath, JSON.stringify(data, null, 4));
    }

    /**
     * @param {string} filePath
     * @returns {FileCache}
     */
    createFileCache(filePath) {
        const content = fs.readFileSync(filePath, "utf-8");
        return new FileCache({
            filePath,
            hash: md5(content),
            lastChecked: Date.now()
        });
    }

    /**
     * filter `filePathList` by cached data
     * @param {string[]} filePathList
     * @returns {string[]} filtered filePathList
     */
    filterByCache(filePathList = []) {
        const fileCaches = this.fileCaches;
        const targetFileCacheList = filePathList.filter(filePath => {
            return filePath.length > 0;
        }).filter(filePath => {
            return fs.lstatSync(filePath).isFile();
        }).map(filePath => {
            return this.createFileCache(path.resolve(process.cwd(), filePath));
        });
        const currentTime = Date.now();
        const filteredFilePathList = targetFileCacheList.filter((targetFile) => {
            return !fileCaches.some(fileCache => {
                // true, should be ignored file
                if (fileCache.equals(targetFile)) {
                    return true;
                }
                // old data should be checked
                if (fileCache.lastChecked < (currentTime - this.maxAge)) {
                    return true
                }
                return false;
            });
        });
        // save
        this.fileCaches = targetFileCacheList;
        return filteredFilePathList.map(fileCache => fileCache.filePath);
    }

    /**
     * clean cache
     */
    clean() {
        try {
            fs.unlinkSync(this.cacheFilePath);
        } catch (error) {

        }
    }
}
