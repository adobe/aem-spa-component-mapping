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

/**
 * ComponentMapping interface.
 * @private
 */
interface ComponentMappingObject {
    [key: string]: unknown;
}

/**
 * LazyComponentMappingObject interface.
 * @private
 */
interface LazyComponentMappingObject {
    [key: string]: lazyMapFunction;
}

/**
 * ComponentMapping instance.
 * @private
 */
let instance: ComponentMappingImpl;

export type lazyMapFunction = () => Promise<unknown>;

/**
 * ComponentMapping singleton. It manages the mapping between AEM component resource types and corresponding
 * JavaScript component class.
 * @private
 */
class ComponentMappingImpl {

    static mapping: ComponentMappingObject = {};
    static lazyMapping: LazyComponentMappingObject = {};

    static get instance(): ComponentMappingImpl {
        return new this();
    }

    constructor() {
        if (!instance) {
            instance = this;
        }

        return instance;
    }

    /**
     * Creates mapping for given resource type(s) and a component class.
     * @param resourceTypes Resource type(s).
     * @param clazz Component class that will be associated with given resource type(s).
     * @protected
     */
    public map(resourceTypes: string | string[], clazz: unknown): void {
        ComponentMappingImpl.map(resourceTypes, clazz);
    }

    /**
     * Creates mapping for given resource type(s) and a component class.
     * @param resourceTypes Resource type(s).
     * @param clazz Component class that will be associated with given resource type(s).
     * @protected
     */
    public static map(resourceTypes: string | string[], clazz: unknown): void {
        if (resourceTypes && clazz) {
            const resourceList = (typeof resourceTypes === 'string') ? [ resourceTypes ] : resourceTypes;

            resourceList.forEach((entry) => {
                this.mapping[entry] = clazz;
            });
        }
    }

    public lazyMap(resourceTypes: string | string[], clazz: lazyMapFunction): void {
        ComponentMappingImpl.lazyMap(resourceTypes, clazz);
    }

    public static lazyMap(resourceTypes: string | string[], clazz: lazyMapFunction): void {
        if (resourceTypes && clazz) {

            const resourceList = (typeof resourceTypes === 'string') ? [ resourceTypes ] : resourceTypes;

            resourceList.forEach((entry) => {
                this.lazyMapping[entry] = clazz;
            });
        }
    }

    /**
     * Returns object (or `undefined`) matching with given resource type.
     * @param resourceType Resource type.
     * @returns Class associated with given resource type or `undefined`.
     */
    public get<T>(resourceType: string): T {
        return ComponentMappingImpl.get(resourceType);
    }

    /**
     * Returns object (or `undefined`) matching with given resource type.
     * @param resourceType Resource type.
     * @returns Class associated with given resource type or `undefined`.
     */
    public static get<T>(resourceType: string): T {
        return this.mapping[resourceType] as T;
    }

    /**
     * Returns object (or undefined) matching with given resource type.
     *
     * @param {string} resourceType - resource type
     * @returns {object|undefined} - class associated with given resource type
     */
    public getLazy<T>(resourceType: string): Promise<T> {
        return ComponentMappingImpl.getLazy(resourceType);
    }

    public static getLazy<T>(resourceType: string): Promise<T> {

        if (this.lazyMapping[resourceType]) {
            return this.lazyMapping[resourceType]() as Promise<T>;
        }

        return Promise.reject('resourceType ' + resourceType + ' not found in mappings!');
    }

}

/**
 * Use to register resource types to Class mapping.
 *
 * Example:
 * ```
 * import { MapTo } from '@adobe/aem-spa-component-mapping';
 *
 * class MyComponent {
 *  ...
 * }
 *
 * export default MapTo('my/resource/type')(MyComponent);
 * ```
 *
 * @param resourceTypes AEM resource type(s).
 * @returns Function mapping a class with the given resource types.
 */
const MapTo = (resourceTypes: string | string[]): (clazz: unknown) => void => {
    return (clazz: unknown) => ComponentMappingImpl.instance.map(resourceTypes, clazz);
};

/**
 * Use to register resource types to Class mapping in a lazyLoad fashion, with dynamic imports
 *
 * Example:
 * ```
 * import { LazyMapTo } from '@adobe/aem-spa-component-mapping';
 *
 * MyComponent.ts:
 * export class MyComponent {
 *  ...
 * }
 *
 * LazyMapTo('my/resource/type')(MyComponent);
 * ```
 *
 * @param resourceTypes AEM resource type(s).
 * @returns Function mapping a class with the given resource types.
 */
const LazyMapTo = (resourceTypes: string | string[]): (lazyPromise: lazyMapFunction) => void => {
    return (lazyPromise: lazyMapFunction) => ComponentMappingImpl.instance.lazyMap(resourceTypes, lazyPromise);
};

export { ComponentMappingImpl as ComponentMapping, MapTo, LazyMapTo };
