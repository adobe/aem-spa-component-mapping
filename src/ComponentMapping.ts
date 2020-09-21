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
    [ key: string ]: any;
}

/**
 * @private
 */
let instance: ComponentMappingImpl;

/**
 * ComponentMapping singleton. It manages the mapping between AEM component resource types and corresponding
 * JavaScript component class.
 *
 * @private
 */
class ComponentMappingImpl {

    static mapping: ComponentMappingObject = {};

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
     * @param resourceTypes resource type(s)
     * @param clazz component class that should be associated with given resource type(s)
     *
     * @protected
     */
    public map(resourceTypes: string | string[], clazz: any): void {
        ComponentMappingImpl.map(resourceTypes, clazz);
    }

    public static map(resourceTypes: string | string[], clazz: any): void {
        if (resourceTypes && clazz) {
            const resourceList = (typeof resourceTypes === 'string') ? [ resourceTypes ] : resourceTypes;

            resourceList.forEach((entry) => { this.mapping[entry] = clazz; });
        }
    }

    /**
     * Returns object (or undefined) matching with given resource type.
     *
     * @param resourceType resource type
     * @returns class associated with given resource type
     */
    public get(resourceType: string): any | undefined {
        return ComponentMappingImpl.get(resourceType);
    }

    /**
     * Returns object (or undefined) matching with given resource type.
     *
     * @param resourceType resource type
     * @returns class associated with given resource type
     */
    public static get(resourceType: string): any | undefined {
        return this.mapping[resourceType];
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
 * @param resourceTypes AEM resource types
 * @returns Function mapping a class with the given resource types
 */
function MapTo(resourceTypes: string | string[]) {
    return (clazz: any) => ComponentMappingImpl.instance.map(resourceTypes, clazz);
}

export { ComponentMappingImpl as ComponentMapping, MapTo };
