
import { Plugin } from 'rollup';

import { CLIOptions, main, makeQuicktypeOptions } from 'quicktype';
import { quicktypeMultiFile } from 'quicktype/dist/quicktype-core'

import { createFilter, FilterPattern } from '@rollup/pluginutils';


class RollupQuicktypeOptions implements Partial<CLIOptions>
{
    include: FilterPattern;
    exclude: FilterPattern;

    lang: string = "javascript";
    topLevel: string;
    src: string[];
    srcUrls?: string;
    srcLang: string = "schema";
    additionalSchema: string[];
    graphqlSchema?: string;
    graphqlIntrospect?: string;
    httpHeader?: string[];
    httpMethod?: string;
    out?: string;
    buildMarkovChain?: string;

    alphabetizeProperties: boolean;
    allPropertiesOptional: boolean;
    noRender: boolean;

    help: boolean;
    quiet: boolean;
    version: boolean;
    debug?: string;
    telemetry?: string;

    // We use this to access the inference flags
    [option: string]: any;
}

export default function quicktype(options: RollupQuicktypeOptions): Plugin {
    const filter = createFilter(options.include, options.exclude);

    return {
        name: 'quicktypes',
        async transform(json, id) {
            if (id.slice(-12) !== '.schema.json' || !filter(id)) return null;

            const cliOptions: CLIOptions = {
                src: options.src || [],
                srcUrls: options.srcUrls,
                srcLang: options.srcLang,
                lang: options.lang,
                topLevel: id,
                noRender: !!options.noRender,
                alphabetizeProperties: !!options.alphabetizeProperties,
                allPropertiesOptional: !!options.allPropertiesOptional,
                rendererOptions: options.rendererOptions || {},
                help: options.help || false,
                quiet: options.quiet || false,
                version: options.version || false,
                out: options.out,
                buildMarkovChain: options.buildMarkovChain,
                additionalSchema: options.additionalSchema || [],
                graphqlSchema: options.graphqlSchema,
                graphqlIntrospect: options.graphqlIntrospect,
                httpMethod: options.httpMethod,
                httpHeader: options.httpHeader,
                debug: options.debug,
                telemetry: options.telemetry
            };
      
            const quicktypeOptions = await makeQuicktypeOptions(cliOptions);
            if (quicktypeOptions === undefined) {
                return null;
            }
        
            const resultsByFilename = await quicktypeMultiFile(quicktypeOptions);

            let code = "";
            for(const [filename, { lines, annotations }] of resultsByFilename)
            {
                code += lines.join("\n");
                code += "\n";
            }

            return {
                code: code,
                map: { mappings: '' }
            };

          },
        generateBundle() {
            main(options);
        }
    }
}