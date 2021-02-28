import * as path from 'path';

import { Plugin, RollupOptions, SourceDescription } from 'rollup';

class RollupQuicktypeOptions {

}

export default function quicktype(options: RollupQuicktypeOptions = {}): Plugin {
    return {
        name: 'quicktypes'
    }
}