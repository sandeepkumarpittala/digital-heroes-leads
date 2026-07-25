# 🚀 Digital Heroes Full Stack Lead Management System

A full-stack Lead Management System built as part of the Digital Heroes Internship Assignment.

## 📌 Project Overview

This application allows visitors to submit lead information through a landing page. Admin users can securely log in, view submitted leads, search, filter, and update lead statuses.

---

## ✨ Features

### Public Features
- Landing Page
- Responsive UI
- Lead Submission Form
- Client-side Validation
- Success Message

### Admin Features
- Secure Login (JWT Authentication)
- Protected Dashboard
- View All Leads
- Search by Name or Email
- Filter by Status
- Update Lead Status
- Logout

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Context API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Express Validator

---

## 📂 Project Structure

```
digital-heroes-leads/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── src/
│   ├── server.js
│   └── package.json
│
└── .gitignore
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/sandeepkumarpittala/digital-heroes-leads.git
```

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=1h

CLIENT_URL=http://localhost:5173
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |

### Leads

| Method | Endpoint |
|---------|----------|
| POST | /api/leads |
| GET | /api/leads |
| PATCH | /api/leads/:id/status |

---

## 📸 Screenshots

Add screenshots of:

- Landing Page
- Lead Form
- Login Page
- Admin Dashboard
- MongoDB Collections

---

## 🚀 Future Improvements

- Pagination
- Email Notifications
- Dashboard Analytics
- Role-based Authentication
- Dark Mode

---

## 👨‍💻 Author

**Pittala Sandeep Kumar**

GitHub:
https://github.com/sandeepkumarpittala

---

## 📄 License

This project was created for learning and internship purposes.
