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

import { ComponentMapping, MapTo } from '../src/ComponentMapping';

const resource = 'test/mapto';
const resourcesArray: string[] = [ 'resource/mapto/first', 'resource/mapto/second', 'resource/mapto/third' ];

class SampleClassOne {
    static get hello() {
        return 'world';
    }
}

class SampleClassTwo {
    static get hello() {
        return 'world';
    }
}

MapTo(resource)(SampleClassOne);
MapTo(resourcesArray)(SampleClassTwo);
MapTo(resourcesArray)(SampleClassTwo);

describe('MapTo', () => {
    const mapping = new ComponentMapping();

    it('should create mapping using MapTo decorator', () => {
        // mapping for single resource type
        expect(mapping.get(resource)).toEqual(SampleClassOne);

        // mappings for multiple resource types
        expect(mapping.get(resourcesArray[0])).toEqual(SampleClassTwo);
        expect(mapping.get(resourcesArray[1])).toEqual(SampleClassTwo);
        expect(mapping.get(resourcesArray[2])).toEqual(SampleClassTwo);
    });
});
