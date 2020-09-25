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

class SampleClass {
    static get hello() {
        return 'world';
    }
}

describe('ComponentMapping', () => {
    let mapping: ComponentMapping;
    const resource = 'some/resource';
    const resourcesArray: string[] = [ 'resource/first', 'resource/second', 'resource/third' ];

    beforeEach(() => {
        mapping = new ComponentMapping();
    });

    it('should be a singleton', () => {
        // get ComponentMapping instance
        const instance1 = new ComponentMapping();

        // creating mapping
        instance1.map('singleton-test', SampleClass);

        // get ComponentMapping instance
        const instance2 = new ComponentMapping();

        // checking if mapping created by first instance is present in second instance
        expect(instance2.get('singleton-test')).toBe(SampleClass);
        expect(instance1).toBe(instance2);
    });

    it('should not create any mapping if class is missing', () => {
        // mapping does not exist
        expect(mapping.get(resource)).toBeUndefined();

        // attempt to create mapping
        mapping.map(resource, undefined);

        // mapping does not exist
        expect(mapping.get(resource)).toBeUndefined();
    });

    it('should create mapping between resource type and component class', () => {
        // mapping does not exist
        expect(mapping.get(resource)).toBeUndefined();

        // creating mapping
        mapping.map(resource, SampleClass);

        // checking mapping
        expect(mapping.get(resource)).toBe(SampleClass);
    });

    it('should create mapping for several resource types', () => {
        // mapping does not exist
        expect(mapping.get(resourcesArray[0])).toBeUndefined();
        expect(mapping.get(resourcesArray[0])).toBeUndefined();
        expect(mapping.get(resourcesArray[0])).toBeUndefined();

        // creating mapping
        mapping.map(resourcesArray, SampleClass);

        // checking mapping
        expect(mapping.get(resourcesArray[0])).toBe(SampleClass);
        expect(mapping.get(resourcesArray[1])).toBe(SampleClass);
        expect(mapping.get(resourcesArray[2])).toBe(SampleClass);
    });
});
