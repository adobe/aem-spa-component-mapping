# Development

Run npm install to get all node_modules that are necessary for development.

## Build

```sh
$ npm run build
```

or

```sh
$ npm run build:production
```

## Test

```sh
$ npm run test
```

## Usage example

The `MapTo` helper can be used to directly associate resource type(s) with a given SPA component.

```
import { MapTo } from '@adobe/spa-component-mapping';

class MyComponent {
    ...
}

export default MapTo('my/resource/type')(MyComponent);

```
