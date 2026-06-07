# TryOn — Virtual Fashion Try-On

A web application that lets users select fashion products, upload a photo of themselves, and see the product overlaid on their image. Built as a candidate assessment project.

## How to Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The app will be available at `http://localhost:5173`.

## Firebase Setup (Required for Gmail OAuth)

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Google** sign-in under Authentication → Sign-in method
3. Add `localhost` and your deployed domain to Authorized domains
4. Copy your config values into `.env`:

```
VITE_FIREBASE_API_KEY=your-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=000000000000
VITE_FIREBASE_APP_ID=1:000:web:000
```

## Libraries Used

| Library | Purpose |
|---------|---------|
| React 19 | UI framework |
| Vite | Build tool & dev server |
| React Router v6 | Client-side routing |
| Firebase Auth | Google OAuth sign-in |
| Chart.js + react-chartjs-2 | Admin analytics charts |
| Lucide React | Icon library |
| CSS Modules | Scoped component styling |

## Application Screens

1. **Landing Page** (`/`) — Hero with product showcase and feature highlights
2. **Sign In** (`/auth`) — Google OAuth via Firebase (functional, not mocked)
3. **Product Selection** (`/products`) — Grid of 10 items with multi-select and category filters
4. **Photo Upload** (`/upload`) — Drag-and-drop or sample model with preview
5. **Try-On Result** (`/tryon`) — Canvas overlay with draggable positioning, opacity/size controls, and download
6. **Admin Panel** (`/admin`) — Dashboard with summary cards, line/doughnut/bar charts, and product table

## Known Limitations

- Try-on overlay uses CSS/Canvas compositing rather than AI-powered fitting. Product images are placed as-is on the user photo.
- Product images are sourced from Unsplash and require an internet connection.
- Admin panel is optimized for desktop viewports.
- Canvas download may be blocked by CORS if product images fail to load with `crossOrigin` attribute in certain browsers.
