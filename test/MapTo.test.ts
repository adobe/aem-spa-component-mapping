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
const resourcesArray = [ 'resource/mapto/first', 'resource/mapto/second', 'resource/mapto/third' ];

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

describe('MapTo', () => {
    let mapping: ComponentMapping;

    beforeEach(() => {
        mapping = new ComponentMapping();
    });

    it('should return `undefined` if given resource string is not mapped', () => {
        // then
        expect(mapping.get(resource)).toBeUndefined();
    });

    it('should not create mapping if class was not provided', () => {
        // when
        MapTo(resource);

        // then
        expect(mapping.get(resource)).toBeUndefined();
    });

    it('should create mapping for a single resource', () => {
        // when
        MapTo(resource)(SampleClassOne);

        // then
        expect(mapping.get(resource)).toEqual(SampleClassOne);
    });

    it('should override mapping for single resource', () => {
        // when
        MapTo(resource)(SampleClassTwo);

        // then
        expect(mapping.get(resource)).toEqual(SampleClassTwo);
    });

    it('should create mapping for resource array', () => {
        // when
        MapTo(resourcesArray)(SampleClassOne);

        // then
        expect(mapping.get(resourcesArray[0])).toEqual(SampleClassOne);
        expect(mapping.get(resourcesArray[1])).toEqual(SampleClassOne);
        expect(mapping.get(resourcesArray[2])).toEqual(SampleClassOne);
    });

    it('should override mapping for resource array', () => {
        // when
        MapTo(resourcesArray)(SampleClassTwo);

        // then
        expect(mapping.get(resourcesArray[0])).toEqual(SampleClassTwo);
        expect(mapping.get(resourcesArray[1])).toEqual(SampleClassTwo);
        expect(mapping.get(resourcesArray[2])).toEqual(SampleClassTwo);
    });
});
