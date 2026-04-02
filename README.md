# Bookstore App

## Description

Bookstore App adalah aplikasi web berbasis Node.js yang memungkinkan pengguna untuk membeli buku secara digital dengan sistem keranjang (cart) dan simulasi pembayaran menggunakan QR Code.

Aplikasi ini memiliki dua role utama:

* **Admin** → mengelola data buku
* **Customer** → melakukan pembelian buku

---

## Features

### Authentication

* Register & Login
* Role-based access (Admin & Customer)

### Book Management (Admin)

* Create, Read, Update, Delete (CRUD) Buku
* Relasi dengan Author dan Category

### Purchase / Cart System (Customer)

* Menambahkan buku ke dalam satu transaksi
* Mendukung multiple books dalam satu purchase

### QR Payment Simulation

* Generate QR Code untuk simulasi pembayaran
* Redirect ke halaman **Payment Success**

### Purchase History

* Menampilkan riwayat pembelian user

---

## Tech Stack

* Node.js
* Express.js
* Sequelize
* PostgreSQL
* EJS
* bcryptjs
* qrcode

---

## Database Schema

Relasi utama dalam aplikasi:

* User → Purchase (One-to-Many)
* Book → Author (Many-to-One)
* Book ↔ Categori (Many-to-Many)
* Purchase ↔ Book (Many-to-Many)

---

## Installation

1. Clone repository

```bash
git clone <your-repo-url>
cd bookstore
```

2. Install dependencies

```bash
npm install
```

3. Setup database

```bash
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
```

4. Run server

```bash
npm run dev
```

---

## Usage

1. Buka aplikasi di browser:

```
http://localhost:3000
```

2. Register & Login

3. Gunakan fitur sesuai role:

* Admin → Manage Books
* Customer → Add Book → Checkout

---

## Payment Flow

1. User menambahkan buku ke cart
2. Klik tombol **Pay**
3. QR Code muncul
4. Scan / klik simulasi
5. Redirect ke halaman **Payment Success**
6. Cart otomatis di-reset
7. Transaksi masuk ke **History**

---

## Folder Structure

```
controllers/
models/
routes/
views/
helpers/
middlewares/
migrations/
seeders/
```

---

## Future Improvements

* Integrasi payment gateway (Midtrans / Xendit)
* UI/UX lebih modern
* Pagination & advanced search
* Quantity pada cart

---

## Author

* Muhamad Fauzhy Putra
* Talitha Najwa Afifah

---

## Notes

Aplikasi ini dibuat sebagai bagian dari pembelajaran backend development dengan fokus pada:

* MVC Architecture
* Relational Database
* Authentication & Authorization
* Transaction Flow Simulation

---