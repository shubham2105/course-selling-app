# 🎓 Course Selling Platform Backend

A production-ready REST API for a Course Selling Platform built with Node.js, Express.js, MongoDB Atlas, JWT Authentication, and deployed on Render.

The API supports user and admin authentication, course management, course purchases, ownership validation, and user profile management.

---

## 🚀 Live API

**Base URL**

https://course-selling-app-g026.onrender.com

**Sample Endpoint**

https://course-selling-app-g026.onrender.com/api/v1/courses

---

## ✨ Features

### Authentication & Authorization

#### User Features

* User Signup
* User Login
* JWT Authentication
* Protected Routes

#### Admin Features

* Admin Signup
* Admin Login
* JWT Authentication
* Protected Admin Routes

---

### Course Management

Admins can:

* Create Courses
* Update Courses
* Delete Courses

Users can:

* Browse Courses
* View Course Details
* Purchase Courses
* View Purchased Courses

---

### User Profile

* Fetch Profile Information
* Access Protected User Data

---

### Purchase System

* Purchase Courses
* Prevent Duplicate Purchases
* Ownership Validation
* Purchased Courses Listing

Course details endpoint returns ownership information:

```json id="1"
{
  "course": {
    "_id": "courseId",
    "title": "React Native Development",
    "price": 499
  },
  "isPurchased": true
}
```

This enables client applications to determine whether a course has already been purchased.

---

## 🛡 Security Features

* JWT Authentication
* Password Hashing using bcryptjs
* Route Protection Middleware
* Role-Based Authorization
* Input Validation using Zod
* Duplicate Purchase Prevention
* Ownership Verification

---

## 🗄 Database Models

### User

```javascript id="2"
{
  firstName,
  lastName,
  email,
  password
}
```

### Admin

```javascript id="3"
{
  firstName,
  lastName,
  email,
  password
}
```

### Course

```javascript id="4"
{
  title,
  description,
  price,
  imageUrl,
  creatorId
}
```

### Purchase

```javascript id="5"
{
  userId,
  courseId
}
```

---

## 📂 Project Structure

```bash id="6"
backend/
│
├── controllers/
│   ├── adminController.js
│   ├── userController.js
│   ├── courseController.js
│   └── purchaseController.js
│
├── middlewares/
│   ├── adminMiddleware.js
│   └── userMiddleware.js
│
├── models/
│   ├── Admin.js
│   ├── User.js
│   ├── Course.js
│   └── Purchase.js
│
├── routes/
│   ├── adminRoutes.js
│   ├── userRoutes.js
│   └── courseRoutes.js
│
├── validators/
│   ├── adminValidation.js
│   ├── userValidation.js
│   └── courseValidation.js
│
├── config/
├── .env
└── index.js
```

---

## 🔌 API Endpoints

### User Routes

| Method | Endpoint                        |
| ------ | ------------------------------- |
| POST   | /api/v1/user/signup             |
| POST   | /api/v1/user/login              |
| GET    | /api/v1/user/profile            |
| POST   | /api/v1/user/purchase/:courseId |
| GET    | /api/v1/user/my-courses         |

---

### Admin Routes

| Method | Endpoint                       |
| ------ | ------------------------------ |
| POST   | /api/v1/admin/signup           |
| POST   | /api/v1/admin/login            |
| POST   | /api/v1/admin/course           |
| PUT    | /api/v1/admin/course/:courseId |
| DELETE | /api/v1/admin/course/:courseId |

---

### Course Routes

| Method | Endpoint                  |
| ------ | ------------------------- |
| GET    | /api/v1/courses           |
| GET    | /api/v1/courses/:courseId |

---

## ⚙ Environment Variables

Create a `.env` file:

```env id="7"
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET_KEY=your_jwt_secret
```

---

## 💻 Local Development

Clone the repository:

```bash id="8"
git clone <repository-url>
```

Navigate into the project:

```bash id="9"
cd backend
```

Install dependencies:

```bash id="10"
npm install
```

Run the development server:

```bash id="11"
npm run dev
```

---

## 🛠 Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JWT
* bcryptjs

### Validation

* Zod

### Deployment

* Render

### Testing

* Postman

---

## 🔮 Future Improvements

* Payment Gateway Integration (Stripe/Razorpay)
* Course Categories
* Search & Filtering
* Ratings & Reviews
* Video Streaming Support
* Course Progress Tracking
* Notifications
* Admin Analytics Dashboard

---

## 👨‍💻 Author

Shubham Dhole

Built to explore backend development concepts including REST API design, authentication, authorization, MongoDB data modeling, validation, and cloud deployment.
