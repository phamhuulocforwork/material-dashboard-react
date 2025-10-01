# Suggested Commands

## Development Commands
```bash
# Start development server
npm start

# Build for production  
npm run build

# Run tests
npm test

# Eject from CRA (not recommended)
npm run eject

# Clean install (remove node_modules and reinstall)
npm run install:clean
```

## System Commands (Windows/WSL)
```bash
# Navigate directories
cd /path/to/directory
ls -la  # list files
pwd     # current directory

# File operations
cp source dest      # copy files
mv source dest      # move/rename
rm filename        # delete file
mkdir dirname      # create directory

# Git operations
git status
git add .
git commit -m "message"
git push origin branch-name
git pull origin main

# Search/find
find . -name "*.js"           # find JS files
grep -r "search-term" ./src   # search in files
```

## Code Quality
```bash
# Run linting (via package.json scripts)
npm run lint        # if available
npx eslint src/     # direct ESLint

# Format code  
npx prettier --write src/
```

## Package Management
```bash
# Install dependencies
npm install package-name
npm install --save-dev package-name

# Update packages
npm update

# Check outdated packages  
npm outdated
```

## Debugging
```bash
# Check Node/NPM versions
node --version
npm --version

# Clear npm cache
npm cache clean --force

# Check running processes
ps aux | grep node
```