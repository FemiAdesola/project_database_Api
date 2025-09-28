# Project Database REST API

> A RESTful API for managing **Projects** and **Members** with authentication and role-based access control.  
Built with **Node.js**, **Express**, **MongoDB (Mongoose)**, and **JWT Authentication**.
Projects reference Members by `ObjectId`.

View the website link [here](https://project-database-api.onrender.com/)

## 🚀 Features
- 🔑 User authentication with **JWT**
- 👥 CRUD operations for **Members**
- 📂 CRUD operations for **Projects**
- 🔒 Role-based access control (Admin-only actions)
- 🔗 MongoDB with **Mongoose ODM**
- 🛡️ Password hashing using **bcryptjs**
- 🧑‍🤝‍🧑 Populate project members in queries
- 🆔 Auto-generated **project IDs** (e.g., `PRJ-001`)

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT + bcryptjs
- **Middleware:** Role-based authorization
- **Other:** dotenv, cors, nodemon

---

## 📂 Project Structure
```
├── controllers/        # Controllers for handling API logic
│   ├── authController.js
│   ├── memberController.js
│   └── projectController.js
├── db/
│   └── db.js           # Database connection
├── middleware/
│   ├── auth.js         # JWT authentication
│   └── checkAdmin.js   # Admin role check
├── models/             # Mongoose models
│   ├── counterModel.js
│   ├── memberModel.js
│   └── projectModel.js
├── public/
│   └── index.html           # HTML to display quick login
├── routes/             # Express routes
│   ├── authRoutes.js
│   ├── memberRoutes.js
│   └── projectRoutes.js
├── server.js           # Main entry point
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/FemiAdesola/project_database_Api.git
cd project_database_api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
```env
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/projectdb
JWT_SECRET=your_jwt_secret_key
```

### 4. Run the server
```bash
# Start in development mode
npm run dev

# Start in production mode
npm start
```

---

## 📌 API Endpoints

### 🔑 Authentication
| Method | Endpoint         | Description       | Access |
|--------|-----------------|------------------|--------|
| POST   | `/api/auth/login` | Login with email & password | Public |

---

### 👥 Members
> Add endpoint to this link https://project-database-api.onrender.com
* For example https://project-database-api.onrender.com/api/members//api/members/

| Method | Endpoint             | Description          | Access |
|--------|----------------------|----------------------|--------|
| POST   | `/api/members`       | Create new member    | Public |
| GET    | `/api/members`       | Get all members      | Public |
| GET    | `/api/members/:id`   | Get member by ID     | Public |
| PUT    | `/api/members/:id`   | Update member        | Public |
| DELETE | `/api/members/:id`   | Delete member        | Public |

---

### 📂 Projects

| Method | Endpoint             | Description           | Access |
|--------|----------------------|-----------------------|--------|
| POST   | `/api/projects`      | Create new project    | Admin only |
| GET    | `/api/projects`      | Get all projects      | Authenticated |
| GET    | `/api/projects/:id`  | Get project by ID     | Authenticated |
| PUT    | `/api/projects/:id`  | Update project        | Admin only |
| DELETE | `/api/projects/:id`  | Delete project        | Admin only |

---

## 🔐 Authentication & Authorization
- **Login** to receive a JWT token:
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- Include the token in the **Authorization header**:
  ```
  Authorization: Bearer <your_token>
  ```
- Only users with `role: "admin"` can **create, update, delete projects**.

---

## 🧪 Example Requests

### Login
```bash
curl -X POST http://localhost:4000/api/auth/login -H "Content-Type: application/json" -d '{"email":"admin@example.com","password":"password123"}'
```

### Create Project (Admin only)
```bash
curl -X POST http://localhost:4000/api/projects -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{
  "title": "New Website",
  "description": "Website redesign project",
  "status": "in-progress",
  "startDate": "2025-01-01",
  "endDate": "2025-03-01",
  "members": ["member_id_1","member_id_2"]
}'
```
### for the members
#### Create or add a member (POST /api/members)
```bash
curl -X POST "http://localhost:4000/api/members" 
  -H "Content-Type: application/json" 
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "developer"
  }'
```
#### Get all members (GET /api/members)
```bash
curl -X GET "http://localhost:4000/api/members" 
  -H "Content-Type: application/json" 
```

#### Get member by ID (GET /api/members/:id)
```bash
curl -X GET "http://localhost:4000/api/members/68d944ee60fe5db5172ba0fb" 
  -H "Content-Type: application/json" 
```
#### Update member (PUT /api/members/:id)
```bash
curl -X PUT "http://localhost:4000/api/members/68d944ee60fe5db5172ba0fb" 
  -H "Content-Type: application/json" 
  -d '{
    "name": "Jane Doe",
    "role": "manager"
  }'
```

#### Delete member (DELETE /api/members/:id)
```bash
curl -X DELETE "http://localhost:4000/api/members/68d944ee60fe5db5172ba0fb" 
  -H "Content-Type: application/json" 
```

---

© 2025 [Femi Adesola Oyinloye](https://github.com/FemiAdesola)
