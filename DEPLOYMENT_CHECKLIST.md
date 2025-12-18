# Production Deployment Checklist

## Pre-Deployment

### Code Preparation
- [ ] All features tested locally
- [ ] No console.log statements in production code
- [ ] Environment variables documented
- [ ] .gitignore includes .env files
- [ ] Dependencies up to date
- [ ] Build runs successfully (`npm run build`)

### Security
- [ ] Strong JWT secret key
- [ ] MongoDB connection string secured
- [ ] CORS configured correctly
- [ ] API rate limiting considered
- [ ] Input validation in place

### Performance
- [ ] Images optimized
- [ ] Code splitting implemented
- [ ] API responses cached where appropriate
- [ ] Database indexes created

## Deployment Steps

### 1. MongoDB Atlas
- [ ] Cluster created (Free M0 tier)
- [ ] Database user created
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string copied
- [ ] Database name added to connection string

### 2. Backend (Render)
- [ ] GitHub repository connected
- [ ] Root directory set to `backend`
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] Environment variables added:
  - [ ] PORT=5000
  - [ ] MONGODB_URI
  - [ ] JWT_SECRET
  - [ ] NODE_ENV=production
- [ ] Deployment successful
- [ ] Backend URL copied

### 3. Frontend (Vercel)
- [ ] API_URL updated in `api.js`
- [ ] GitHub repository connected
- [ ] Root directory set to `my-react-app`
- [ ] Framework preset: Vite
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Deployment successful
- [ ] Frontend URL copied

### 4. Post-Deployment
- [ ] Backend CORS updated with Vercel URL
- [ ] Changes committed and pushed
- [ ] Backend auto-redeployed

## Testing

### Functionality Tests
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Products display properly
- [ ] User registration works
- [ ] Login/Logout works
- [ ] Add to cart functionality
- [ ] Wishlist functionality
- [ ] Checkout process
- [ ] Order placement
- [ ] Profile page loads
- [ ] Order history displays
- [ ] Contact form submission
- [ ] Password change works
- [ ] Account deletion works

### Cross-Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

### Performance Tests
- [ ] Page load time < 3 seconds
- [ ] API response time < 500ms
- [ ] Images load properly
- [ ] No console errors

## Post-Launch

### Monitoring
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Monitor backend logs on Render
- [ ] Monitor database connections
- [ ] Track user analytics

### Maintenance
- [ ] Regular backups configured
- [ ] Update dependencies monthly
- [ ] Monitor security advisories
- [ ] Review and optimize performance

### Optional Enhancements
- [ ] Custom domain setup
- [ ] SSL certificate (automatic on Vercel/Render)
- [ ] CDN for static assets
- [ ] Email service integration
- [ ] Payment gateway integration

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com

## Rollback Plan

If deployment fails:
1. Check Render/Vercel logs for errors
2. Verify environment variables
3. Test backend API endpoints directly
4. Revert to previous working commit
5. Redeploy from last known good state

---

**Deployment Date**: _________________

**Deployed By**: _________________

**Frontend URL**: _________________

**Backend URL**: _________________

**Database**: _________________
