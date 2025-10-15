# 🚀 School Management System - Deployment Guide

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Netlify account

## 🔧 Environment Variables

Set these in your Netlify dashboard under **Site settings → Environment variables**:

```bash
VITE_API_URL=https://multi-tenancy-school-management-sys.vercel.app/api/v1
VITE_APP_NAME=School Management System
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_TENANT_MANAGEMENT=true
```

## 🏗️ Build Configuration

### Netlify Settings

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 18 or higher

### netlify.toml

```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 🚀 Deployment Steps

### 1. Local Testing

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Test production build
npm run build
npm run preview
```

### 2. Deploy to Netlify

#### Option A: Git Integration (Recommended)

1. Push your code to GitHub/GitLab
2. Connect repository in Netlify dashboard
3. Set environment variables
4. Deploy automatically on push

#### Option B: Manual Deploy

```bash
# Build the project
npm run build

# Deploy using Netlify CLI
npx netlify deploy --prod --dir=dist
```

## 🔍 Troubleshooting

### Blank Page Issues

1. **Check Browser Console**

   - Open Developer Tools (F12)
   - Look for JavaScript errors
   - Check Network tab for failed requests

2. **Check Environment Variables**

   - Ensure all required variables are set in Netlify
   - Variables must start with `VITE_` prefix

3. **Check Build Logs**

   - Go to Netlify dashboard → Deploys
   - Check build logs for errors

4. **Test Locally**
   ```bash
   npm run build
   npm run preview
   ```

### Common Issues & Solutions

#### Issue: "Failed to fetch" errors

**Solution:** Check VITE_API_URL is correctly set and accessible

#### Issue: Routing not working (404 on refresh)

**Solution:** Ensure netlify.toml has correct redirects configuration

#### Issue: Build fails with TypeScript errors

**Solution:** Run `npm run typecheck` locally and fix errors

#### Issue: Environment variables not working

**Solution:**

- Ensure variables start with `VITE_` prefix
- Redeploy after adding variables
- Check variables are set in Netlify dashboard

## 📊 Performance Optimization

The app includes several optimizations:

- **Code Splitting:** Lazy loading of routes and components
- **Bundle Optimization:** Separate chunks for vendor libraries
- **Error Boundaries:** Graceful error handling
- **Loading States:** Smooth user experience during navigation

## 🔒 Security Considerations

- Environment variables are properly prefixed with `VITE_`
- API calls include proper authentication headers
- Error messages don't expose sensitive information
- HTTPS is enforced in production

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🆘 Support

If you encounter issues:

1. Check this troubleshooting guide
2. Review browser console for errors
3. Check Netlify build logs
4. Verify environment variables are set correctly

## 📈 Monitoring

The app includes:

- Global error handling
- Console logging for debugging
- Performance monitoring hooks
- Environment validation

---

**Last Updated:** $(date)
**Version:** 1.0.0
