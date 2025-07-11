# 🔗 URL Shortener Web Application

This project focuses on building a complete web-based tool that lets users:

- 🔁 Convert long URLs into short, easily shareable links  
- 📊 View and analyze total and unique click counts over time  
- 🔄 Enable or disable links based on their current usage (Toggle Active - Inactive)  
- 📷 Generate QR codes for quick access and offline sharing  

It was built to help users easily manage their links, with clear controls to enable or disable them, and a simple way to view how many times each link was clicked.

---

## ⚙️ Technologies Used

- **Frontend:** React, React Router, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas  
- **Authentication:** JWT-based authentication  
- **Deployment:** Render.com (separate deployments for frontend and backend)  
- **Utilities:**  
  - `nanoid` – Generates short IDs for URLs  
  - `qrcode` – Generates QR Codes  

---

## 🌟 Key Features Implemented

### 🔗 URL Shortening with Full Control

- Converts long URLs into short, shareable links using `nanoid`  
- Each URL is tied to the logged-in user and stored in MongoDB  
- Users can:  
  1. Delete any shortened URL permanently  
  2. Toggle URLs between active and inactive status  
  3. Manage all links from a single, intuitive interface  

---

### 📈 Click Tracking and Analytics

- Tracks **total** and **unique** clicks for every shortened URL  
- Helps users monitor how often their links are accessed  
- Data is displayed in an easy-to-understand format  

---

### 📱 QR Code Generation and Download

- Automatically generates a QR code for every shortened URL  
- Users can download the QR code image with a single click  
- Useful for offline sharing or printed materials  

---

### 📤 Easy Link Sharing

- Built-in copy-to-clipboard feature for quick sharing  
- Allows users to distribute links easily across any platform  

---

### 🔐 Authentication

- Implements secure JWT-based login and signup system  
- Only authenticated users can access core features like link creation, deletion, toggling, and analytics  

---

### 👤 Profile and 📩 Contact Pages

- **Profile Page:** Users can update their password securely  
- **Contact Page:** Allows users to submit feedback or queries  
