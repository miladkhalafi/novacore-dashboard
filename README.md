# NovaCore Dashboard Frontend

Frontend dashboard application for NovaCore backend system built with React, TypeScript, and Vite. This project follows a modular architecture pattern for scalability and maintainability.

## 🎨 Features

- **Beautiful Blue Theme**: Modern blue color scheme with gradient accents
- **Persian Font**: Vazir font for beautiful Persian text rendering
- **Sidebar Navigation**: Fixed sidebar with smooth transitions
- **Responsive Design**: Works on all screen sizes
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first CSS framework
- **Modular Architecture**: Self-contained modules for easy scaling
- **RTL Support**: Right-to-Left layout for Persian language

## 🚀 Getting Started

### Prerequisites

- **Node.js**: >=18.18.0 (recommended: Node.js 20+ or 24+)
- **npm** or **yarn**

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

The project follows a modular architecture pattern:

```
novacore-dashboard/
├── src/
│   ├── modules/                    # Business Modules
│   │   ├── dashboard/              # Dashboard Module
│   │   │   ├── pages/              # Module-specific pages
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── Menus.tsx
│   │   │   │   └── Settings.tsx
│   │   │   ├── components/         # Module-specific components
│   │   │   │   ├── MenuForm.tsx
│   │   │   │   ├── MenuItemForm.tsx
│   │   │   │   └── SettingsForm.tsx
│   │   │   ├── services/           # API services
│   │   │   │   └── dashboardApi.ts
│   │   │   ├── types/              # TypeScript types
│   │   │   │   └── dashboard.types.ts
│   │   │   ├── hooks/              # Custom React hooks
│   │   │   └── routes.tsx          # Module routes
│   │   └── cms/                    # CMS Module
│   │       ├── pages/
│   │       │   └── CmsDashboard.tsx
│   │       ├── components/
│   │       ├── services/
│   │       │   └── cmsApi.ts
│   │       ├── types/
│   │       │   └── cms.types.ts
│   │       ├── hooks/
│   │       └── routes.tsx
│   ├── shared/                     # Shared Resources
│   │   ├── components/            # Shared UI components
│   │   │   ├── Layout.tsx
│   │   │   └── ui/                # Reusable UI components
│   │   │       ├── button.tsx
│   │   │       ├── card.tsx
│   │   │       └── input.tsx
│   │   ├── services/              # Shared services
│   │   │   └── apiClient.ts       # Base API client
│   │   └── utils/                 # Utility functions
│   │       └── utils.ts
│   ├── App.tsx                     # Main app with module route registration
│   └── main.tsx                    # Entry point
├── public/                         # Static assets
├── index.html                      # HTML template
├── vite.config.ts                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
└── package.json                    # Dependencies
```

## 🏗️ Modular Architecture

### Module Structure Pattern

Each module follows a consistent structure:

1. **Types** (`types/`): TypeScript interfaces and types specific to the module
2. **Services** (`services/`): API service functions using shared `apiClient`
3. **Pages** (`pages/`): React page components
4. **Components** (`components/`): Module-specific React components
5. **Hooks** (`hooks/`): Custom React hooks for state management
6. **Routes** (`routes.tsx`): Route definitions exported as an array

### Path Aliases

The project uses path aliases configured in `tsconfig.json` and `vite.config.ts`:

- `@/*` → `src/*`

Example imports:
```typescript
import { apiClient } from '@/shared/services/apiClient'
import { dashboardApi } from '@/modules/dashboard/services/dashboardApi'
```

### Benefits

- **Module Independence**: Each module is self-contained
- **Scalability**: Easy to add/remove modules
- **Team Collaboration**: Teams can work on different modules
- **Code Organization**: Clear separation of concerns
- **Type Safety**: Module-specific types
- **Future Extraction**: Modules can be split into separate apps if needed

## 📦 Dashboard Module

### Implemented Features

#### 1. Settings Management (`/settings`)

**API Endpoints:**
- `GET /api/v1/dashboard/settings` - Get all settings
- `PUT /api/v1/dashboard/settings` - Bulk update settings
- `GET /api/v1/dashboard/ui-data` - Get UI data for dropdowns

**Features:**
- View all dashboard settings in a grid layout
- Support for different data types: Text, Boolean, Color, ImageUrl, MenuReference
- Real-time form validation
- Error handling and loading states
- Auto-load UI data for data type labels

**Components:**
- `SettingsForm.tsx` - Dynamic form generation based on data types
- `Settings.tsx` - Settings page

#### 2. Menus Management (`/menus`)

**API Endpoints:**
- `GET /api/v1/dashboard/menus` - List all menus (with filter)
- `GET /api/v1/dashboard/menus/{id}` - Get menu with full hierarchy
- `POST /api/v1/dashboard/menus` - Create menu
- `PUT /api/v1/dashboard/menus/{id}` - Update menu
- `DELETE /api/v1/dashboard/menus/{id}` - Delete menu
- `PUT /api/v1/dashboard/menus/{id}/active` - Toggle menu active status

**Features:**
- Menu list view with search and filter functionality
- Create, edit, and delete menus
- Toggle active/inactive status
- Visual status indicators
- Menu details view with full hierarchy

**Components:**
- `MenuForm.tsx` - Create/Edit menu form
- `Menus.tsx` - Main menus page

#### 3. Menu Items Management

**API Endpoints:**
- `POST /api/v1/dashboard/menus/{id}/items` - Add menu item
- `PUT /api/v1/dashboard/menus/items/{itemId}` - Update menu item
- `DELETE /api/v1/dashboard/menus/items/{itemId}` - Delete menu item
- `PUT /api/v1/dashboard/menus/items/{itemId}/visibility` - Toggle visibility
- `PUT /api/v1/dashboard/menus/{menuId}/items/reorder` - Reorder items

**Features:**
- Add, edit, and delete menu items
- Support for hierarchical menu structure (parent/child items)
- Icon selection (lucide-react icon names)
- Order management
- Visibility toggle
- Hierarchical display with visual indentation

**Components:**
- `MenuItemForm.tsx` - Comprehensive form for menu items

### Technical Implementation

- **State Management**: React hooks (`useState`, `useEffect`)
- **Error Handling**: Try-catch blocks with user-friendly error messages
- **Loading States**: Loading indicators during API calls
- **User Experience**: Confirmation dialogs, success feedback, form validation
- **RTL Support**: Right-to-Left layout for Persian language

## 🔌 API Integration

The frontend is configured to communicate with the NovaCore backend API:

- **Base URL**: `/api/v1/dashboard`
- **Proxy**: Configured in `vite.config.ts` to proxy `/api` requests to `http://localhost:5000`

### API Client

All modules use the centralized API service:
- `src/shared/services/apiClient.ts`

This ensures:
- Consistent error handling
- Type safety
- Centralized API configuration
- Easy maintenance

## 🛠️ Tech Stack

### Core Dependencies

- **React**: `18.3.1` - UI library
- **React DOM**: `18.3.1` - React rendering
- **React Router DOM**: `6.26.2` - Routing
- **TypeScript**: `5.6.3` - Type safety
- **Vite**: `4.5.3` - Build tool and dev server

### Styling

- **Tailwind CSS**: `3.4.17` - Utility-first CSS framework
- **PostCSS**: `8.4.49` - CSS processing
- **Autoprefixer**: `10.4.20` - CSS vendor prefixing

### UI Libraries

- **Lucide React**: `0.468.0` - Icon library
- **Axios**: `1.7.7` - HTTP client
- **class-variance-authority**: `0.7.1` - Component variants
- **clsx**: `2.1.1` - Conditional class names
- **tailwind-merge**: `3.4.0` - Tailwind class merging

### Development Tools

- **ESLint**: `8.57.1` - Code linting
- **TypeScript ESLint**: `7.18.0` - TypeScript linting
- **@vitejs/plugin-react**: `4.3.1` - Vite React plugin

### Node.js Compatibility

- **Required**: Node.js >=18.18.0
- **Recommended**: Node.js 20+ or 24+
- **ES Modules**: Project uses ES module syntax (`"type": "module"`)

## 🎨 Design System

### Colors

- **Primary Blue**: `#2563eb` (blue-600)
- **Gradient**: `from-blue-600 to-blue-700`
- **Background**: `gray-50`
- **Cards**: White with subtle shadows

### Typography

- **Font**: Vazir (Persian font from Google Fonts)
- **Direction**: RTL (Right-to-Left) for Persian support

### Components

- **Sidebar**: Fixed right sidebar with navigation
- **Cards**: White cards with rounded corners and shadows
- **Buttons**: Blue primary buttons with hover effects
- **Forms**: Dynamic form generation with validation

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

## 📝 Development Guidelines

### Code Style

- Use TypeScript for all new files
- Follow React best practices and hooks patterns
- Use path aliases (`@/`) for imports
- Keep modules self-contained
- Use shared components from `@/shared/components`

### Error Handling

- All API calls should use try-catch blocks
- Display user-friendly error messages in Persian
- Handle loading states appropriately

### Testing

- Write tests for critical business logic
- Test API integrations
- Test component rendering

## 🔮 Future Enhancements

1. **Drag and Drop Reordering**: Implement drag-and-drop for menu items
2. **Bulk Operations**: Select multiple menus/items for bulk actions
3. **Menu Preview**: Live preview of menu structure
4. **Advanced Filtering**: Filter by date, number of items, sort options
5. **Export/Import**: Export/import menu structure as JSON
6. **State Management**: Consider Redux, Zustand, or React Query
7. **Form Validation**: Implement React Hook Form + Zod
8. **Authentication**: Implement login/logout flow

## 📄 License

ISC
