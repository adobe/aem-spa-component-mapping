[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# Table of contents

  * [Installation](#installation)
  * [Usage](#usage)
  * [Documentation](#documentation)
    * [Contributing](#contributing)
    * [Licensing](#licensing)


## Installation
```
npm install @adobe/aem-spa-component-mapping
```

## Usage

This module provides helpers to map resource types with SPA components.

### MapTo

The `MapTo` helper can be used to directly associate resource type(s) with a given SPA component.

```
import { MapTo } from '@adobe/spa-component-mapping';

class MyComponent {
    ...
}

export default MapTo('my/resource/type')(MyComponent);

```

## Documentation

The [technical documentation](https://www.adobe.com/go/aem6_4_docs_spa_en) is already available, but if you are unable to solve your problem or you found a bug you can always create an issue or through other means [contact us](https://www.adobe.com/go/aem6_4_support_en) and ask for help!

### Contributing

Contributions are welcome! Read the [Contributing Guide](CONTRIBUTING.md) for more information.

### Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
