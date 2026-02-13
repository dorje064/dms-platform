#!/bin/bash

# Configuration
APP_NAME="web"  # CHANGE THIS to your app name from apps/ directory
BUILD_DIR="dist/apps/${APP_NAME}"
DEPLOY_DIR="deploy-package"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Enable error handling
set -e  # Exit on error

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Nx Next.js cPanel Deployment Script${NC}"
echo -e "${GREEN}(Debugged Version)${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Check if app exists
if [ ! -d "apps/${APP_NAME}" ]; then
    echo -e "${RED}Error: Application 'apps/${APP_NAME}' not found!${NC}"
    echo "Please update the APP_NAME variable in this script."
    exit 1
fi

echo -e "${BLUE}App Name: ${APP_NAME}${NC}"
echo -e "${BLUE}Build Dir: ${BUILD_DIR}${NC}"
echo ""

# Step 1: Clean previous build
echo -e "${YELLOW}[1/8] Cleaning previous build...${NC}"
rm -rf "${BUILD_DIR}"
rm -rf "${DEPLOY_DIR}"
rm -f "${APP_NAME}"-deploy*.tar.gz
rm -rf "cp," "-r" 2>/dev/null || true  # Clean up broken folders
echo -e "${GREEN}✓ Cleaned${NC}"

# Step 2: Build application
echo -e "${YELLOW}[2/8] Building application...${NC}"
if npx nx build "${APP_NAME}" --configuration=production; then
    echo -e "${GREEN}✓ Build completed${NC}"
else
    echo -e "${RED}✗ Build failed!${NC}"
    exit 1
fi

# Check if build was successful
if [ ! -d "${BUILD_DIR}" ]; then
    echo -e "${RED}✗ Build directory not found: ${BUILD_DIR}${NC}"
    exit 1
fi

# Debug: Show build structure
echo -e "${BLUE}Build directory contents:${NC}"
ls -la "${BUILD_DIR}" || true

# Step 3: Create deployment directory
echo -e "${YELLOW}[3/8] Creating deployment directory...${NC}"
mkdir -p "${DEPLOY_DIR}"

# Step 4: Determine build type and copy files
echo -e "${YELLOW}[4/8] Analyzing build output...${NC}"

HAS_STANDALONE=false
HAS_NEXT=false

# Check for standalone build
if [ -d "${BUILD_DIR}/.next/standalone" ]; then
    echo -e "${GREEN}✓ Detected standalone build${NC}"
    HAS_STANDALONE=true
    
    # Copy standalone files
    echo -e "${BLUE}Copying standalone files...${NC}"
    rsync -av --progress "${BUILD_DIR}/.next/standalone/." "${DEPLOY_DIR}/"
    
    # Copy .next/static if it exists
    if [ -d "${BUILD_DIR}/.next/static" ]; then
        echo -e "${BLUE}Copying .next/static...${NC}"
        mkdir -p "${DEPLOY_DIR}/.next/static"
        rsync -av --progress "${BUILD_DIR}/.next/static/." "${DEPLOY_DIR}/.next/static/"
    fi
    
elif [ -d "${BUILD_DIR}/.next" ]; then
    echo -e "${YELLOW}⚠ Standard build detected (no standalone)${NC}"
    HAS_NEXT=true
    
    # Copy .next directory
    echo -e "${BLUE}Copying .next directory...${NC}"
    mkdir -p "${DEPLOY_DIR}/.next"
    rsync -av --progress "${BUILD_DIR}/.next/." "${DEPLOY_DIR}/.next/"
    
else
    echo -e "${RED}✗ No .next directory found in build output!${NC}"
    echo -e "${YELLOW}This might be a build configuration issue.${NC}"
    exit 1
fi

# Step 5: Copy public folder from SOURCE (most reliable)
echo -e "${YELLOW}[5/8] Copying public assets...${NC}"

SOURCE_PUBLIC="apps/${APP_NAME}/public"

if [ -d "${SOURCE_PUBLIC}" ] && [ "$(ls -A "${SOURCE_PUBLIC}" 2>/dev/null)" ]; then
    echo -e "${BLUE}Copying from source: ${SOURCE_PUBLIC}${NC}"
    mkdir -p "${DEPLOY_DIR}/public"
    rsync -av --progress "${SOURCE_PUBLIC}/." "${DEPLOY_DIR}/public/"
    
    # Count files
    PUBLIC_COUNT=$(find "${DEPLOY_DIR}/public" -type f 2>/dev/null | wc -l)
    echo -e "${GREEN}✓ Copied ${PUBLIC_COUNT} public files${NC}"
    
    # Check for images
    if [ -d "${DEPLOY_DIR}/public/images" ]; then
        IMG_COUNT=$(find "${DEPLOY_DIR}/public/images" -type f 2>/dev/null | wc -l)
        echo -e "${GREEN}✓ Found ${IMG_COUNT} images${NC}"
    fi
else
    echo -e "${YELLOW}⚠ No public folder found in source${NC}"
fi

# Also check build output for public folder (secondary)
if [ -d "${BUILD_DIR}/public" ] && [ "$(ls -A "${BUILD_DIR}/public" 2>/dev/null)" ]; then
    echo -e "${BLUE}Also found public in build output, merging...${NC}"
    mkdir -p "${DEPLOY_DIR}/public"
    rsync -av --progress "${BUILD_DIR}/public/." "${DEPLOY_DIR}/public/" 2>/dev/null || true
fi

# Step 6: Create package.json
echo -e "${YELLOW}[6/8] Creating package.json...${NC}"

# Try to extract versions from root package.json
if [ -f "package.json" ]; then
    NEXT_VERSION=$(node -p "try { const pkg = require('./package.json'); pkg.dependencies?.next || pkg.devDependencies?.next || '^14.0.0' } catch(e) { '^14.0.0' }" 2>/dev/null || echo "^14.0.0")
    REACT_VERSION=$(node -p "try { const pkg = require('./package.json'); pkg.dependencies?.react || '^18.2.0' } catch(e) { '^18.2.0' }" 2>/dev/null || echo "^18.2.0")
    REACT_DOM_VERSION=$(node -p "try { const pkg = require('./package.json'); pkg.dependencies?.['react-dom'] || '^18.2.0' } catch(e) { '^18.2.0' }" 2>/dev/null || echo "^18.2.0")
else
    NEXT_VERSION="^14.0.0"
    REACT_VERSION="^18.2.0"
    REACT_DOM_VERSION="^18.2.0"
fi

cat > "${DEPLOY_DIR}/package.json" <<EOF
{
  "name": "${APP_NAME}",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "next": "${NEXT_VERSION}",
    "react": "${REACT_VERSION}",
    "react-dom": "${REACT_DOM_VERSION}"
  }
}
EOF

echo -e "${GREEN}✓ package.json created${NC}"

# Step 7: Create server.js
echo -e "${YELLOW}[7/8] Creating server.js...${NC}"

# Check if server.js already exists from standalone build
if [ -f "${DEPLOY_DIR}/server.js" ]; then
    echo -e "${GREEN}✓ server.js exists from standalone build${NC}"
else
    echo -e "${BLUE}Creating custom server.js...${NC}"
    cat > "${DEPLOY_DIR}/server.js" <<'SERVERJS'
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const port = parseInt(process.env.PORT || '3000', 10)
const dev = false
const hostname = 'localhost'

console.log('Starting Next.js server...')
console.log('Port:', port)
console.log('Environment:', process.env.NODE_ENV || 'production')

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('Internal server error')
    }
  })
    .once('error', (err) => {
      console.error('Server error:', err)
      process.exit(1)
    })
    .listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
  process.exit(1)
})
SERVERJS
    echo -e "${GREEN}✓ server.js created${NC}"
fi

# Create .env template
cat > "${DEPLOY_DIR}/.env.production.example" <<'ENVFILE'
NODE_ENV=production
PORT=3000

# Add your environment variables below
# DATABASE_URL=
# API_KEY=
# NEXT_PUBLIC_API_URL=
ENVFILE

# Create README
cat > "${DEPLOY_DIR}/README-DEPLOYMENT.md" <<README
# Deployment Package for ${APP_NAME}

## Package Contents
- server.js - Server startup file
- package.json - Production dependencies
- .next/ - Built Next.js application
- public/ - Static assets
- .env.production.example - Environment variables template

## Build Information
- Build type: ${HAS_STANDALONE:+Standalone}${HAS_NEXT:+Standard}

## Quick Deploy
1. Upload to cPanel
2. Extract to /home/username/applications/${APP_NAME}/
3. Run: npm install --production
4. Configure in cPanel Node.js App
5. Start application

See full deployment guide for details.
README

echo -e "${GREEN}✓ Documentation created${NC}"

# Step 8: Verify and create archive
echo -e "${YELLOW}[8/8] Creating deployment archive...${NC}"

# Verify critical files exist
echo -e "${BLUE}Verifying package contents...${NC}"
ERRORS=0

if [ ! -f "${DEPLOY_DIR}/server.js" ]; then
    echo -e "${RED}✗ Missing: server.js${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✓ server.js${NC}"
fi

if [ ! -f "${DEPLOY_DIR}/package.json" ]; then
    echo -e "${RED}✗ Missing: package.json${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✓ package.json${NC}"
fi

if [ ! -d "${DEPLOY_DIR}/.next" ]; then
    echo -e "${RED}✗ Missing: .next directory${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✓ .next directory${NC}"
fi

if [ -d "${DEPLOY_DIR}/public" ]; then
    echo -e "${GREEN}✓ public directory${NC}"
else
    echo -e "${YELLOW}⚠ No public directory (OK if you have no static assets)${NC}"
fi

if [ $ERRORS -gt 0 ]; then
    echo -e "${RED}✗ Package has errors! Fix before deploying.${NC}"
    exit 1
fi

# Create archive
tar -czf "${APP_NAME}-deploy.tar.gz" -C "${DEPLOY_DIR}" .

# Display summary
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✓ Deployment package created!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "Package: ${GREEN}${APP_NAME}-deploy.tar.gz${NC}"
echo -e "Size: ${GREEN}$(du -h "${APP_NAME}-deploy.tar.gz" | cut -f1)${NC}"
echo ""
rm -rf ./-r "cp" ".nx" 2>/dev/null || true  # Clean up any broken folders

# Show directory tree
echo -e "${BLUE}Package structure:${NC}"
echo "deploy-package/"
echo "├── server.js"
echo "├── package.json"
echo "├── .next/"
if [ -d "${DEPLOY_DIR}/.next/standalone" ] || [ -f "${DEPLOY_DIR}/.next/BUILD_ID" ]; then
    echo "│   ├── BUILD_ID"
fi
if [ -d "${DEPLOY_DIR}/.next/server" ]; then
    echo "│   ├── server/"
fi
if [ -d "${DEPLOY_DIR}/.next/static" ]; then
    echo "│   └── static/"
fi
if [ -d "${DEPLOY_DIR}/public" ]; then
    echo "└── public/"
    if [ -d "${DEPLOY_DIR}/public/images" ]; then
        echo "    └── images/ ($(find "${DEPLOY_DIR}/public/images" -type f | wc -l) files)"
    fi
fi

echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Upload ${APP_NAME}-deploy.tar.gz to cPanel"
echo "2. Extract to /home/username/applications/${APP_NAME}/"
echo "3. Run: npm install --production"
echo "4. Configure in cPanel Node.js App interface"
echo "5. Start application"
echo ""
echo -e "${GREEN}Ready to deploy!${NC}"