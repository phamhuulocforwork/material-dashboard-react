# Code Style & Conventions

## General Style
- Uses **JavaScript** (not TypeScript) with JSX
- **Functional components** with React hooks
- **ES6+ features** (arrow functions, destructuring, etc.)
- **Component-based architecture**

## File Naming
- **PascalCase** for component files (e.g., `DashboardLayout.js`)
- **camelCase** for utility functions and data files  
- **kebab-case** for routes and some folders (e.g., `sign-in`)

## Import Organization
- External libraries first (React, MUI, etc.)
- Internal components second (components, examples)
- Data/utilities last
- Uses **absolute imports** with `src` as baseUrl (jsconfig.json)

## Component Structure
```jsx
// License header comment
// External imports
import React from 'react';
import Grid from '@mui/material/Grid';

// Internal component imports  
import MDBox from 'components/MDBox';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';

// Data imports
import chartData from './data/chartData';

function ComponentName() {
  // Component logic
  return (
    <DashboardLayout>
      {/* JSX structure */}
    </DashboardLayout>
  );
}

export default ComponentName;
```

## Material-UI Patterns
- Uses **MUI styled() API** and **sx prop** for styling
- Custom components prefixed with **MD** (MDBox, MDButton, etc.)
- Consistent use of MUI Grid system
- Theme-based color and spacing values

## Routing Convention
- Routes defined in `src/routes.js` 
- Each route has type, name, key, icon, route, component properties
- Layout components in `/src/layouts/[page-name]/`