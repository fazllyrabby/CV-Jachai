# AI Career Advisor - Complete Setup Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation Steps](#installation-steps)
3. [Configuration](#configuration)
4. [Running the Application](#running-the-application)
5. [Testing](#testing)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
  - Download from: https://nodejs.org/
  - Verify: `node --version`

- **npm** (comes with Node.js)
  - Verify: `npm --version`

- **MongoDB** (v4.0 or higher)
  - **Option A**: Local installation
    - macOS: `brew install mongodb-community`
    - Ubuntu: `sudo apt-get install mongodb`
    - Windows: Download from https://www.mongodb.com/try/download/community
  - **Option B**: MongoDB Atlas (cloud)
    - Sign up at: https://www.mongodb.com/cloud/atlas

- **Git** (optional, for cloning)
  - Download from: https://git-scm.com/

## Installation Steps

### Step 1: Get the Project

\`\`\`bash
# If using Git
git clone <repository-url>
cd ai-career-advisor

# Or download and extract the ZIP file
\`\`\`

### Step 2: Install Server Dependencies

\`\`\`bash
# From the root directory
npm install
\`\`\`

This installs:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- express-validator
- nodemon (dev)
- concurrently (dev)

### Step 3: Install Client Dependencies

\`\`\`bash
cd client
npm install
cd ..
\`\`\`

This installs:
- react
- react-dom
- react-router-dom
- axios
- lucide-react
- tailwindcss (dev)

### Step 4: Setup MongoDB

#### Option A: Local MongoDB

1. **Start MongoDB service**
   \`\`\`bash
   # macOS/Linux
   mongod
   
   # Windows (as service)
   net start MongoDB
   \`\`\`

2. **Verify MongoDB is running**
   \`\`\`bash
   # Connect to MongoDB shell
   mongosh
   # or
   mongo
   
   # You should see MongoDB shell prompt
   \`\`\`

#### Option B: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new cluster (free tier available)
4. Click "Connect" on your cluster
5. Choose "Connect your application"
6. Copy the connection string
7. Replace `<password>` with your database user password
8. Replace `<dbname>` with `ai-career-advisor`

Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ai-career-advisor?retryWrites=true&w=majority`

### Step 5: Configure Environment Variables

Create a `.env` file in the **root directory**:

\`\`\`bash
# Create .env file
touch .env
\`\`\`

Add the following content:

\`\`\`env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/ai-career-advisor
# For Atlas, use: mongodb+srv://username:password@cluster.xxxxx.mongodb.net/ai-career-advisor

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret (change this to a random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
\`\`\`

**Important**: Change `JWT_SECRET` to a random, secure string in production!

### Step 6: Seed the Database

\`\`\`bash
npm run seed
\`\`\`

You should see:
\`\`\`
[v0] MongoDB Connected
✓ Careers seeded successfully!
\`\`\`

This creates sample career data in your database.

## Configuration

### Client Configuration

The client is configured to proxy API requests to the backend.

**client/package.json** already includes:
\`\`\`json
"proxy": "http://localhost:5000"
\`\`\`

### Tailwind CSS Configuration

**client/tailwind.config.js** is already configured with:
- Purple color scheme
- Custom gradient backgrounds
- Responsive breakpoints

## Running the Application

### Development Mode (Recommended)

Run both frontend and backend simultaneously:

\`\`\`bash
npm run dev
\`\`\`

This starts:
- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:3000

### Run Separately

**Backend only:**
\`\`\`bash
npm run server
\`\`\`

**Frontend only:**
\`\`\`bash
npm run client
\`\`\`

### Production Mode

\`\`\`bash
# Build the client
npm run build

# Start production server
npm start
\`\`\`

## Testing

### 1. Test Backend API

Open your browser or use curl:

\`\`\`bash
# Test server is running
curl http://localhost:5000/api/careers

# Should return JSON with career data
\`\`\`

### 2. Test Frontend

1. Open http://localhost:3000
2. You should see the landing page with:
   - "Your AI-Powered Career Journey Starts Here"
   - Login and Sign Up buttons
   - Three feature cards

### 3. Test Authentication

**Create a new account:**
1. Click "Sign Up Free"
2. Fill in the form
3. Submit

**Or use demo account:**
- Email: `user@test.com`
- Password: `test123`

### 4. Test Features

After logging in, test:
- **Profile**: Update your skills and interests
- **Analysis**: View your strengths and growth areas
- **Careers**: Browse career recommendations
- **Dashboard**: Check your XP, badges, and progress
- **Chatbot**: Click the chat icon (bottom right)

## Troubleshooting

### Issue: "Cannot connect to MongoDB"

**Solution:**
\`\`\`bash
# Check if MongoDB is running
ps aux | grep mongod

# Start MongoDB
mongod

# Or for Windows service
net start MongoDB
\`\`\`

### Issue: "Port 3000 already in use"

**Solution:**
\`\`\`bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9

# Or change the port
# Edit client/package.json and add:
"start": "PORT=3001 react-scripts start"
\`\`\`

### Issue: "Port 5000 already in use"

**Solution:**
\`\`\`bash
# Kill the process
lsof -ti:5000 | xargs kill -9

# Or change in .env
PORT=5001
\`\`\`

### Issue: "Module not found"

**Solution:**
\`\`\`bash
# Clear node_modules and reinstall
rm -rf node_modules client/node_modules
rm package-lock.json client/package-lock.json

npm install
cd client && npm install && cd ..
\`\`\`

### Issue: "JWT malformed" or authentication errors

**Solution:**
- Clear browser localStorage
- Log out and log in again
- Check JWT_SECRET is set in .env

### Issue: Tailwind styles not working

**Solution:**
\`\`\`bash
cd client
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
cd ..
\`\`\`

### Issue: "Cannot GET /api/..."

**Solution:**
- Ensure backend is running on port 5000
- Check proxy setting in client/package.json
- Verify API routes in server/server.js

## Verify Installation Checklist

- [ ] Node.js installed (`node --version`)
- [ ] MongoDB running (`mongosh` connects)
- [ ] Dependencies installed (no errors)
- [ ] .env file created with correct values
- [ ] Database seeded successfully
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can access landing page
- [ ] Can register/login
- [ ] Can view all pages

## Next Steps

1. **Customize the application**
   - Update colors in tailwind.config.js
   - Modify career data in server/scripts/seedCareers.js
   - Add more features

2. **Deploy to production**
   - Frontend: Vercel, Netlify, or GitHub Pages
   - Backend: Heroku, Railway, or DigitalOcean
   - Database: MongoDB Atlas

3. **Add real AI integration**
   - OpenAI API for chatbot
   - Google AI for analysis
   - Custom ML models

## Useful Commands

\`\`\`bash
# View MongoDB data
mongosh
use ai-career-advisor
db.users.find()
db.careers.find()
db.achievements.find()

# Clear database
db.users.deleteMany({})
db.careers.deleteMany({})

# Re-seed database
npm run seed

# Check running processes
lsof -i :3000
lsof -i :5000

# View logs
npm run server  # Shows backend logs
npm run client  # Shows frontend logs
\`\`\`

## Getting Help

If you encounter issues:
1. Check this troubleshooting guide
2. Review error messages carefully
3. Check browser console (F12)
4. Check terminal logs
5. Open an issue on GitHub

Happy coding! 🚀
