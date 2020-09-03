[@adobe/aem-spa-component-mapping](README.md) › [Globals](globals.md)

# @adobe/aem-spa-component-mapping

## Index

### Classes

* [ComponentMappingImpl](classes/componentmappingimpl.md)

### Interfaces

* [ComponentMappingObject](interfaces/componentmappingobject.md)

### Variables

* [autoMapComponents](globals.md#let-automapcomponents)
* [config](globals.md#let-config)
* [configFile](globals.md#const-configfile)
* [instance](globals.md#let-instance)

### Functions

* [MapComponents](globals.md#private-let-mapcomponents)
* [MapTo](globals.md#mapto)

## Variables

### `Let` autoMapComponents

• **autoMapComponents**: *boolean* = true

*Defined in [utils/MapComponents.js:87](https://github.com/adobe/aem-spa-component-mapping/blob/0434ea5/src/utils/MapComponents.js#L87)*

___

### `Let` config

• **config**: *any* = fs.existsSync(configFile) ? JSON.parse(fs.readFileSync(configFile, 'utf8')) : {}

*Defined in [utils/MapComponents.js:91](https://github.com/adobe/aem-spa-component-mapping/blob/0434ea5/src/utils/MapComponents.js#L91)*

___

### `Const` configFile

• **configFile**: *"cq-component-mapping.json"* = "cq-component-mapping.json"

*Defined in [utils/MapComponents.js:90](https://github.com/adobe/aem-spa-component-mapping/blob/0434ea5/src/utils/MapComponents.js#L90)*

___

### `Let` instance

• **instance**: *[ComponentMappingImpl](classes/componentmappingimpl.md)*

*Defined in [ComponentMapping.ts:21](https://github.com/adobe/aem-spa-component-mapping/blob/0434ea5/src/ComponentMapping.ts#L21)*

## Functions

### `Private` `Let` MapComponents

▸ **MapComponents**(`sourceRoot`: string, `mappingOutput`: string, `extensions`: any): *void*

*Defined in [utils/MapComponents.js:27](https://github.com/adobe/aem-spa-component-mapping/blob/0434ea5/src/utils/MapComponents.js#L27)*

Explores given directory and generates js file requiring all components using @MapTo decorator.
WARNING: Not supported in babel for now (https://babeljs.io/docs/plugins/transform-decorators)

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`sourceRoot` | string | "./" | directory traversing root |
`mappingOutput` | string | "src/AllComponents.jsx" | name of generated file |
`extensions` | any | [ 'js', 'jsx', 'ts' ] | array of accepted file extensions  |

**Returns:** *void*

___

###  MapTo

▸ **MapTo**(`resourceTypes`: string | string[]): *(Anonymous function)*

*Defined in [ComponentMapping.ts:91](https://github.com/adobe/aem-spa-component-mapping/blob/0434ea5/src/ComponentMapping.ts#L91)*

Helper function that can be used to map a class to given resource type(s).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`resourceTypes` | string &#124; string[] | resource type(s) |

**Returns:** *(Anonymous function)*

- function meant to map a class with the previously given resource types
