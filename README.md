# 🤖 AI Content Automation Platform

> **Full-stack platform for generating, scheduling, and analyzing AI-powered content across multiple social media platforms**

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)

## 📋 Table of Contents

- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🎯 Content Generation
- **AI-Powered Content**: Generate high-quality content using OpenAI GPT-3.5-turbo
- **Multi-Platform Support**: LinkedIn, Instagram, Twitter/X, TikTok, YouTube, Facebook
- **Tone Customization**: Professional, casual, inspirational, educational, humorous
- **Smart Optimization**: Platform-specific character limits and formatting

### 📅 Content Management
- **Scheduling**: Queue posts for future publishing
- **Draft Management**: Save and edit drafts before publishing
- **Bulk Operations**: Generate multiple content pieces simultaneously

### 📊 Analytics Dashboard
- **Performance Tracking**: Monitor views, engagement, and reach
- **Platform Comparison**: Compare performance across different platforms
- **Trend Analysis**: Identify your best-performing content

### 💼 Portfolio Integration
- **Career Optimization**: AI-powered career advice and positioning
- **Skills Tracking**: Monitor your professional development
- **Personal Branding**: Build consistent messaging across platforms

---

## 🎬 Demo

### Screenshots

**Dashboard**
![Dashboard](https://via.placeholder.com/800x400.png?text=Dashboard+Screenshot)

**Content Generator**
![Content Generator](https://via.placeholder.com/800x400.png?text=Content+Generator+Screenshot)

**Analytics**
![Analytics](https://via.placeholder.com/800x400.png?text=Analytics+Screenshot)

### Live Demo

🔗 **[View Live Demo](https://your-demo-url.vercel.app)** *(Coming Soon)*

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Recharts](https://recharts.org/)** - Composable charting library

### Backend
- **[Express.js](https://expressjs.com/)** - Fast, minimalist web framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe Node.js
- **[Cors](https://www.npmjs.com/package/cors)** - Cross-origin resource sharing

### Database
- **[Supabase](https://supabase.com/)** - Open-source Firebase alternative (PostgreSQL)

### AI & APIs
- **[OpenAI API](https://openai.com/api/)** - GPT-3.5-turbo for content generation

### DevOps
- **[Vercel](https://vercel.com/)** - Frontend deployment
- **[Railway](https://railway.app/)** / **[Render](https://render.com/)** - Backend deployment

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn**
- **OpenAI API Key** ([Get one here](https://platform.openai.com/api-keys))
- **Supabase Account** ([Sign up free](https://supabase.com/))

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/researchsociety1999-hub/ai-content-automation-platform.git
cd ai-content-automation-platform
```

#### 2. Set Up Backend

```bash
cd backend
npm install

# Create .env file
cat > .env << EOF
PORT=3001
OPENAI_API_KEY=your_openai_api_key_here
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
EOF

# Start development server
npm run dev
```

Backend will run on `http://localhost:3001`

#### 3. Set Up Frontend

```bash
cd ../frontend
npm install

# Create .env.local file
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:3001
EOF

# Start development server
npm run dev
```

Frontend will run on `http://localhost:3000`

#### 4. Set Up Supabase Database

1. Go to your [Supabase Dashboard](https://app.supabase.com/)
2. Create a new project
3. Go to **SQL Editor** and run:

```sql
-- Create content table
CREATE TABLE content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  platform VARCHAR(50) NOT NULL,
  topic TEXT NOT NULL,
  tone VARCHAR(50) NOT NULL,
  generated_content TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'draft',
  scheduled_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create analytics table
CREATE TABLE analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content_id UUID REFERENCES content(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  views INTEGER DEFAULT 0,
  engagement INTEGER DEFAULT 0,
  reach INTEGER DEFAULT 0,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_content_status ON content(status);
CREATE INDEX idx_content_platform ON content(platform);
CREATE INDEX idx_analytics_date ON analytics(date);
```

4. Copy your **Project URL** and **anon/public key** to the backend `.env` file

---

## 📁 Project Structure

```
ai-content-automation-platform/
├── backend/                 # Express.js backend
│   ├── src/
│   │   ├── server.ts       # Main server file
│   │   ├── routes/
│   │   │   ├── content.ts  # Content generation routes
│   │   │   └── analytics.ts # Analytics routes
│   │   └── services/
│   │       ├── openaiService.ts    # OpenAI integration
│   │       └── supabaseService.ts  # Supabase client
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                # Next.js frontend
│   ├── app/
│   │   ├── page.tsx        # Homepage
│   │   ├── dashboard/
│   │   │   └── page.tsx    # Dashboard page
│   │   └── layout.tsx      # Root layout
│   ├── components/
│   │   ├── ContentGenerator.tsx   # Content generation UI
│   │   ├── ContentList.tsx        # Content management UI
│   │   └── AnalyticsDashboard.tsx # Analytics UI
│   ├── package.json
│   └── tsconfig.json
│
├── docs/                    # Additional documentation
│   ├── API.md              # API documentation
│   ├── DEPLOYMENT.md       # Deployment guide
│   └── PORTFOLIO.md        # Portfolio case study
│
├── .gitignore
├── LICENSE
└── README.md               # This file
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Endpoints

#### **POST** `/content/generate`
Generate AI content for a specific platform

**Request Body:**
```json
{
  "platform": "linkedin",
  "topic": "Career growth in tech",
  "tone": "professional"
}
```

**Response:**
```json
{
  "id": "uuid-here",
  "platform": "linkedin",
  "content": "Generated content here...",
  "status": "draft",
  "created_at": "2025-12-18T19:00:00Z"
}
```

#### **GET** `/content`
Retrieve all content (supports filtering)

**Query Parameters:**
- `status` - Filter by status (draft, scheduled, published)
- `platform` - Filter by platform

**Response:**
```json
[
  {
    "id": "uuid-here",
    "platform": "linkedin",
    "content": "Content here...",
    "status": "draft"
  }
]
```

#### **GET** `/analytics`
Retrieve analytics data

**Response:**
```json
[
  {
    "platform": "linkedin",
    "views": 1250,
    "engagement": 85,
    "reach": 3400,
    "date": "2025-12-18"
  }
]
```

[Full API Documentation →](docs/API.md)

---

## 🚢 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/)
3. Click **Import Project**
4. Select your repository
5. Set **Root Directory**: `frontend`
6. Add environment variable:
   - `NEXT_PUBLIC_API_URL`: Your backend URL
7. Click **Deploy**

### Backend (Railway)

1. Go to [Railway](https://railway.app/)
2. Click **New Project** → **Deploy from GitHub**
3. Select your repository
4. Set **Root Directory**: `backend`
5. Add environment variables:
   - `PORT`: `3001`
   - `OPENAI_API_KEY`: Your OpenAI key
   - `SUPABASE_URL`: Your Supabase URL
   - `SUPABASE_KEY`: Your Supabase key
6. Click **Deploy**

[Detailed Deployment Guide →](docs/DEPLOYMENT.md)

---

## 🤝 Contributing

Contributions are always welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [OpenAI](https://openai.com/) for GPT-3.5-turbo API
- [Supabase](https://supabase.com/) for database and authentication
- [Vercel](https://vercel.com/) for hosting
- [Next.js](https://nextjs.org/) team for the amazing framework

---

## 📬 Contact

**Built by:** [Your Name](https://github.com/researchsociety1999-hub)

**Portfolio:** [your-portfolio-url.com](#)

**LinkedIn:** [your-linkedin-profile](#)

---

<p align="center">Made with ❤️ for content creators and tech enthusiasts</p>
