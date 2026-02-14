# pool-id

HMAC-based short ID generation and validation.

## Install

```
npm install github:shatll-s/pool-id
```

## Usage

```js
const { generate, validate, isPoolIdFormat } = require('pool-id')

const id = generate('your-secret')  // e.g. "n37nea2fks"
validate(id, 'your-secret')         // true
validate(id, 'wrong-secret')        // false
isPoolIdFormat(id)                   // true (no secret needed)
```

### Browser-safe import

`isPoolIdFormat` doesn't use Node.js `crypto` and works in browsers:

```js
import { isPoolIdFormat } from 'pool-id/format'
```

## Format

`[prefix][random][checksum]` — 10 characters, lowercase alphanumeric (without 0, o, 1, l).
