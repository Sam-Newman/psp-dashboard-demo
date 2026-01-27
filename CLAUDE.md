# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PSP Dashboard for WalletConnect Pay - a demo dashboard for managing payment merchants, transactions, and settlements on blockchain networks.

## Commands

```bash
pnpm dev          # Start dev server on port 3001
pnpm build        # Production build
pnpm lint         # ESLint (zero warnings tolerance)
pnpm typecheck    # TypeScript type checking
```

## Architecture

**Stack:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS

**Monorepo Structure:**
- `/src/app` - Next.js App Router pages (route group `(demo)` for main app)
- `/src/components` - App-specific React components
- `/src/lib` - Types, mock data, hooks, utilities, constants
- `/packages/ui` - Shared UI component library (`@pay-merchant/ui`)

**UI Components:** Built on Radix UI primitives with shadcn patterns. Components are pulled from WalletConnect's registry:
```bash
pnpm dlx shadcn@latest add https://dashboard.walletconnect.com/r/<component-name>
```

**Imports:**
```tsx
import { Button } from "@pay-merchant/ui/ui/button";
import { useRole } from "@/lib/hooks/use-role";
```

Path alias: `@/*` maps to `./src/*`

**Role-Based Access Control:** Three roles (`admin`, `analyst`, `support`) managed via `RoleProvider` context and `useRole()` hook. Persisted in localStorage.

**Key Types:** `Merchant`, `Transaction`, `Settlement`, `Role` defined in `/src/lib/types/`

## Styling

Dark theme with custom colors (`#1a1a1a` background, `#0988f0` accent). Custom font: KHTeka. Tailwind config extends `@pay-merchant/ui/tailwind` preset.
