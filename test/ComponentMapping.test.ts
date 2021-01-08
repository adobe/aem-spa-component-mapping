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

import { ComponentMapping } from '../src/ComponentMapping';
import { LazyClass } from './LazyClass';

class SampleClass {
    static get hello() {
        return 'world';
    }
}

const lazyPromise:Promise<LazyClass> = new Promise<LazyClass>((resolve, reject) => {
    import('./LazyClass').then((Module) => {
        resolve(Module.LazyClass);
    }).catch(reject);
});

describe('ComponentMapping', () => {
    let mapping: ComponentMapping;
    const resource = 'some/resource';
    const lazyResource = 'some/lazy/resource';

    const resourcesArray: string[] = [ 'resource/first', 'resource/second', 'resource/third' ];

    const lazyResourcesArray: string[] = [ 'lazyresource/first', 'lazyresource/second', 'lazyresource/third' ];

    beforeEach(() => {
        mapping = new ComponentMapping();
        ComponentMapping.mapping = {};
        ComponentMapping.lazyMapping = {};
    });

    it('should be a singleton', () => {
        // get ComponentMapping instance
        const instance1 = new ComponentMapping();

        // creating mapping
        instance1.map('singleton-test', SampleClass);
        instance1.lazyMap('singleton-lazy-test', () => lazyPromise);

        // get ComponentMapping instance
        const instance2 = new ComponentMapping();

        // checking if mapping created by first instance is present in second instance
        expect(instance2.get('singleton-test')).toBe(SampleClass);
        expect(instance2.getLazy('singleton-lazy-test')).resolves.toBe(LazyClass);
        expect(instance1).toBe(instance2);
    });

    it('should not create any mapping if class is missing', () => {
        // mapping does not exist
        expect(mapping.get(resource)).toBeUndefined();
        expect(mapping.getLazy(lazyResource)).resolves.toThrowError();

        // attempt to create mapping
        mapping.map(resource, undefined);
        mapping.lazyMap(lazyResource, () => new Promise<unknown>((resolve => resolve())));
        // mapping does not exist
        expect(mapping.get(resource)).toBeUndefined();
        expect(mapping.getLazy(resource)).resolves.toThrowError();
    });

    it('should create mapping between resource type and component class', () => {
        // mapping does not exist
        expect(mapping.get(resource)).toBeUndefined();
        expect(mapping.getLazy(lazyResource)).resolves.toThrowError();

        // creating mapping
        mapping.map(resource, SampleClass);
        mapping.lazyMap(lazyResource, () => lazyPromise);

        // checking mapping
        expect(mapping.get(resource)).toBe(SampleClass);
        expect(mapping.getLazy(lazyResource)).resolves.toBe(LazyClass);
    });

    it('should create mapping for several resource types', () => {
        // mapping does not exist
        expect(mapping.get(resourcesArray[0])).toBeUndefined();
        expect(mapping.get(resourcesArray[1])).toBeUndefined();
        expect(mapping.get(resourcesArray[2])).toBeUndefined();

        expect(mapping.getLazy(lazyResourcesArray[0])).resolves.toThrowError();
        expect(mapping.getLazy(lazyResourcesArray[1])).resolves.toThrowError();
        expect(mapping.getLazy(lazyResourcesArray[2])).resolves.toThrowError();

        // creating mapping
        mapping.map(resourcesArray, SampleClass);
        mapping.lazyMap(lazyResourcesArray, () => lazyPromise);

        // checking mapping
        expect(mapping.get(resourcesArray[0])).toBe(SampleClass);
        expect(mapping.get(resourcesArray[1])).toBe(SampleClass);
        expect(mapping.get(resourcesArray[2])).toBe(SampleClass);

        const checkPromise = (promise:Promise<unknown>) => {
            promise.then((clazz) => {
                expect(clazz).toBe(LazyClass);
            });
        };

        // checking mapping
        checkPromise(mapping.getLazy(lazyResourcesArray[0]));
        checkPromise(mapping.getLazy(lazyResourcesArray[1]));
        checkPromise(mapping.getLazy(lazyResourcesArray[2]));

    });

});
