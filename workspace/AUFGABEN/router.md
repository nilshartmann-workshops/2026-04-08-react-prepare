# TanStack Router

## Installieren:

```bash
npm i @tanstack/react-router
npm i @tanstack/react-router-devtools
npm i -D @tanstack/router-plugin
```

## `vite.config.js`

```typescript
    // ...
    tanstackRouter({
	  target: "react",
    }),
    react()
```

## `src/routes/__root.tsx`

```typescript jsx
import { createRootRoute, Outlet } from "@tanstack/react-router";
import * as React from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="AppLayout">
      <Outlet />
    </div>
  );
}

```

## main.tsx

```typescript jsx

const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

```