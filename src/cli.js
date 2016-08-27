// LICENSE : MIT
"use strict";
const meow = require('meow');
import FileCacheManager from "./FileCacheManager";
const cli = meow(`
    Usage
      $ file-cache-cli [options]

    Options
      --maxAge cache max-age time. Default: 60 * 1000 * 5 (5sec)
      --cacheDir path to cache dir. Default: os.tmpDir() 
      
    Examples
      $ ls | file-cache-cli | echo
`);
module.exports = {
    clean(){
        const fileCacheManager = new FileCacheManager(cli.flags);
        fileCacheManager.clean();
    },
    exec(filePathList){
        /*
        {
            flags: {
                maxAge: 10
                cacheDir: "path"
            },
        }
        */
        const fileCacheManager = new FileCacheManager(cli.flags);
        return fileCacheManager.filterByCache(filePathList);
    }
};