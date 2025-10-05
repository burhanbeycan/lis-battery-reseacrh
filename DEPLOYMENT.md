# Deployment Guide

This guide covers multiple deployment options for the Li-S Battery Research website.

---

## 📦 Build for Production

Before deploying, build the optimized production bundle:

```bash
# Install dependencies
pnpm install

# Build
pnpm run build

# Preview locally
pnpm run preview
```

The build output will be in the `dist/` directory.

---

## 🚀 Deployment Options

### 1. GitHub Pages (Recommended)

**Step 1:** Install gh-pages

```bash
pnpm add -D gh-pages
```

**Step 2:** Add deployment script to `package.json`

```json
{
  "scripts": {
    "deploy": "pnpm run build && gh-pages -d dist"
  }
}
```

**Step 3:** Update `vite.config.js` for GitHub Pages

```javascript
export default defineConfig({
  base: '/your-repo-name/',  // Replace with your repository name
  // ... rest of config
})
```

**Step 4:** Deploy

```bash
pnpm run deploy
```

**Step 5:** Enable GitHub Pages
- Go to repository Settings → Pages
- Source: `gh-pages` branch
- Save

Your site will be available at: `https://yourusername.github.io/your-repo-name/`

---

### 2. Vercel

**Option A: Via Vercel Dashboard**

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub repository
4. Vercel auto-detects Vite configuration
5. Click "Deploy"

**Option B: Via Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

**Environment Variables** (if needed):
- Add in Vercel dashboard under Settings → Environment Variables

---

### 3. Netlify

**Option A: Drag & Drop**

1. Build locally: `pnpm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag `dist/` folder to deploy area

**Option B: Git Integration**

1. Go to Netlify dashboard
2. Click "New site from Git"
3. Connect GitHub repository
4. Build settings:
   - Build command: `pnpm run build`
   - Publish directory: `dist`
5. Deploy

**Option C: Netlify CLI**

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod --dir=dist
```

---

### 4. Firebase Hosting

**Step 1:** Install Firebase CLI

```bash
npm install -g firebase-tools
```

**Step 2:** Login and initialize

```bash
firebase login
firebase init hosting
```

**Step 3:** Configure `firebase.json`

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

**Step 4:** Deploy

```bash
pnpm run build
firebase deploy
```

---

### 5. AWS S3 + CloudFront

**Step 1:** Build the project

```bash
pnpm run build
```

**Step 2:** Create S3 bucket
- Go to AWS S3 console
- Create bucket with public access
- Enable static website hosting

**Step 3:** Upload files

```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

**Step 4:** Configure CloudFront (optional)
- Create CloudFront distribution
- Set S3 bucket as origin
- Configure caching and HTTPS

---

### 6. Docker

**Create `Dockerfile`:**

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Build and run:**

```bash
# Build image
docker build -t lis-battery-research .

# Run container
docker run -p 8080:80 lis-battery-research
```

---

## 🔧 Configuration

### Base URL

For subdirectory deployments, update `vite.config.js`:

```javascript
export default defineConfig({
  base: '/subdirectory/',
})
```

### Environment Variables

Create `.env.production`:

```bash
VITE_API_URL=https://api.example.com
VITE_ANALYTICS_ID=your-id
```

Access in code:

```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

---

## 🎯 Post-Deployment Checklist

- [ ] Test all pages and features
- [ ] Verify responsive design (mobile, tablet, desktop)
- [ ] Check browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] Test loading performance (Lighthouse score)
- [ ] Verify all links work
- [ ] Check console for errors
- [ ] Test data loading (4000+ compounds)
- [ ] Verify figures display correctly
- [ ] Test interactive features (sliders, filters, charts)
- [ ] Check SEO meta tags
- [ ] Set up analytics (Google Analytics, Plausible)
- [ ] Configure custom domain (if applicable)
- [ ] Enable HTTPS
- [ ] Set up monitoring (Sentry, LogRocket)

---

## 📊 Performance Optimization

### Bundle Size Reduction

```bash
# Analyze bundle
pnpm run build -- --mode analyze

# Use dynamic imports for large components
const HeavyComponent = lazy(() => import('./HeavyComponent'))
```

### Caching Strategy

Configure `vite.config.js`:

```javascript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts'],
          ui: ['@radix-ui/react-tabs', '@radix-ui/react-slider'],
        }
      }
    }
  }
})
```

---

## 🐛 Troubleshooting

### Blank page after deployment

- Check browser console for errors
- Verify `base` URL in `vite.config.js`
- Ensure all assets are loading correctly

### 404 on page refresh

- Configure server to redirect all routes to `index.html`
- For Netlify: add `_redirects` file
- For Vercel: add `vercel.json`

### Large bundle size

- Enable code splitting
- Use lazy loading for routes
- Optimize images (WebP, compression)
- Remove unused dependencies

---

## 📞 Support

For deployment issues, please:
1. Check this guide first
2. Search existing GitHub issues
3. Open a new issue with deployment details

---

**Happy Deploying! 🚀**
