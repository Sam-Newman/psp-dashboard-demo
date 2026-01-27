# @pay-merchant/ui

Shared UI component library for Pay Merchant applications.

Components are pulled from the WalletConnect shadcn registry at `https://dashboard.walletconnect.com/r`.

## Adding Components

To add a new component from the registry:

```bash
pnpm dlx shadcn@latest add https://dashboard.walletconnect.com/r/<component-name>
```

For example:

```bash
pnpm dlx shadcn@latest add https://dashboard.walletconnect.com/r/button.json
```

## Updating Components

Components are copied into the codebase and can be customized freely. To pull updates from the registry (this will overwrite local changes):

```bash
pnpm dlx shadcn@latest add https://dashboard.walletconnect.com/r/<component-name> --overwrite
```

## Usage

Import components in your app:

```tsx
import { Button } from "@pay-merchant/ui/ui/button";
import { Input } from "@pay-merchant/ui/ui/input";
```

Import global styles in your root layout:

```tsx
import "@pay-merchant/ui/globals.css";
```

Note:

Components under the ui folder are foundation components.
