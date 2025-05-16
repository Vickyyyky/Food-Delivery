# Food Delivery App

This repository contains both the **Backend** (Node.js/Express API) and **Frontend** for the Food Delivery App.

---

## 📦 Backend

### Overview

- **Framework:** Node.js with Express
- **Database:** MongoDB (Mongoose)
- **Features:** User authentication, food management, image upload (Cloudinary), secure cookies

### Setup

1. **Install dependencies:**
   ```sh
   cd Backend
   npm install
   ```

2. **Start the server:**
   ```sh
   npm start
   ```
   The server will run on `http://localhost:9000` by default.

### Main Routes

#### User Routes (`/users/v1`)
- `POST /register` — Register a new user
- `POST /login` — Login user
- `GET /logout` — Logout user (requires authentication)
- `DELETE /delete-me` — Delete user profile (requires authentication)
- `GET /me` — Get user profile (requires authentication)
- `PATCH /update` — Update user profile (requires authentication)
- `PATCH /update-password` — Change password (requires authentication)

#### Food Routes (`/foods/v1`)
- `POST /add-food` — Add new food (with image upload)
- `GET /all-foods` — Get all foods
- `GET /single-food/:id` — Get food by ID
- `DELETE /delete-food/:id` — Delete food by ID

---

## 💻 Frontend

### Overview

- **Framework:** (e.g., React, Angular, Vue) — _Replace with your actual frontend stack_
- **Features:** User registration/login, food listing, food details, add food (with image), profile management

### Setup

1. **Install dependencies:**
   ```sh
   cd Frontend
   npm install
   ```

2. **Configure API endpoints:**
   - Update the API base URL in your frontend code to match your backend (e.g., `http://localhost:9000`).

3. **Start the frontend:**
   ```sh
   npm start
   ```
   The frontend will run on `http://localhost:3000` by default (or as configured).

---

## 📝 Notes

- **Environment files (`.env`) and `node_modules` are excluded from version control.**
- Make sure to set up your own Cloudinary account for image uploads.
- For development, ensure MongoDB is running locally or update the connection string for a remote database.

---

## 📂 Project Structure

```
Food-Delivery-App/
│
├── Backend/
│   ├── src/
│   ├── package.json
│   └── ...
│
└── Frontend/
    ├── src/
    ├── package.json
    └── ...
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📧 Contact

For any questions or support, please open an issue or contact the maintainer at **vk2388275@gmail.com**.

---