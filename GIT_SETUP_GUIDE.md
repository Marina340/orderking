# 🔧 Git Setup Guide - Change GitHub Account

## Problem
You need to push to your repository using a different GitHub account than the one currently configured.

## Solution

### Option 1: Change Git Config for This Repository Only (Recommended)

```bash
# Navigate to your project
cd d:\projects\orderking

# Set your new GitHub username and email for this repo only
git config user.name "Your New GitHub Username"
git config user.email "your-new-email@example.com"

# Verify the changes
git config user.name
git config user.email
```

### Option 2: Change Git Config Globally

```bash
# Set globally (affects all repositories)
git config --global user.name "Your New GitHub Username"
git config --global user.email "your-new-email@example.com"

# Verify
git config --global user.name
git config --global user.email
```

---

## 🔐 Update GitHub Credentials (Windows)

### Method 1: Using Git Credential Manager

```bash
# Remove old credentials
git credential-manager-core erase
# Or
cmdkey /delete:git:https://github.com

# Next time you push, it will ask for new credentials
```

### Method 2: Using Windows Credential Manager

1. Press `Win + R`
2. Type `control /name Microsoft.CredentialManager`
3. Click "Windows Credentials"
4. Find entries starting with `git:https://github.com`
5. Click "Remove" on each one
6. Next git push will prompt for new credentials

---

## 📤 Push to Your Repository

### Step 1: Initialize Git (if not already done)

```bash
cd d:\projects\orderking

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: OrderKing E-Commerce Platform"
```

### Step 2: Add Your GitHub Repository

```bash
# Add your remote repository
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Or if remote already exists, update it
git remote set-url origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Verify remote
git remote -v
```

### Step 3: Push to GitHub

```bash
# Push to main branch
git push -u origin main

# Or if your default branch is master
git push -u origin master
```

**Note:** You'll be prompted to enter your GitHub username and password (or Personal Access Token).

---

## 🔑 Using Personal Access Token (Recommended)

GitHub no longer accepts passwords for Git operations. Use a Personal Access Token instead:

### Create a Personal Access Token:

1. Go to GitHub.com
2. Click your profile picture → **Settings**
3. Scroll down → Click **Developer settings**
4. Click **Personal access tokens** → **Tokens (classic)**
5. Click **Generate new token** → **Generate new token (classic)**
6. Give it a name: "OrderKing Project"
7. Select scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (if using GitHub Actions)
8. Click **Generate token**
9. **Copy the token** (you won't see it again!)

### Use Token When Pushing:

```bash
# When prompted for password, paste your Personal Access Token
Username: your-github-username
Password: ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 🔄 Complete Workflow

```bash
# 1. Navigate to project
cd d:\projects\orderking

# 2. Set your Git identity
git config user.name "YourGitHubUsername"
git config user.email "your-email@example.com"

# 3. Initialize repository (if needed)
git init

# 4. Add all files
git add .

# 5. Commit
git commit -m "feat: Complete OrderKing E-Commerce Platform

- Backend API with Node.js + Express + Supabase
- Admin Dashboard with React + TypeScript + Tailwind
- Mobile App with React Native + Expo
- Full authentication and authorization
- Product and order management
- Cross-platform support (iOS, Android, Web)
- Complete documentation and video guide"

# 6. Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR-USERNAME/orderking.git

# 7. Push to GitHub
git push -u origin main
```

---

## 📝 Create .gitignore (Important!)

Before pushing, make sure you have a `.gitignore` file:

```bash
# Create .gitignore in project root
```

**Content for `.gitignore`:**

```gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
dist/
build/
.expo/
.expo-shared/

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
logs/
*.log

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Testing
coverage/

# Misc
.cache/
*.tsbuildinfo
```

---

## 🚨 If You Get "Repository Already Exists" Error

### Option A: Force Push (Careful!)

```bash
git push -u origin main --force
```

⚠️ **Warning:** This will overwrite the remote repository!

### Option B: Pull First, Then Push

```bash
# Pull existing changes
git pull origin main --allow-unrelated-histories

# Resolve any conflicts if they occur

# Push your changes
git push -u origin main
```

---

## ✅ Verify Your Push

After pushing, check:

1. Go to your GitHub repository
2. Verify all files are there
3. Check the commit author is your new account
4. Verify README.md displays correctly

---

## 🔧 Troubleshooting

### Error: "Permission denied"
- Check you're using the correct GitHub account
- Verify your Personal Access Token has `repo` scope
- Clear old credentials (see above)

### Error: "Repository not found"
- Verify the repository URL is correct
- Check the repository exists on GitHub
- Ensure you have access to the repository

### Error: "Failed to push some refs"
- Try: `git pull origin main --rebase`
- Then: `git push origin main`

### Wrong commit author showing
- Check: `git config user.name` and `git config user.email`
- Update if needed
- Amend last commit: `git commit --amend --reset-author`

---

## 📋 Quick Commands Reference

```bash
# Check current Git config
git config --list

# Check remote URL
git remote -v

# Change remote URL
git remote set-url origin https://github.com/NEW-USERNAME/NEW-REPO.git

# View commit history
git log --oneline

# Check status
git status

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

---

## 🎯 Final Checklist

- [ ] Git config set with correct username/email
- [ ] Old GitHub credentials removed
- [ ] Personal Access Token created
- [ ] .gitignore file created
- [ ] All files committed
- [ ] Remote repository added
- [ ] Successfully pushed to GitHub
- [ ] Verified on GitHub.com

---

**You're all set! Your code is now on GitHub with the correct account!** 🚀
