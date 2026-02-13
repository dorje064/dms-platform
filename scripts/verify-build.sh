#!/bin/bash

# Quick verification script to check if public assets are in build output
# Usage: ./verify-build.sh your-nextjs-app

APP_NAME="${1:-web}"
BUILD_DIR="dist/apps/${APP_NAME}"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Verifying build output for: ${APP_NAME}${NC}"
echo ""

# Check if build directory exists
if [ ! -d "${BUILD_DIR}" ]; then
    echo -e "${RED}✗ Build directory not found: ${BUILD_DIR}${NC}"
    echo -e "${YELLOW}Run: nx build ${APP_NAME} --configuration=production${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Build directory exists${NC}"

# Check for .next folder
if [ -d "${BUILD_DIR}/.next" ]; then
    echo -e "${GREEN}✓ .next folder found${NC}"
else
    echo -e "${RED}✗ .next folder not found${NC}"
fi

# Check for public folder in build output
if [ -d "${BUILD_DIR}/public" ]; then
    echo -e "${GREEN}✓ public folder found in build output${NC}"
    
    # Count files in public
    PUBLIC_FILES=$(find ${BUILD_DIR}/public -type f | wc -l)
    echo -e "  Files in public: ${GREEN}${PUBLIC_FILES}${NC}"
    
    # Check for images
    if [ -d "${BUILD_DIR}/public/images" ]; then
        IMAGE_FILES=$(find ${BUILD_DIR}/public/images -type f | wc -l)
        echo -e "${GREEN}✓ images folder found (${IMAGE_FILES} files)${NC}"
        
        # List some images
        echo -e "\n${BLUE}Sample images:${NC}"
        find ${BUILD_DIR}/public/images -type f | head -5 | sed 's/^/  /'
    else
        echo -e "${YELLOW}⚠ No images folder in build output${NC}"
    fi
else
    echo -e "${RED}✗ public folder NOT found in build output${NC}"
    echo -e "${YELLOW}This is the problem! Your images won't work in production.${NC}"
    echo ""
    echo -e "${YELLOW}To fix:${NC}"
    echo "1. Add assets configuration to apps/${APP_NAME}/project.json"
    echo "2. Or use the updated deploy-to-cpanel-fixed.sh script"
    echo "3. See fix-public-assets.md for detailed solutions"
fi

# Check source public folder
echo ""
echo -e "${BLUE}Checking source folder:${NC}"
if [ -d "apps/${APP_NAME}/public" ]; then
    SOURCE_FILES=$(find apps/${APP_NAME}/public -type f | wc -l)
    echo -e "${GREEN}✓ Source public folder exists (${SOURCE_FILES} files)${NC}"
    
    if [ -d "apps/${APP_NAME}/public/images" ]; then
        SOURCE_IMAGES=$(find apps/${APP_NAME}/public/images -type f | wc -l)
        echo -e "${GREEN}✓ Source images folder exists (${SOURCE_IMAGES} files)${NC}"
    fi
else
    echo -e "${YELLOW}⚠ No public folder in source${NC}"
fi

# Check standalone build
echo ""
if [ -d "${BUILD_DIR}/.next/standalone" ]; then
    echo -e "${GREEN}✓ Using standalone build${NC}"
    
    # Check if standalone has public
    if [ -d "${BUILD_DIR}/.next/standalone/public" ]; then
        echo -e "${GREEN}✓ Standalone includes public folder${NC}"
    else
        echo -e "${YELLOW}⚠ Standalone doesn't include public folder${NC}"
    fi
fi

# Summary
echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Summary:${NC}"
echo -e "${BLUE}========================================${NC}"

if [ -d "${BUILD_DIR}/public/images" ]; then
    echo -e "${GREEN}✓ BUILD IS GOOD - Images will work in production${NC}"
    echo ""
    echo -e "${GREEN}You can proceed with deployment.${NC}"
else
    echo -e "${RED}✗ BUILD HAS ISSUES - Images will NOT work${NC}"
    echo ""
    echo -e "${YELLOW}Fix options:${NC}"
    echo "1. Update apps/${APP_NAME}/project.json (see project.json.example)"
    echo "2. Use deploy-to-cpanel-fixed.sh which copies from source"
    echo "3. See fix-public-assets.md for all solutions"
    echo ""
    echo -e "${YELLOW}Quick fix:${NC}"
    echo "Add this to apps/${APP_NAME}/project.json in build options:"
    echo '  "assets": ['
    echo '    {'
    echo '      "glob": "**/*",'
    echo "      \"input\": \"apps/${APP_NAME}/public\","
    echo '      "output": "public"'
    echo '    }'
    echo '  ]'
fi

echo ""