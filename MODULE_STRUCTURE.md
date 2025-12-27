# Modular Frontend Architecture

This document describes the modular structure implemented in the novacore-dashboard project.

## 📁 Project Structure

```
src/
├── modules/                    # Business Modules
│   ├── dashboard/              # Dashboard Module
│   │   ├── pages/              # Module-specific pages
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Menus.tsx
│   │   │   └── Settings.tsx
│   │   ├── components/         # Module-specific components
│   │   ├── services/           # API services
│   │   │   └── dashboardApi.ts
│   │   ├── types/              # TypeScript types
│   │   │   └── dashboard.types.ts
│   │   ├── hooks/              # Custom React hooks
│   │   └── routes.tsx          # Module routes
│   └── cms/                    # CMS Module
│       ├── pages/
│       │   └── CmsDashboard.tsx
│       ├── components/
│       ├── services/
│       │   └── cmsApi.ts
│       ├── types/
│       │   └── cms.types.ts
│       ├── hooks/
│       └── routes.tsx
├── shared/                     # Shared Resources
│   ├── components/            # Shared UI components
│   │   ├── Layout.tsx
│   │   └── ui/                # Reusable UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── input.tsx
│   ├── services/              # Shared services
│   │   └── apiClient.ts       # Base API client
│   └── utils/                 # Utility functions
│       └── utils.ts
├── App.tsx                     # Main app with module route registration
└── main.tsx
```

## 🎯 Module Structure Pattern

Each module follows a consistent structure:

### 1. **Types** (`types/`)
- TypeScript interfaces and types specific to the module
- Enums and type definitions
- Request/Response types for API calls

### 2. **Services** (`services/`)
- API service functions
- Centralized API calls for the module
- Uses the shared `apiClient` from `@/shared/services/apiClient`

### 3. **Pages** (`pages/`)
- React page components
- Module-specific views and layouts

### 4. **Components** (`components/`)
- Module-specific React components
- Reusable within the module

### 5. **Hooks** (`hooks/`)
- Custom React hooks
- Module-specific state management and logic

### 6. **Routes** (`routes.tsx`)
- Route definitions for the module
- Exported as an array of Route elements

## 🔧 Configuration

### Path Aliases
The project uses path aliases configured in `tsconfig.json` and `vite.config.ts`:

- `@/*` → `src/*`

This allows imports like:
```typescript
import { apiClient } from '@/shared/services/apiClient'
import { dashboardApi } from '@/modules/dashboard/services/dashboardApi'
```

### API Client
The shared API client (`@/shared/services/apiClient`) handles:
- Base URL configuration
- Authentication token injection
- Request/response interceptors
- Error handling

## 📦 Module Registration

Modules are registered in `App.tsx`:

```typescript
import { dashboardRoutes } from './modules/dashboard/routes'
import { cmsRoutes } from './modules/cms/routes'

function App() {
  return (
    <Layout>
      <Routes>
        {dashboardRoutes}
        {cmsRoutes}
      </Routes>
    </Layout>
  )
}
```

## 🚀 Adding a New Module

To add a new module (e.g., `users`):

1. **Create module structure:**
   ```
   src/modules/users/
   ├── pages/
   ├── components/
   ├── services/
   │   └── usersApi.ts
   ├── types/
   │   └── users.types.ts
   ├── hooks/
   └── routes.tsx
   ```

2. **Create types** (`types/users.types.ts`):
   ```typescript
   export interface User {
     id: number
     name: string
     email: string
   }
   ```

3. **Create API service** (`services/usersApi.ts`):
   ```typescript
   import { apiClient } from '@/shared/services/apiClient'
   
   const BASE_URL = '/api/v1/users'
   
   export const usersApi = {
     getUsers: async () => {
       const response = await apiClient.get(`${BASE_URL}`)
       return response.data
     },
   }
   ```

4. **Create routes** (`routes.tsx`):
   ```typescript
   import { Route } from 'react-router-dom'
   import UsersPage from './pages/UsersPage'
   
   export const usersRoutes = [
     <Route key="users" path="/users" element={<UsersPage />} />,
   ]
   ```

5. **Register in App.tsx**:
   ```typescript
   import { usersRoutes } from './modules/users/routes'
   
   // In App component:
   {usersRoutes}
   ```

## ✅ Benefits

1. **Module Independence**: Each module is self-contained
2. **Scalability**: Easy to add/remove modules
3. **Team Collaboration**: Teams can work on different modules
4. **Code Organization**: Clear separation of concerns
5. **Reusability**: Shared components and utilities
6. **Type Safety**: Module-specific types
7. **Future Extraction**: Modules can be split into separate apps if needed

## 📝 Notes

- Old files in `src/pages/` and `src/components/` can be removed once migration is complete
- The `src/lib/utils.ts` file can be removed (moved to `src/shared/utils/utils.ts`)
- All imports should use the `@/` alias for consistency

