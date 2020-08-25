/* eslint-disable */
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import fs from 'fs';
import path from 'path';

/**
 * Explores given directory and generates js file requiring all components using @MapTo decorator.
 * WARNING: Not supported in babel for now (https://babeljs.io/docs/plugins/transform-decorators)
 *
 * @param {string} sourceRoot       - directory traversing root
 * @param {string} mappingOutput    - name of generated file
 * @param {array} extensions        - array of accepted file extensions
 *
 * @private
 */
let MapComponents = function(sourceRoot = './', mappingOutput = 'src/AllComponents.jsx', extensions = [ 'js', 'jsx', 'ts' ]) {
    extensions = (extensions || []).reduce((map, key) => { map[key] = 1; return map; }, {});

    /**
     * Checks if given file (matching to extension critetia) contains @MapTo decorator that is not commented out.
     *
     * @param {string} name - file name
     * @returns {boolean} - true if file contains @MapTo decorator
     *
     * @private
     */
    const containsMapTo = (name) => {
        /* only parse files matching to requested extensions */
        if (!name || !extensions[name.split(/\./).pop()]) {
            return false;
        }

        /* search for @MapTo decorator in given file */
        const fileContent = fs.readFileSync(name, 'utf8') || '';

        return /(^|[\r\n;])\s*@MapTo\s*\(/.test(fileContent.replace(/\/\*[^*]*\*\//g, ''));
    };

    /**
     * Explores given directory and searches for files using @MapTo decorator.
     *
     * @param {string} dir          - processed directory
     * @param {array} components    - list of resuts
     * @returns {array}             - list of files matching to {#containsMapTo} criteria
     *
     * @private
     */
    const findComponents = (dir, components = []) => {
        fs.readdirSync(dir).forEach(file => {
            let name = path.join(dir, file);

            /* check child directories and search for @MapTo occurrences */
            if (fs.statSync(name).isDirectory()) {
                findComponents(name, components);
            } else if (containsMapTo(name)) {
                components.push(name);
            }
        });

        return components;
    };

    /* file prelude */
    let content = [ '// Generated on ' + new Date() ];

    /* add require() for each entry */
    findComponents(sourceRoot).forEach((component) => {
        content.push('require("../' + component + '");');
    });

    /* create javascript file */
    fs.writeFileSync(mappingOutput, content.join('\n'));
};

/* by default - map components at build time (when this file gets imported) */
let autoMapComponents = true;

/* read config */
const configFile = 'cq-component-mapping.json';
let config = fs.existsSync(configFile) ? JSON.parse(fs.readFileSync(configFile, 'utf8')) : {};

if (typeof config.autoMapComponents !== 'undefined') {
    autoMapComponents = String(config.autoMapComponents) === 'true';
}

/* bind arguments, so the only way to control this function is to use the json config */
MapComponents = MapComponents.bind(null, config.sourceRoot, config.mappingOutput, config.extensions);

if (autoMapComponents) {
    MapComponents();
}

export default MapComponents;
