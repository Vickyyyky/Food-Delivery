# Food Delivery App - Backend

This is the backend for the Food Delivery App, providing RESTful APIs for user authentication and food management, including image uploads via Cloudinary.

---

## 🚀 Tech Stack

- **Node.js** with **Express**
- **MongoDB** (Mongoose)
- **Cloudinary** for image uploads

---

## 📂 Project Structure

```
Backend/
│
├── src/
│   ├── controllers/
│   │   ├── user.controller.js
│   │   └── food.controller.js
│   ├── middlewares/
│   ├── models/
│   ├── routers/
│   └── utils/
├── .gitignore
├── package.json
└── ...
```

---

## 🛠️ Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Configure your environment variables** for MongoDB and Cloudinary in a `.env` file (not included in this repo).

3. **Start the server:**
   ```sh
   npm start
   ```
   The server runs on `http://localhost:9000` by default.

---

## 📑 API Endpoints

### User Routes (`/users/v1`)

| Method | Endpoint           | Middleware     | Description                        |
|--------|--------------------|---------------|------------------------------------|
| POST   | `/register`        | None          | Register a new user                |
| POST   | `/login`           | None          | Login user                         |
| GET    | `/logout`          | authenticate  | Logout user                        |
| DELETE | `/delete-me`       | authenticate  | Delete user profile                |
| GET    | `/me`              | authenticate  | Get user profile                   |
| PATCH  | `/update`          | authenticate  | Update user profile                |
| PATCH  | `/update-password` | authenticate  | Change password                    |

---

### Food Routes (`/foods/v1`)

| Method | Endpoint                | Middleware                | Description                        |
|--------|-------------------------|---------------------------|------------------------------------|
| POST   | `/add-food`             | upload.single("image")    | Add new food (with image)          |
| GET    | `/all-foods`            | None                      | Get all foods                      |
| GET    | `/single-food/:id`      | None                      | Get food by ID                     |
| DELETE | `/delete-food/:id`      | None                      | Delete food by ID                  |
| PATCH  | `/update-food/:id`      | None                      | Update food details                |
| PATCH  | `/update-image/:id`     | upload.single("image")    | Update food image                  |

---

## 📝 Notes

- `.env` and `node_modules` are excluded from version control.
- Make sure to set up your own Cloudinary account for image uploads.
- Ensure MongoDB is running locally or update the connection string for a remote database.

---

## 📧 Contact

For any questions or support, please open an issue or contact the maintainer at **vk2388275@gmail.com**.

---