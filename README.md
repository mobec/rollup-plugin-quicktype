# rollup-plugin-quicktype

🍣 A Rollup plugin to integrate [quicktype](https://www.npmjs.com/package/quicktype)

## Installation

`npm install @mobecher/rollup-plugin-quicktype --save-dev`

## Example

rollup.config.js

```js
import  quicktype from '@mobecher/rollup-plugin-quicktype';
export default {
    input: 'src/main.js',
    output: {
        dir: "dist",
        format: 'umd'
    },
    plugins: [
        quicktype({
            src: ['./schema/pokedex.schema.json'],
            srcLang: 'schema',
            lang: 'javascript',
            out: './src/pokedex.js'
        })
    ]
};

```

## Options
Same as the options of [quicktype](https://www.npmjs.com/package/quicktype) `quicktype --help`

## Limitations
At the moment the plugin simply passes the options to the quicktype cli. 