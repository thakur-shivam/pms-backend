# 🗂️ Project Management System (PMS) - Backend

This is the **backend service** for the Project Management System (PMS), built with **Node.js**, **Express.js**, and **MySQL**.  
It provides secure APIs for managing **projects, tasks, users, notifications, and reports** with role-based access control (RBAC).

---

## 🚀 Features
- User authentication & authorization with **JWT**
- Role-based access control (Admin, Project Manager, Team Member, Client)
- CRUD APIs for **Projects, Tasks, Users, Reports, Notifications**
- Aggregated reporting with project & task statistics
- Automatic email notifications for tasks, deadlines, and meeting minutes
- Modular MVC architecture for clean code structure
- MySQL integration with relational data modeling

---

## 🛠️ Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JWT + Bcrypt
- **Others**: Nodemailer (emails), dotenv (environment variables)

---

## 📂 Project Structure

pms-backend/
│── config/ # Database connection & configurations
│── controller/ # Route controllers (business logic)
│── model/ # Database queries & ORM-like functions
│── routes/ # API route definitions
│── middleware/ # Authentication & access control
│── utils/ # Helper utilities (emails, tokens, etc.)
│── server.js # App entry point
│── package.json # Dependencies
│── README.md # Documentation


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/pms-backend.git
cd pms-backend
```

### 2️⃣ Install dependencies

```bash
npm install
```