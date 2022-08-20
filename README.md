# Dynamic environment variables in static builds

This is a companion package to the https://github.com/anton-fomin/inject-env tool. Which allows to inject enviroment variables as JSON to static builds.

It simplifies a bit usage of the injected environment variables.

## Installation

```
npm i static-build-env
```

## Usage

If the `inject-env` was used as in documentation examples then the usage would be:

Create a `settings.ts` file

```typescript
import { defineEnv } from 'static-build-env'
const env = defineEnv() as Record<string, unknown> // defineEnv return type is unknown, because only you know what you put there

// Export some constant
export const API_URL: string = env.API_URL || import.meta.env.API_URL || '/graphql'
```

Then just import these constants in your code.
