# Kikwetu Pastry Shop

A modern, full-stack web application for a pastry shop, featuring a React frontend and a Node.js/Express/MongoDB backend. The app supports user authentication (with admin roles), product browsing, cart and checkout functionality, order management, reviews, and a beautiful dark mode UI.

---

## Live Demo

- **Frontend:** [https://kikwetu-pastry-grlg.vercel.app/](https://kikwetu-pastry-grlg.vercel.app/)
- **Backend API:** [https://kikwetu-pastry.onrender.com](https://kikwetu-pastry.onrender.com)

---

## Features

- **User Authentication:** Signup, login, and logout with JWT-based authentication. Admin registration via secret code.
- **Admin Dashboard:** Manage products, view orders, and access admin-only features.
- **Product Catalog:** Browse pastries, view product details, and filter by categories.
- **Cart & Checkout:** Add/remove items, update quantities, and complete checkout with a payment modal.
- **Order Management:** Users can view their orders; admins can manage all orders.
- **Reviews:** Users can leave reviews on products.
- **Dark Mode:** Toggle between light and dark themes for a modern look.
- **Responsive Design:** Works seamlessly on desktop and mobile devices.

---

## Tech Stack

- **Frontend:** React, Vite, Context API, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **State Management:** React Context (Auth, Cart, Theme)
- **API Communication:** RESTful endpoints, Vite proxy for local development

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or pnpm
- MongoDB (local or Atlas)

### Clone the Repository

```bash
git clone https://github.com/your-username/Kikwetu-pastry.git
cd Kikwetu-pastry
```

---

### Backend Setup

1. **Install dependencies:**

   ```bash
   cd backend
   npm install
   # or
   pnpm install
   ```

2. **Environment Variables:**

   Create a `.env` file in the `backend/` directory:

   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ADMIN_CODE=your_admin_registration_code
   PORT=5000
   ```

3. **Start the backend server:**

   ```bash
   npm start
   # or
   pnpm start
   ```

   The backend will run on `http://localhost:5000`.

---

### Frontend Setup

1. **Install dependencies:**

   ```bash
   cd frontend
   npm install
   # or
   pnpm install
   ```

2. **Vite Proxy Configuration:**

   The frontend is configured to proxy `/api` requests to the backend during development. No extra setup is needed if both run on default ports.

3. **Start the frontend dev server:**

   ```bash
   npm run dev
   # or
   pnpm dev
   ```

   The frontend will run on `http://localhost:5173` (or as specified by Vite).

---

## Usage

- **Signup/Login:** Register as a user or admin (with the admin code).
- **Browse Products:** View all pastries, filter by category, and see product details.
- **Cart:** Add items to your cart, update quantities, and proceed to checkout.
- **Checkout:** Enter payment details in the modal to simulate a purchase.
- **Orders:** View your order history.
- **Admin:** Access the dashboard to manage products and orders.

---

## Project Structure

```
Kikwetu-pastry/
  backend/
    controllers/
    middleware/
    models/
    routes/
    server.js
  frontend/
    src/
      api/
      components/
      context/
      pages/
      App.jsx
      main.jsx
```

---

## Environment Variables

**Backend (`backend/.env`):**

- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT signing
- `ADMIN_CODE` - Secret code for admin registration
- `PORT` - Backend server port (default: 5000)

**Frontend:**  
No environment variables required for local development.

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## Contact

For questions or support, please open an issue or contact [jakababa002@gmail.com].
