# NODEJS SERVER TEMPLATE

A minimal, modular Node.js server template using Express, Mongoose and a simple IoC container.  
Designed for quick prototyping or as a starting point for production services.

## Features
- Clean project structure with separation between core, app (use-cases), interface-adapters (controllers), infrastructure and DI modules.
- Dependency Injection via [`@evyweb/ioctopus`].
- JWT auth with RS256 using private/public keys.
- Password hashing with bcrypt.
- Transaction manager wrapper for Mongoose sessions.
- Type-safe input validation using Zod.

## Quickstart

### 1. Install
```sh
pnpm install
npm install
```

### 2. Environment Create a .env file (see src/config.ts) with at least:

- PORT
- URI
- DB_NAME
- PRIVATE_KEY
- PUBLIC_KEY
- CLIENT_URL

### 3. Run in development
```sh
pnpm dev
```

or

```sh
npm run dev
```

### 4. Build / Start

```sh
pnpm build
pnpm start
```

or

```sh
npm run build
npm start
```

## Key files & entrypoints

- App bootstrap: App — mounts middleware and routes.
- HTTP server entry: src/infrastructure/http/server.ts
- DI container: getInjection — where modules are loaded.
- Main router: router — mounts the API router.
- Auth controller: AuthController
- User controller: UserController
- Auth service (JWT + bcrypt): AuthenticationService
- Mongoose models: src/infrastructure/models/user.model.ts
- Database connect: src/infrastructure/database/db.ts
- Protect middleware (token guard): src/middlewares/protect.ts
- Routes: src/routes/api/api.router.ts, src/routes/auth/auth.router.ts, src/routes/user/user.router.ts

## Project structure

- src/core: domain entities, interfaces and errors
- src/app: use-cases and application interfaces
- src/interface-adapters: controllers and DTOs
- src/infrastructure: database, models, repositories, services and HTTP server
- src/DI: dependency injection modules and container
- src/routes: express route definitions
- src/middlewares: express middleware (auth guard)

## Extending the template

- Add new modules by creating a DI module under src/DI/modules and binding services, repositories and controllers with DI_SYMBOLS.
- Implement business logic as use-cases in src/app/use-cases.
- Expose endpoints by adding routes under src/routes.

## Scripts

- Development: dev (see package.json)
- Build: build
- Start: start

**License MIT — see LICENSE**

- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 
- 