# NovaCore Dashboard Frontend

Frontend dashboard application for NovaCore backend system built with React, TypeScript, and Vite.

## 🎨 Features

- **Beautiful Blue Theme**: Modern blue color scheme with gradient accents
- **Persian Font**: Vazir font for beautiful Persian text rendering
- **Sidebar Navigation**: Fixed sidebar with smooth transitions
- **Responsive Design**: Works on all screen sizes
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first CSS framework

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended: Node.js 20+)
- npm or yarn

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

```
novacore-dashboard/
├── src/
│   ├── components/
│   │   └── Layout.tsx          # Main layout with sidebar
│   ├── pages/
│   │   ├── Dashboard.tsx      # Dashboard home page
│   │   ├── Settings.tsx        # Settings page
│   │   └── Menus.tsx           # Menu management page
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   ├── index.css               # Global styles
│   └── vite-env.d.ts          # Vite type definitions
├── public/                     # Static assets
├── index.html                  # HTML template
├── vite.config.ts             # Vite configuration
├── tailwind.config.js         # Tailwind CSS configuration
└── package.json               # Dependencies
```

## 🎯 Pages

### Dashboard
- Welcome section with gradient background
- Statistics cards with icons
- Recent activity feed
- System status indicators

### Settings
- Branding settings (app name, logo)
- Theme customization (colors, dark mode)
- Footer text configuration

### Menus
- Menu list with cards
- Active/inactive status indicators
- Quick actions (edit, toggle, delete)

## 🔌 API Integration

The frontend is configured to communicate with the NovaCore backend API:

- **Base URL**: `/api/v1/dashboard`
- **Proxy**: Configured in `vite.config.ts` to proxy `/api` requests to `http://localhost:5000`

### Available Endpoints

See `../novacore/Modules/Dashboard/DASHBOARD_FRONTEND_API_ANALYSIS.md` for complete API documentation.

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

## 📝 Next Steps

1. **Connect to Backend**: Implement API calls using fetch or axios
2. **Add State Management**: Consider Redux, Zustand, or React Query
3. **Add Forms**: Implement form validation (React Hook Form + Zod)
4. **Add Authentication**: Implement login/logout flow
5. **Add More Pages**: Expand based on backend modules

## 🛠️ Tech Stack

- **React 18**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling
- **React Router**: Routing
- **Lucide React**: Icons

## 📄 License

ISC
