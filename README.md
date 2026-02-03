# 📝 Todo & Calendar Full‑Stack Web Application

A professional full‑stack task management application with **advanced filtering, calendar integration, and authentication**.
This project is designed as a **portfolio‑ready application** that demonstrates real‑world backend logic, clean API design, and a modern frontend.

---

## 🔍 Project Overview

This application allows authenticated users to manage their daily tasks efficiently using **both a task list and a calendar view**.
Each user has isolated data, advanced search & filtering, pagination, and secure access via JWT.

The project follows **industry‑standard architecture** with clear separation of concerns between frontend, backend, and database layers.

---
<img width="1846" height="868" alt="Screenshot 2026-01-05 194746" src="https://github.com/user-attachments/assets/b3e0ade4-f9ec-4c46-9a05-43e25bf7eade" />
<img width="1157" height="868" alt="Screenshot 2026-01-05 194659" src="https://github.com/user-attachments/assets/d5c51394-cfb3-4203-bb99-86cdabb704ae" />
<img width="1184" height="870" alt="Screenshot 2026-01-05 194620" src="https://github.com/user-attachments/assets/d845f791-8374-40d9-b21b-ca433733772f" />

## 🚀 Key Features (Detailed)


* 🔐 Authentication & Security: JWT‑based secure access.
* ✅ Task Management: Full CRUD with priorities and statuses.
* 📅 Calendar Integration: Visual task tracking over time.
* 🔎 Advanced Filtering: Server-side search, filtering, and pagination.
* 🐳 Dockerized Architecture: Instant setup with Docker Compose.

---

### ✅ Task Management System

Users can fully manage their tasks with the following capabilities:

* Create tasks with:

  * Title
  * Description
  * Start date
  * End date
  * Priority level (low / medium / high)
* Update tasks:

  * Change title
  * Update status (pending / completed)
  * Modify priority
  * Adjust end date
* Delete tasks (only owner can delete)

---

### 🔎 Advanced Task Filtering & Search

The task list supports **powerful querying features**:

* Filter by status (`pending`, `completed`)
* Filter by priority (`low`, `medium`, `high`)
* Search tasks by title (text search)
* Filter by date range (`from` / `to`)
* Pagination support for large datasets

These filters are handled **server‑side** for performance and scalability.

---

### 📅 Calendar Integration (Advanced Feature)

The application includes a **calendar view** that visualizes tasks based on their date range.

Calendar features:

* Fetch tasks within a specific date range
* Display tasks as calendar events
* Each event includes:

  * Task title
  * Start date
  * End date
  * Priority
  * Status
* Automatically ordered by start date

This feature allows users to **visually plan and track tasks over time**, similar to real productivity tools.

---

### 📄 Pagination & Performance

* Server‑side pagination for task lists
* Configurable page size (`limit`)
* Optimized SQL queries
* Total record count returned for UI pagination

---

## 🏗️ Tech Stack & Infrastructure

* Frontend: React, Tailwind CSS, Nginx (Production Proxy)
* Backend: Node.js, Express.js, JWT
* Database: MySQL 8.0
* Orchestration: Docker, Docker Compose


---

## ⚙️ Getting Started (The Easy Way - Docker)

The fastest way to run this application is using **Docker**. No need to install Node.js, npm, or MySQL locally.
If you don't want to clone the repository, you can run the entire stack using only the docker-compose.yml file.

### 1️⃣ Prerequisites
* **Docker Desktop** installed and running. [Download here](https://www.docker.com/products/docker-desktop/).

### 2️⃣ Download the docker-compose.yml to your local machine.


3️⃣ Create a .env file in the same folder with your database credentials
```
DB_HOST=db
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=todo_app
JWT_SECRET=my_super_secret_key
```

4️⃣ Run the command:
```docker-compose up -d```

### Access the Application

* Frontend: http://localhost (Port 80)
* Backend API: http://localhost:8000
* Database Access: localhost:3306 (Connect via TablePlus, DBeaver, etc.)


## Fix for MySQL `schema.sql` Mount Issue in Docker

If you encounter the following error when running `docker-compose up` and your database tables are not being created:

ERROR: Can't initialize batch_readline - may be the input source is a directory or a block device.


### Cause
This issue happens when Docker fails to correctly mount the MySQL schema file, causing `schema.sql` to be treated as a directory instead of a file.

### Fix
1. Go to the project’s GitHub repository.
2. Copy the following file from the repository:
backend/database/schema.sql

3. Make sure the `schema.sql` file is placed **inside the `backend/database` directory** in your local project.
4. Stop and remove existing containers and volumes:```docker-compose down -v```
5. Start the project again:```docker-compose up```


---

### 🛠️ Manual Setup (Alternative)
If you prefer to run the services individually without Docker:

---

### 3️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend`:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=todo_app
JWT_SECRET=my_super_secret_key
```

Create database:

```sql
The database schema is provided as an SQL script.

### Steps:
1. Create the database and tables:
```bash
mysql -u root -p < backend/database/schema.sql

2.Update .env file in backend:
DB_NAME=todo_app
```

Run backend:

```bash
npm start
```

Backend URL:

```
http://localhost:3000
```

---

### 4️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend URL:

```
http://localhost:3001
```

---

## 🌐 API Endpoints (Summary)

### Authentication

```
POST /api/auth/register
POST /api/auth/login
```

### Tasks

```
POST   /api/tasks
GET    /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

### Calendar

```
GET /api/calendar?from=YYYY-MM-DD&to=YYYY-MM-DD
```

---
## 🐳 Docker Services Architecture

| Container Name | Internal Port | External Port | Role |
| :--- | :---: | :---: | :--- |
| **todo-frontend** | 80 | 80 | Serves React app via Nginx |
| **todo-backend** | 3000 | 8000 | Node.js Express API |
| **todo-db** | 3306 | 3306 | MySQL 8.0 Database |

---

## 🛠️ Maintenance & Troubleshooting

### Resetting the Database
If you modify `schema.sql` or other database configurations and need to rebuild the database structure from scratch (**Warning: This will delete all existing data**):

```bash
# Stop containers and remove volumes
docker-compose down -v

# Start and rebuild
docker-compose up --build
```

### Viewing Real-time Logs
```bash
# View all logs
docker-compose logs -f

# View only backend logs
docker-compose logs -f backend
```
---

## 📌 Notes for Reviewers / Employers

* This project demonstrates real‑world backend logic, not just CRUD
* Includes filtering, pagination, and calendar‑based data visualization
* Clean separation between frontend, backend, and database layers
* Designed with scalability and maintainability in mind

---

## 🚧 Future Improvements

* Role‑based access control
* Recurring tasks
* Notifications & reminders
* Deployment with Docker
* Cloud database integration

---

## 📄 License

This project is intended for educational and portfolio purposes.
