# 🚀 Setup New GitHub Repository - Step by Step

## Step 1: Clear Old GitHub Credentials (Windows)

### Option A: Using Windows Credential Manager (Easiest)

1. Press `Windows Key + R`
2. Type: `control /name Microsoft.CredentialManager`
3. Press Enter
4. Click **"Windows Credentials"**
5. Scroll down to find entries with **"git:https://github.com"**
6. Click on each one and click **"Remove"**
7. Done! ✅

### Option B: Using Command Line

```powershell
# Run this in PowerShell or Command Prompt
cmdkey /list | findstr git

# Then delete each git credential (replace TARGET with the actual target name)
cmdkey /delete:LegacyGeneric:target=git:https://github.com
```

---

## Step 2: Create New Public Repository on GitHub

1. Go to **https://github.com**
2. **Login** with YOUR GitHub account (the one you want to use)
3. Click the **"+"** icon (top right) → **"New repository"**
4. Fill in:
   - **Repository name:** `orderking` (or any name you want)
   - **Description:** "Complete E-Commerce Platform with Mobile App, Admin Dashboard, and Backend API"
   - **Visibility:** ✅ **Public**
   - **DO NOT** initialize with README (we already have one)
5. Click **"Create repository"**
6. **Copy the repository URL** (should look like: `https://github.com/YOUR-USERNAME/orderking.git`)

---

## Step 3: Configure Git with Your Account

Open **PowerShell** or **Command Prompt** and run:

```bash
# Navigate to your project
cd d:\projects\orderking

# Set YOUR GitHub username and email
git config user.name "YourGitHubUsername"
git config user.email "your-email@example.com"

# Verify it's set correctly
git config user.name
git config user.email
```

**Replace:**
- `YourGitHubUsername` with your actual GitHub username
- `your-email@example.com` with your GitHub email

---

## Step 4: Initialize Git and Add Files

```bash
# Make sure you're in the project directory
cd d:\projects\orderking

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: OrderKing E-Commerce Platform"
```

---

## Step 5: Connect to Your New GitHub Repository

```bash
# Add your repository (replace YOUR-USERNAME and REPO-NAME)
git remote add origin https://github.com/YOUR-USERNAME/orderking.git

# If you get "remote origin already exists" error, use this instead:
git remote set-url origin https://github.com/YOUR-USERNAME/orderking.git

# Verify the remote is correct
git remote -v
```

**Example:**
If your GitHub username is `john123` and repo is `orderking`:
```bash
git remote add origin https://github.com/john123/orderking.git
```

---

## Step 6: Create Personal Access Token (Required!)

GitHub doesn't accept passwords anymore. You need a token:

1. Go to **https://github.com/settings/tokens**
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: `OrderKing Project`
4. Set expiration: `90 days` (or No expiration)
5. Select scopes:
   - ✅ **repo** (all checkboxes under repo)
6. Click **"Generate token"** at the bottom
7. **COPY THE TOKEN** (starts with `ghp_...`) - You won't see it again!
8. Save it somewhere safe (Notepad)

---

## Step 7: Push to GitHub

```bash
# Push to GitHub (main branch)
git push -u origin main

# If you get error about "master" branch, try:
git branch -M main
git push -u origin main
```

**When prompted:**
- **Username:** Your GitHub username
- **Password:** Paste your Personal Access Token (the `ghp_...` token)

---

## Step 8: Verify on GitHub

1. Go to your repository: `https://github.com/YOUR-USERNAME/orderking`
2. Refresh the page
3. You should see all your files! ✅

---

## 🎯 Complete Command Sequence (Copy & Paste)

```bash
# 1. Navigate to project
cd d:\projects\orderking

# 2. Set your Git identity (CHANGE THESE!)
git config user.name "YourGitHubUsername"
git config user.email "your-email@example.com"

# 3. Initialize and commit
git init
git add .
git commit -m "Initial commit: OrderKing E-Commerce Platform"

# 4. Add remote (CHANGE YOUR-USERNAME!)
git remote add origin https://github.com/YOUR-USERNAME/orderking.git

# 5. Push to GitHub
git branch -M main
git push -u origin main
```

---

## 🚨 Common Errors & Solutions

### Error: "remote origin already exists"
```bash
# Solution: Update the remote URL instead
git remote set-url origin https://github.com/YOUR-USERNAME/orderking.git
```

### Error: "Permission denied" or "Authentication failed"
- Make sure you're using your **Personal Access Token** as password, not your GitHub password
- Clear credentials again (Step 1)
- Generate a new token (Step 6)

### Error: "src refspec main does not exist"
```bash
# Solution: Your default branch might be master
git branch -M main
git push -u origin main
```

### Error: "Updates were rejected"
```bash
# Solution: Force push (only if this is a new repo)
git push -u origin main --force
```

---

## ✅ Final Checklist

- [ ] Old GitHub credentials cleared
- [ ] Logged into YOUR GitHub account
- [ ] Created new PUBLIC repository on GitHub
- [ ] Git config set with YOUR username/email
- [ ] Personal Access Token created and saved
- [ ] All files committed
- [ ] Remote added with YOUR repository URL
- [ ] Successfully pushed to GitHub
- [ ] Verified files on GitHub.com

---

## 📝 Important Notes

1. **Keep your Personal Access Token safe** - treat it like a password
2. **Don't commit .env files** - they contain secrets
3. **Repository is PUBLIC** - anyone can see your code
4. **Add the video link** to README.md after recording

---

## 🎉 You're Done!

Your OrderKing project is now on GitHub with YOUR account! 🚀

**Next steps:**
1. Record your demo video
2. Upload to Google Drive/Loom
3. Add the link to README.md
4. Push the update: `git add README.md && git commit -m "Add video link" && git push`

---

**Need help? Check each step carefully and make sure you replace placeholders with your actual information!**
