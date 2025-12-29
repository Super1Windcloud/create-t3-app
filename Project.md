# Project Architecture

## Overview
This project is a modern full-stack web application built using the **T3 Stack** (Next.js, tRPC, Tailwind CSS). It leverages the latest versions of core libraries, including Next.js 16, React 19, and Tailwind CSS 4, focusing on end-to-end type safety, server-side rendering, and a robust developer experience.

## Tech Stack
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) with [Shadcn/UI](https://ui.shadcn.com/) components
- **API:** [tRPC v11](https://trpc.io/) (Type-safe APIs)
- **Database ORM:** [Prisma v7](https://www.prisma.io/)
- **Authentication:** [NextAuth.js v5 (Beta)](https://authjs.dev/)
- **Validation:** [Zod v4](https://zod.dev/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) & [TanStack Query](https://tanstack.com/query) (via tRPC)
- **Testing:** [Vitest](https://vitest.dev/) & React Testing Library
- **Linting & Formatting:** [Biome](https://biomejs.dev/)
- **Package Manager:** pnpm

## Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router (Pages, Layouts, API Routes)
│   ├── components/          # React Components
│   │   ├── ui/              # Reusable UI primitives (Shadcn/UI)
│   │   └── ...              # Feature-specific components
│   ├── hooks/               # Custom React Hooks
│   ├── lib/                 # Utility functions
│   ├── server/              # Backend Logic
│   │   ├── api/             # tRPC Routers & Procedures
│   │   ├── auth/            # Authentication Configuration
│   │   └── db.ts            # Prisma Database Client instance
│   ├── trpc/                # tRPC Client & Server Integration
│   ├── styles/              # Global styles (Tailwind)
│   └── env.js               # Environment Variable Validation (t3-oss/env)
├── prisma/                  # Database Schema & Migrations
├── public/                  # Static Assets & Locales
└── tests/                   # Test Setup
```

## Data Flow
1.  **Database Layer**: Data is defined in `prisma/schema.prisma` and accessed via the Prisma Client instantiated in `src/server/db.ts`.
2.  **API Layer (tRPC)**:
    -   Routers are defined in `src/server/api/routers`.
    -   Procedures (queries/mutations) use Prisma to interact with the database.
    -   **Context**: `src/server/api/trpc.ts` creates the context (session, db) for procedures.
3.  **Frontend Layer**:
    -   **Server Components (RSC)**: Fetch data directly using the `api` caller defined in `src/trpc/server.ts`. This bypasses HTTP overhead for internal data fetching.
    -   **Client Components**: Use the `api` hooks (e.g., `api.post.hello.useQuery`) exported from `src/trpc/react.tsx` (wrapping TanStack Query) for interactive data requirements.
    -   **Hydration**: Data fetched in RSCs can be passed to Client Components using the `HydrateClient` pattern to avoid double-fetching.

## Key Architectural Patterns

### End-to-End Type Safety
Types are inferred from the Prisma schema, flowing through the tRPC routers, and finally to the React components. This ensures that changing a database field causes compile-time errors in the UI if not handled.

### Authentication (NextAuth v5)
-   Configuration is located in `src/server/auth`.
-   Uses the `@auth/prisma-adapter` to persist sessions in the database.
-   Protected tRPC procedures (`protectedProcedure`) verify the user's session before execution.

### Internationalization (i18n)
-   The project supports multiple languages (en, de, es, fr, zh).
-   Locale files are stored in `public/locales`.
-   Components use `i18next` and `react-i18next` for translations.
-   `src/components/I18nProvider.tsx` likely handles the client-side provider setup.

### Development Tooling
-   **Biome**: Used for fast linting and formatting, replacing the traditional ESLint/Prettier stack.
-   **Zod Environment Variables**: `src/env.js` validates all environment variables at build and runtime, preventing crashes due to missing configuration.
