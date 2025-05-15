# API Documentation

## User Routes (`/users/v1`)

| Method | Endpoint           | Middleware     | Description                        | Request Body / Params                |
|--------|--------------------|---------------|------------------------------------|--------------------------------------|
| POST   | `/register`        | None          | Register a new user                | `{ name, email, password, phoneNumber }` |
| POST   | `/login`           | None          | Login user                         | `{ email, password }`                |
| GET    | `/logout`          | authenticate  | Logout the logged-in user          | Cookie required                      |
| DELETE | `/delete-me`       | authenticate  | Delete the logged-in user's profile| Cookie required                      |
| GET    | `/me`              | authenticate  | Get logged-in user's profile       | Cookie required                      |
| PATCH  | `/update`          | authenticate  | Update user profile (partial)      | `{ name, email, phoneNumber }`       |
| PATCH  | `/update-password` | authenticate  | Update user password               | `{ newPassword }`                    |

### User Route Details

- **Register**: Creates a new user account.
- **Login**: Authenticates user and sets a secure HTTP-only cookie.
- **Logout**: Clears the authentication cookie and invalidates the session.
- **Delete Profile**: Deletes the currently logged-in user's profile.
- **Get Profile**: Returns details of the currently logged-in user.
- **Update Profile**: Updates name, email, or phone number.
- **Update Password**: Changes the user's password.

---

## Food Routes (`/foods/v1`)

| Method | Endpoint           | Middleware         | Description                        | Request Body / Params                |
|--------|--------------------|-------------------|------------------------------------|--------------------------------------|
| POST   | `/add-food`        | upload.single("image") | Add a new food item (with image upload) | `{ name, description, price, category }` + `image` (file) |
| GET    | `/all-foods`       | None              | Get all food items                 | -                                    |
| GET    | `/single-food/:id` | None              | Get a single food item by ID       | `:id` (food ID)                      |

### Food Route Details

- **Add Food**: Adds a new food item with image upload (uses Cloudinary).
- **Get All Foods**: Returns a list of all food items.
- **Get Single Food**: Returns details of a food item by its ID.

---

## Middleware

- **authenticate**: Checks if the user is authenticated (typically via JWT in cookie).
- **upload.single("image")**: Handles single image file upload for food items.

---

## Example Usage

### Register User

```http
POST /users/v1/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourpassword",
  "phoneNumber": "1234567890"
}
```

### Add Food

```http
POST /foods/v1/add-food
Content-Type: multipart/form-data

name: "Pizza"
description: "Delicious cheese pizza"
price: 10
category: "Fast Food"
image: (file)
```

---

> **Note:** All endpoints are prefixed with `/users/v1` or `/foods/v1` as shown above.