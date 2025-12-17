# AI Career & Skills Advisor

A full-stack MERN application that provides AI-powered career guidance, skill gap analysis, and gamified learning experiences.

## Features

- User authentication and profile management
- Skills assessment and analysis
- Career matching based on user skills
- Gamified dashboard with XP, badges, and achievements
- AI chatbot for career guidance
- Personality and work style analysis

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)

## Project Structure

\`\`\`
ai-career-advisor/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React Context (Auth)
│   │   ├── pages/         # Page components
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   ├── package.json
│   └── tailwind.config.js
├── server/                # Express backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Auth middleware
│   ├── scripts/          # Database seed scripts
│   └── server.js         # Server entry point
├── .env                  # Environment variables
└── package.json          # Root package.json
\`\`\`

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Quick Start

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd ai-career-advisor
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   # Install server dependencies
   npm install
   
   # Install client dependencies
   cd client
   npm install
   cd ..
   \`\`\`

3. **Setup MongoDB**
   
   **Option A: Local MongoDB**
   \`\`\`bash
   # Start MongoDB service
   mongod
   \`\`\`
   
   **Option B: MongoDB Atlas**
   - Create account at https://www.mongodb.com/cloud/atlas
   - Create a cluster
   - Get connection string
   - Use it in `.env` file

4. **Configure environment variables**
   
   Create `.env` file in root directory:
   \`\`\`env
   MONGODB_URI=mongodb://localhost:27017/ai-career-advisor
   JWT_SECRET=your_super_secret_jwt_key_change_this
   PORT=5000
   NODE_ENV=development
   \`\`\`

5. **Seed the database**
   \`\`\`bash
   npm run seed
   \`\`\`

6. **Run the application**
   \`\`\`bash
   # Run both frontend and backend
   npm run dev
   \`\`\`
   
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## Available Scripts

\`\`\`bash
# Development
npm run dev          # Run both client and server
npm run server       # Run server only (with nodemon)
npm run client       # Run client only

# Database
npm run seed         # Seed careers data

# Production
npm run build        # Build client for production
npm start           # Run production server
\`\`\`

## Demo Accounts

- **Admin**: admin@demo.com / demo123
- **User**: user@test.com / test123

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Profile
- `GET /api/profile` - Get user profile (protected)
- `PUT /api/profile` - Update user profile (protected)

### Analysis
- `GET /api/analysis` - Get skills analysis (protected)

### Careers
- `GET /api/careers` - Get all careers
- `GET /api/careers/recommendations` - Get personalized career recommendations (protected)

### Dashboard
- `GET /api/dashboard` - Get dashboard data with stats (protected)

### Chat
- `POST /api/chat` - Chat with AI career advisor (protected)

## Features Overview

### 1. Landing Page
- Hero section with call-to-action
- Feature highlights (Smart Analysis, Career Matching, Gamified Learning)
- Login and registration options

### 2. Profile Creation
- Personal information
- Education and experience level
- Current skills management
- Career interests

### 3. Analysis Page
- Strengths identification
- Growth areas with progress tracking
- Personality traits analysis
- Career preferences checklist

### 4. Careers Page
- Career recommendations based on skills
- Skill gap analysis for each career
- Required skills breakdown
- Salary ranges and job growth statistics
- Learning path access

### 5. Dashboard
- Gamification stats (XP, badges, streaks)
- Achievement badges
- Recent milestones timeline
- Skill progress tracking
- Recommended next steps
- AI career coach chatbot

## Technologies Used

### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Backend
- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **express-validator** - Request validation
- **cors** - Cross-origin resource sharing

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/ai-career-advisor` |
| `JWT_SECRET` | Secret key for JWT | `your_secret_key` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` or `production` |

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- For Atlas, whitelist your IP address

### Port Already in Use
\`\`\`bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
\`\`\`

### Module Not Found
\`\`\`bash
# Clear and reinstall dependencies
rm -rf node_modules client/node_modules
npm install
cd client && npm install
\`\`\`

## Future Enhancements

- Real AI integration (OpenAI, Google AI)
- Resume upload and parsing
- Job board integration
- Learning resource recommendations
- Progress tracking over time
- Social features (mentorship, networking)
- Mobile app version

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
