# AlumniSphere

**AlumniSphere** is a full-stack MERN platform designed to connect **students, alumni, and faculty** within a single digital community. It helps users stay connected beyond graduation through mentorship, career opportunities, events, networking, and real-time communication.

## 🚀 Features

* 🔐 **Authentication & Authorization**

  * User registration and login
  * JWT-based authentication
  * Role-based access for Students, Alumni, and Faculty
  * Secure protected routes

* 👤 **Role-Based Profiles**

  * Student profiles
  * Alumni professional profiles
  * Faculty profiles
  * Role-specific information and skills

* 🎓 **Mentorship**

  * Students can discover alumni mentors
  * Students can send mentorship requests
  * Alumni can accept or reject requests
  * Alumni can manage their mentorship availability

* 💼 **Jobs & Internships**

  * Alumni can share job and internship opportunities
  * Students can discover relevant opportunities

* 📅 **Events**

  * Faculty can create and manage events
  * Students and alumni can discover upcoming events

* 🤝 **Networking**

  * Discover students, alumni, and faculty
  * Build professional connections within the college community

* 💬 **Real-Time Chat**

  * One-to-one communication between users
  * WebSocket-based real-time messaging

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Lucide React
* Context API

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Joi

### Tools & Services

* Git & GitHub
* Postman
* VS Code
* WebSockets

## 🏗️ Architecture

```text
AlumniSphere
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.jsx
│   │
│   └── ...
│
└── backend/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    └── server.js
```

## 👥 User Roles

| Role        | Capabilities                                                                 |
| ----------- | ---------------------------------------------------------------------------- |
| **Student** | View mentors, send mentorship requests, explore jobs, events and network     |
| **Alumni**  | Become a mentor, manage mentorship requests, share opportunities and network |
| **Faculty** | Manage events, maintain faculty profile and interact with the community      |

## 🔐 Authentication Flow

AlumniSphere uses **JWT-based authentication**.

```text
User Login
    ↓
Backend validates credentials
    ↓
JWT generated
    ↓
Token stored on client
    ↓
AuthContext manages authentication state
    ↓
Protected API requests
    ↓
JWT verification middleware
    ↓
Access based on user role
```

The application uses React Context API to maintain authentication state across the frontend.

## 📁 Environment Variables

### Backend `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Frontend

Configure the backend API URL according to your local/deployed environment.

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/alumnisphere.git
cd alumnisphere
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the backend directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Start Backend

```bash
npm run dev
```

### 5. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 6. Start Frontend

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## 🔄 Current Development

AlumniSphere is being developed incrementally, with the core authentication, role-based profiles, landing page, and mentorship functionality being implemented first.

Planned modules include:

* Mentorship
* Jobs & Internships
* Events
* Networking
* One-to-one real-time chat
* Profile management
* Notifications

## 🎯 Project Goal

The goal of AlumniSphere is to create a centralized platform where **college communities remain connected beyond graduation**, enabling students to receive guidance, alumni to give back, and faculty to engage with both groups.

