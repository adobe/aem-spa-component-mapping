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

import { ComponentMapping, LazyMapTo, MapTo } from '../src/ComponentMapping';
import { LazyClass, LazyClass2 } from './LazyClass';

const resource = 'test/mapto';
const resourcesArray = [ 'resource/mapto/first', 'resource/mapto/second', 'resource/mapto/third' ];

const lazyResource = 'some/lazy/resource';
const lazyResourcesArray: string[] = [ 'lazyresource/first', 'lazyresource/second', 'lazyresource/third' ];

const lazyPromise:Promise<LazyClass> = new Promise<LazyClass>((resolve, reject) => {
    import('./LazyClass').then((Module) => {
        resolve(Module.LazyClass);
    }).catch(reject);
});

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
        expect(mapping.getLazy(lazyResource)).toBeUndefined();
    });

    it('should not create mapping if class was not provided', () => {
        // when
        MapTo(resource);
        LazyMapTo(lazyResource);

        // then
        expect(mapping.get(resource)).toBeUndefined();
        expect(mapping.getLazy(lazyResource)).toBeUndefined();
    });

    it('should create mapping for a single resource', () => {
        // when
        MapTo(resource)(SampleClassOne);
        LazyMapTo(lazyResource)(() => lazyPromise);
        // then
        expect(mapping.get(resource)).toEqual(SampleClassOne);
        expect(mapping.getLazy(lazyResource)).resolves.toBe(LazyClass);

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
        LazyMapTo(lazyResourcesArray)(() => lazyPromise);

        // then
        expect(mapping.get(resourcesArray[0])).toEqual(SampleClassOne);
        expect(mapping.getLazy(lazyResourcesArray[0])).resolves.toBe(LazyClass);

        expect(mapping.get(resourcesArray[1])).toEqual(SampleClassOne);
        expect(mapping.getLazy(lazyResourcesArray[1])).resolves.toBe(LazyClass);

        expect(mapping.get(resourcesArray[2])).toEqual(SampleClassOne);
        expect(mapping.getLazy(lazyResourcesArray[2])).resolves.toBe(LazyClass);

    });

    it('should override mapping for resource array', () => {
        // when
        MapTo(resourcesArray)(SampleClassTwo);
        LazyMapTo(lazyResourcesArray)(() => lazyPromise);

        // then
        expect(mapping.get(resourcesArray[0])).toEqual(SampleClassTwo);
        expect(mapping.getLazy(lazyResourcesArray[0])).resolves.toBe(LazyClass2);

        expect(mapping.get(resourcesArray[1])).toEqual(SampleClassTwo);
        expect(mapping.getLazy(lazyResourcesArray[1])).resolves.toBe(LazyClass2);

        expect(mapping.get(resourcesArray[2])).toEqual(SampleClassTwo);
        expect(mapping.getLazy(lazyResourcesArray[2])).resolves.toBe(LazyClass2);
    });
});
