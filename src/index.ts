
import { Plugin } from 'rollup';

import { CLIOptions, main } from 'quicktype';

class RollupQuicktypeOptions implements Partial<CLIOptions>
{
    lang: string;
    topLevel: string;
    src: string[];
    srcUrls?: string;
    srcLang: string;
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
    return {
        name: 'quicktypes',
        generateBundle() {
            main(options);
        }
    }
}