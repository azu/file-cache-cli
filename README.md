# file-cache-cli

Command line tools that filter file paths by cached data.

## Install

Install with [npm](https://www.npmjs.com/):

    npm install file-cache-cli

## Usage

Filter only last-modified file path.

```sh
ls | file-cache-cli | echo
```

### Usage help

    Usage
      $ file-cache-cli [options]

    Options
      --maxAge cache max-age time. Default: 60 * 1000 * 5 (5sec)
      --cacheDir path to cache dir. Default: os.tmpDir() 
      
    Examples
      $ ls | file-cache-cli | echo
      
## Changelog

See [Releases page](https://github.com/azu/file-cache-cli/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/file-cache-cli/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
