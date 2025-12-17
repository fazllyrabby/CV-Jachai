"use client"

import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { TrendingUp, Target, Trophy, LogIn, UserPlus } from "lucide-react"

const Home = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  if (user) {
    navigate("/dashboard")
    return null
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Your AI-Powered Career Journey
            <br />
            <span className="text-white">Starts Here</span>
          </h1>

          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Discover your potential, bridge skill gaps, and accelerate your career with personalized AI recommendations
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              to="/login"
              className="px-8 py-4 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition shadow-lg flex items-center space-x-2"
            >
              <LogIn className="w-5 h-5" />
              <span>Login</span>
            </Link>
            <Link
              to="/register"
              className="px-8 py-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition shadow-lg flex items-center space-x-2"
            >
              <UserPlus className="w-5 h-5" />
              <span>Sign Up Free</span>
            </Link>
          </div>

          <p className="text-sm text-white/80">
            <strong>Demo Accounts:</strong> admin@demo.com / demo123 | user@test.com / test123
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Smart Analysis */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white hover:bg-white/20 transition">
            <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Smart Analysis</h3>
            <p className="text-white/80 leading-relaxed">
              Advanced AI algorithms analyze your skills, experience, and interests to provide personalized career
              insights.
            </p>
          </div>

          {/* Career Matching */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white hover:bg-white/20 transition">
            <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Career Matching</h3>
            <p className="text-white/80 leading-relaxed">
              Get matched with careers that align with your strengths and receive detailed skill gap analysis.
            </p>
          </div>

          {/* Gamified Learning */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white hover:bg-white/20 transition">
            <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mb-6">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Gamified Learning</h3>
            <p className="text-white/80 leading-relaxed">
              Track progress with badges, points, and achievements as you develop new skills and reach milestones.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Career?</h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of professionals who are accelerating their career growth with AI-powered guidance.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition shadow-lg"
          >
            <UserPlus className="w-5 h-5" />
            <span>Get Started Free</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
