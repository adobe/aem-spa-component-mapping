[@adobe/aem-spa-component-mapping](../README.md) › [Globals](../globals.md) › [ComponentMappingImpl](componentmappingimpl.md)

# Class: ComponentMappingImpl

ComponentMapping singleton. It manages the mapping between AEM component resource types and corresponding
JavaScript component class.

## Hierarchy

* **ComponentMappingImpl**

## Index

### Constructors

* [constructor](componentmappingimpl.md#constructor)

### Properties

* [mapping](componentmappingimpl.md#static-mapping)

### Accessors

* [instance](componentmappingimpl.md#static-instance)

### Methods

* [get](componentmappingimpl.md#get)
* [map](componentmappingimpl.md#protected-map)
* [get](componentmappingimpl.md#static-get)
* [map](componentmappingimpl.md#static-map)

## Constructors

###  constructor

\+ **new ComponentMappingImpl**(): *[ComponentMappingImpl](componentmappingimpl.md)*

*Defined in [ComponentMapping.ts:33](https://github.com/adobe/aem-spa-component-mapping/blob/fe260fa/src/ComponentMapping.ts#L33)*

**Returns:** *[ComponentMappingImpl](componentmappingimpl.md)*

## Properties

### `Static` mapping

▪ **mapping**: *[ComponentMappingObject](../interfaces/componentmappingobject.md)*

*Defined in [ComponentMapping.ts:29](https://github.com/adobe/aem-spa-component-mapping/blob/fe260fa/src/ComponentMapping.ts#L29)*

## Accessors

### `Static` instance

• **get instance**(): *[ComponentMappingImpl](componentmappingimpl.md)*

*Defined in [ComponentMapping.ts:31](https://github.com/adobe/aem-spa-component-mapping/blob/fe260fa/src/ComponentMapping.ts#L31)*

**Returns:** *[ComponentMappingImpl](componentmappingimpl.md)*

## Methods

###  get

▸ **get**(`resourceType`: string): *any | undefined*

*Defined in [ComponentMapping.ts:69](https://github.com/adobe/aem-spa-component-mapping/blob/fe260fa/src/ComponentMapping.ts#L69)*

Returns object (or undefined) matching with given resource type.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`resourceType` | string | resource type |

**Returns:** *any | undefined*

- class associated with given resource type

___

### `Protected` map

▸ **map**(`resourceTypes`: string | string[], `clazz`: any): *void*

*Defined in [ComponentMapping.ts:51](https://github.com/adobe/aem-spa-component-mapping/blob/fe260fa/src/ComponentMapping.ts#L51)*

Creates mapping for given resource type(s) and a component class.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`resourceTypes` | string &#124; string[] | resource type(s) |
`clazz` | any | component class that should be associated with given resource type(s)  |

**Returns:** *void*

___

### `Static` get

▸ **get**(`resourceType`: string): *any | undefined*

*Defined in [ComponentMapping.ts:79](https://github.com/adobe/aem-spa-component-mapping/blob/fe260fa/src/ComponentMapping.ts#L79)*

Returns object (or undefined) matching with given resource type.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`resourceType` | string | resource type |

**Returns:** *any | undefined*

- class associated with given resource type

___

### `Static` map

▸ **map**(`resourceTypes`: string | string[], `clazz`: any): *void*

*Defined in [ComponentMapping.ts:55](https://github.com/adobe/aem-spa-component-mapping/blob/fe260fa/src/ComponentMapping.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`resourceTypes` | string &#124; string[] |
`clazz` | any |

**Returns:** *void*
