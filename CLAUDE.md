# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

DMS Platform (Degyal Memorial Society) is an Nx monorepo with three deployable apps sharing one domain: **students** and **donors** for an educational-support nonprofit.

- `apps/web` — public-facing **Next.js 16** (App Router, React 19) site. Read-only display of students/donors + a public student registration form. Runs on port **3000**.
- `apps/bo` — **backoffice** admin SPA: Vite + React 19 + React Router + Zustand. Authenticated admin CRUD over students/donors. Runs on port **4201**.
- `apps/api` — **NestJS 11** REST API backed by MongoDB (Mongoose). Runs on port **3333**, all routes under the `/api` global prefix. Swagger UI at `/api/docs`.
- `libs/shared` — shared TypeScript interfaces & types (`@dms-platform/shared`), consumed by all apps. Contains the canonical `Student`, `Donor`, `Admin`, `ApiResponse`, and pagination types.

`apps/*-e2e` are Playwright e2e projects for their matching app.

## Commands

Run from the repo root. The `dev`/`build`/`start` npm scripts default to the **web** app.

```sh
npm run dev            # web (Next.js) on :3000  — alias: dev:web
npm run dev:api        # api (NestJS) on :3333   — nx serve api
npm run dev:bo         # bo (Vite) on :4201      — nx serve bo
npm run dev:all        # api + bo together (parallel)

npm run build:web      # / build:api / build:bo
npm run start:api      # node dist/apps/api/main.js  (after build:api)

npm run seed           # seed MongoDB with sample data + default admin (see below)
npm run test:e2e       # Playwright e2e for web

npm run format         # prettier --write .
npm run graph          # nx dependency graph
npm run clean          # nx reset (clear Nx cache)
```

Nx targets (use these for lint/test on a specific project — they are inferred, not in `package.json`):

```sh
npx nx lint <project>              # eslint
npx nx test <project>              # jest (api) or vitest (bo/shared)
npx nx test <project> --watch
npx nx test api --testFile=students.service.spec.ts   # single test file
npx nx run-many --target=lint --all
```

`npx nx show project <name> --web` lists all available targets for a project.

## Environment

Each app reads its own env file (all gitignored). The API's `ConfigModule` looks for `apps/api/.env` (or `.env`).

- `apps/api/.env` — `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN` (default `7d`), `PORT` (default 3333), `CORS_ORIGINS` (comma-separated; defaults to localhost 3000/4200/4201 in dev).
- `apps/web/.env.local` — `NEXT_PUBLIC_API_URL` (default `http://localhost:3333/api`).
- `apps/bo/.env` — `VITE_API_BASE_URL` (default `http://localhost:3333/api`).

`npm run seed` creates a default superadmin (`admin@dms.org` / `Admin@123`) plus sample students/donors — but only when each collection is empty (idempotent).

## Architecture & conventions

### API response envelope
Every API endpoint returns a consistent envelope — **do not return bare data**. Services build this object directly:

```ts
{ success: boolean, message: string, data: T }
// paginated endpoints additionally include: total, page, limit, totalPages
```

The `GlobalExceptionFilter` (registered in `main.ts`) coerces all errors — including thrown `NotFoundException` etc. — into `{ success: false, message, data: null }`. Throw standard Nest `HttpException`s in services; the filter formats them. The shape is mirrored in `libs/shared` (`ApiResponse` / `PaginatedApiResponse`) and re-declared client-side in `apps/web/src/lib/api.ts` and the bo `api/*.ts` files.

### API module pattern
Feature modules live under `apps/api/src/modules/<feature>/` and each follow the same layout: `*.module.ts`, `*.controller.ts` (Swagger-decorated), `*.service.ts` (all business logic + Mongoose access), `schemas/*.schema.ts`, and `dto/{create,update,query}-*.dto.ts` (class-validator DTOs). Register new modules in `app/app.module.ts`.

- **Soft deletes**: records carry `isDeleted: boolean`; delete endpoints set it to `true`. All queries filter `{ isDeleted: false }` — preserve this when adding queries.
- **Validation**: a global `ValidationPipe` runs with `whitelist + forbidNonWhitelisted + transform`, so DTOs must declare every accepted field or the request is rejected.
- **Search/pagination**: `findAll` services parse `page`/`limit` query strings, build a `$regex`/`$or` filter, and run `find().skip().limit().lean()` alongside `countDocuments` via `Promise.all`.

### Auth & authorization
JWT bearer auth via Passport (`JwtStrategy`). Protect admin-only routes with `@UseGuards(JwtAuthGuard, RolesGuard)` + `@Roles('admin', 'superadmin')` + `@ApiBearerAuth()`. `@CurrentUser()` extracts the authenticated user (`{ _id, email, role }`) from the request. Public endpoints (student registration, all GETs) have no guards — check existing controllers before adding auth.

### Frontend data access
- **web** (`src/lib/api.ts`): plain `fetch` wrapper `apiFetch`, used in Server Components with Next ISR (`next: { revalidate: 60 }`). No auth — public reads only.
- **bo** (`src/api/*.ts` + `src/api/axios.ts`): shared axios instance that attaches the JWT from the Zustand `useAuthStore` on every request and auto-logs-out + redirects to `/login` on any 401. Auth state is persisted to localStorage (key `dms-bo-auth`). Add new admin API calls as functions in `src/api/<entity>.api.ts`.

### Shared types
Add cross-app domain types to `libs/shared/src/lib/{interfaces,types}` and re-export from `libs/shared/src/index.ts`. Import via `@dms-platform/shared` (path alias in `tsconfig.base.json`). Note the frontends currently duplicate some of these types locally rather than importing them — prefer the shared lib for new code.
