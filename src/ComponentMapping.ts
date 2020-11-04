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
 * ComponentMapping instance.
 * @private
 */
interface ComponentMappingObject {
    [key: string]: any;
}

interface LazyComponentMappingObject {
    [key: string]: lazyMapFunction;
}

let instance: ComponentMappingImpl;

export type lazyMapFunction = () => Promise<any>;

/**
 * ComponentMapping singleton. It manages the mapping between AEM component resource types and corresponding
 * JavaScript component class.
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
     *
     * @param {string|array} resourceTypes - resource type(s)
     * @param {object} clazz - component class that should be associated with given resource type(s)
     *
     * @protected
     */
    public map(resourceTypes: string | string[], clazz: any): void {
        ComponentMappingImpl.map(resourceTypes, clazz);
    }

    public static map(resourceTypes: string | string[], clazz: any): void {
        if (resourceTypes && clazz) {
            const self = this;

            // @ts-ignore
            [].concat(resourceTypes).forEach((entry) => {
                self.mapping[entry] = clazz;
            });
        }
    }

    public lazyMap(resourceTypes: string | string[], clazz: lazyMapFunction): void {
        ComponentMappingImpl.lazyMap(resourceTypes, clazz);
    }

    public static lazyMap(resourceTypes: string | string[], clazz: lazyMapFunction): void {
        if (resourceTypes && clazz) {
            const self = this;

            // @ts-ignore
            [].concat(resourceTypes).forEach((entry) => {
                self.lazyMapping[entry] = clazz;
            });
        }
    }

    /**
     * Returns object (or undefined) matching with given resource type.
     *
     * @param {string} resourceType - resource type
     * @returns {object|undefined} - class associated with given resource type
     */
    public get(resourceType: string): any | undefined {
        return ComponentMappingImpl.get(resourceType);
    }

    /**
     * Returns object (or undefined) matching with given resource type.
     *
     * @param {string} resourceType - resource type
     * @returns {object|undefined} - class associated with given resource type
     */
    public static get(resourceType: string): any | undefined {
        return this.mapping[resourceType];
    }

    /**
     * Returns object (or undefined) matching with given resource type.
     *
     * @param {string} resourceType - resource type
     * @returns {object|undefined} - class associated with given resource type
     */
    public getLazy(resourceType: string): Promise<any> | undefined {
        return ComponentMappingImpl.getLazy(resourceType);
    }

    public static getLazy(resourceType: string): Promise<any> | undefined {

        if (this.lazyMapping[resourceType]) {
            return new Promise(((resolve, reject) => {
                this.lazyMapping[resourceType]().then((component) => {

                    // once we resolved the component, we put it in the normal registry and cleanse the lazyMap.
                    this.map(resourceType, component);
                    delete this.lazyMapping[resourceType];

                    resolve(component);
                }).catch(reject);
            }))
        }

    }

}

/**
 * Helper function that can be used to map a class to given resource type(s).
 *
 * @param {string|array} resourceTypes - resource type(s)
 * @returns {function} - function meant to map a class with the previously given resource types
 */
function MapTo(resourceTypes: string | string[]) {
    return (clazz: any) => ComponentMappingImpl.instance.map(resourceTypes, clazz);
}

export { ComponentMappingImpl as ComponentMapping, MapTo };
