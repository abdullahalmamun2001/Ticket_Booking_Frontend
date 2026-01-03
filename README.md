# 🎟️ TicketBari – Online Ticket Booking Platform

TicketBari is a full-stack, role-based online ticket booking system where users can book tickets, vendors can manage and sell tickets, and admins can control the entire platform.  
The system is designed to be secure, scalable, and user-friendly.

---

## 🌐 Live Overview

TicketBari connects **Users**, **Vendors**, and **Admins** in one platform with clear role permissions, real-time status updates, and modern UI design using Tailwind CSS.

---

## 👥 User Roles & Responsibilities

### 👤 Normal User
- Register & login using Email/Password or Google
- Browse available tickets
- View ticket details (price, date, route, perks)
- Book tickets
- Track booking status (pending / accepted / rejected)
- Contact the platform via Contact page (EmailJS)

---

### 🧑‍💼 Vendor
- Secure login & dashboard access
- Add new tickets with:
  - Title, route, date & time
  - Price & quantity
  - Transport type
  - Image upload
- Update or delete own tickets (if not rejected)
- View verification status:
  - Pending
  - Approved
  - Rejected
- View revenue overview & ticket statistics

---

### 🛡️ Admin
- Manage all tickets
- Approve or reject vendor tickets
- Manage users:
  - Promote to Admin
  - Promote to Vendor
  - Mark Vendor as Fraud
- Advertise approved tickets
- Control platform integrity

---

## ✨ Core Features

### 🔐 Authentication & Security
- Firebase Authentication
- JWT based API protection
- Role-based route protection
- Secure token storage

### 🎫 Ticket Management
- CRUD operations for vendors
- Admin verification system
- Advertisement system
- Booking validation

### 📊 Dashboard & Analytics
- Vendor revenue overview
- Tickets sold vs revenue chart
- Admin management tables

### 📩 Contact System
- Contact form with:
  - Name
  - Email
  - Phone number
  - Message
- Email delivery via EmailJS

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Tailwind CSS
- DaisyUI
- Recharts
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

### Other Tools
- Firebase Authentication
- EmailJS
- Axios / Fetch API

---

## ⚙️ Environment Variables
