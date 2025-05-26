# Food Delivery App - Backend

This is the backend for the Food Delivery App, providing RESTful APIs for user authentication, food management, cart, and order processing, including image uploads via Cloudinary.

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
│   ├── config/
│   │   ├── cloudinary.js
│   │   └── database.js
│   ├── controllers/
│   │   ├── cart.controller.js
│   │   ├── food.controller.js
│   │   ├── order.controller.js
│   │   └── user.controller.js
│   ├── middlewares/
│   │   ├── authenticate.middleware.js
│   │   ├── error.middleware.js
│   │   └── multer.middleware.js
│   ├── models/
│   │   ├── food.model.js
│   │   ├── order.model.js
│   │   └── user.model.js
│   ├── routers/
│   │   ├── cart.routes.js
│   │   ├── food.routes.js
│   │   ├── order.routes.js
│   │   └── user.routes.js
│   ├── utils/
│   │   ├── cloudinary.utils.js
│   │   └── ErrorHandler.js
│   └── uploads/
├── .gitignore
├── app.js
├── package.json
├── server.js
└── ...
```

---

## 🛠️ Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Configure your environment variables** for MongoDB, Cloudinary, and Stripe in a `.env` file (not included in this repo).

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

### Cart Routes (`/carts/v1`)

| Method | Endpoint         | Middleware     | Description                        |
|--------|------------------|---------------|------------------------------------|
| PATCH  | `/add`           | authenticate  | Add food to cart                   |
| PATCH  | `/remove`        | authenticate  | Remove food from cart              |
| GET    | `/get-cart`      | authenticate  | Get current user's cart            |

---

### Order Routes (`/orders/v1`)

| Method | Endpoint           | Middleware     | Description                        |
|--------|--------------------|---------------|------------------------------------|
| POST   | `/create-order`    | authenticate  | Place a new order                  |
| PATCH  | `/verify-order`    | authenticate  | Verify payment and update order    |
| GET    | `/get-orders`      | authenticate  | Get all orders for current user    |

---

## 📝 Notes

- `.env` and `node_modules` are excluded from version control.
- Make sure to set up your own Cloudinary and Stripe accounts for image uploads and payments.
- Ensure MongoDB is running locally or update the connection string for a remote database.

---

## 📧 Contact

For any questions or support, please open an issue or contact the maintainer at **vk2388275@gmail.com**.

---