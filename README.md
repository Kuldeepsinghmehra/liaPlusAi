Role-Based Access Control (RBAC)

This is a full-stack Role-Based Access Control (RBAC) system with **user authentication** and **admin-controlled blog creation and deletion**.

## 🛠️ Tech Stack
- **Frontend:** React.js + Tailwind CSS 
- **Backend:** Node.js + Express.js
- **Authentication:** JWT (JSON Web Tokens)
- **Database:** MongoDB (via Mongoose)

---

## 🧩 Features
- Admin Login / Logout
- Create, Read, Update, Delete (CRUD) Blogs
- Public users can only **view** blogs
- Admin users can **add** or **delete** blogs
- Protected routes using JWT authentication

---

## 🧪 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/Kuldeepsinghmehra/intSkyAssignment.git

2. Setup the Backend

cd backend
npm install
Create a .env file inside /backend:
setup port mongo url and jwt 

Run the backend server:

3. Setup the Frontend

cd ../frontend
npm install
Start the React app:
