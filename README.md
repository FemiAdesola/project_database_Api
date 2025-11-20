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
* For example https://project-database-api.onrender.com/api/members/

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

### Example of Testing API through browser console in Inspect (DevTools)

```js
fetch("https://project-database-api.onrender.com/api/members", {
  method: "GET",
  headers: { "Content-Type": "application/json" },
})
.then(res => res.json())
.then(data => console.log("Login response:", data));

```

## getby id
```js
fetch("https://project-database-api.onrender.com/api/members/68d9478ef7a27f9a75697e91", {
  method: "GET",
  headers: { "Content-Type": "application/json" },
})
.then(res => res.json())
.then(data => console.log("Login response:", data));
```


## update
```js
fetch("https://project-database-api.onrender.com/api/members/68d9478ef7a27f9a75697e91", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
  name: "Femi2",
  email: "fe2@example.com",
  password: "*******",
  role: "developer"
  })
})
.then(res => res.json())
.then(data => console.log("Login response:", data));
```

## delete
```js
fetch("https://project-database-api.onrender.com/api/members/68d97d1117514b7b2e5bf7e0", {
  method: "DELETE",
  headers: { "Content-Type": "application/json" },
})
.then(res => res.json())
.then(data => console.log("Login response:", data));
```

### get project
```js
fetch("https://project-database-api.onrender.com/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "fem@example.com",
    password: "*******"
  })
})
.then(res => res.json())
.then(data => console.log("Login response:", data));
```

### get project all project
```js

fetch("https://project-database-api.onrender.com/api/projects", {
  method: "GET",
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDk0NGVlNjBmZTVkYjUxNzJiYTBmYiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1OTA4NjMwOSwiZXhwIjoxNzU5MDg5OTA5fQ.D0Y2G6zgPkf7oJVkgOZrNlhqF99i4ZbtJxiW6Q3*******",
    "Content-Type": "application/json"
  }
})
.then(res => res.json())
.then(data => console.log("Projects:", data))
.catch(err => console.error("Fetch error:", err));
```

### get project by ID
```js

fetch("https://project-database-api.onrender.com/api/projects/68d978a7461f015d*******", {
  method: "GET",
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDk0NGVlNjBmZTVkYjUxNzJiYTBmYiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1OTA4NjMwOSwiZXhwIjoxNzU5MDg5OTA5fQ.D0Y2G6zgPkf7oJVkgOZrNlhqF99i4ZbtJxiW6Q3******",
    "Content-Type": "application/json"
  }
})
.then(res => res.json())
.then(data => console.log("Projects:", data))
.catch(err => console.error("Fetch error:", err));
```

### get project by ID
```js

fetch("https://project-database-api.onrender.com/api/projects/68d978a7461f015*******", {
  method: "PUT",
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDk0NGVlNjBmZTVkYjUxNzJiYTBmYiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1OTA4NjMwOSwiZXhwIjoxNzU5MDg5OTA5fQ.D0Y2G6zgPkf7oJVkgOZrNlhqF99i4ZbtJxiW6Q3*******",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
      "title": "Website Redesign testing",
      "description": "Redesign the company website",
      "status": "in-progress",
      "members": ["68d944ee60fe5db5*******"]
  })
})
.then(res => res.json())
.then(data => console.log("Projects:", data))
.catch(err => console.error("Fetch error:", err));
```

## 3.5	A simple and structured interface for testing the backend API for projects database
> In this project, HTML was used to create a simple and structured interface for testing the backend API directly in the browser, specifically for the project's database. This interface included basic forms and elements such as input fields and buttons for login, as well as Create, Read, and Update operations. 

![html_page_1](/img/Html.png)
![html_page_2](/img/Html1.png)


## 🧾 License

MIT License [Femi Adesola Oyinloye](https://github.com/FemiAdesola) © 2025 

Feel free to fork, modify, and share!

