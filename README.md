# Pixisphere Frontend Assignment

A responsive, modern web interface for **Pixisphere**, a platform connecting customers with top photographers and studios for maternity, wedding, newborn, and other shoots.

---

## 🚀 Live Demo
🔗 [View Live Project](https://pixisphere-frontend-kappa.vercel.app/)

---

## 🧩 Features
### **1. Category Listing Page**
- Photographer cards with:
  - Name, Location, Price, Rating, Tags
- Search with **debouncing**
- **Filters**:
  - Price, Rating, City, Styles
- **Sorting**: Price (Low–High), Rating, Recent
- **Infinite Scroll / Load More**
- **Skeleton Loader** while fetching

### **2. Photographer Profile Page**
- Photographer **Name, Bio, Styles, Tags, Price**
- **Image Gallery** (static from `/public/images`)
- **Reviews Section**
- **Send Inquiry** modal form

---

## 🧠 Tech Stack
- **Next.js** (React Framework)
- **Tailwind CSS** for styling
- **Zustand** for state management
- **JSON Server** for mock API
- **Debounced Search** using a custom hook

---

## ⚙️ Setup Instructions
### Prerequisites
Make sure Node.js (v18+) is installed.

### Steps
```bash
git clone https://github.com/<your-username>/pixisphere-frontend.git
cd pixisphere-frontend
npm install
```

```
npm install -g json-server
json-server --watch db.json --port 3001
```

```
npm run dev
```

🧪 API Used

GET http://localhost:3001/photographers

Mock data available in db.json.

🧩 Notes on Logic

Debounce prevents multiple re-renders while typing.

Zustand used for global state (sharing photographer data).

Fully responsive UI, mobile-first design.

🧠 Author

Saurav — Full Stack Developer
📧 jhasaurav593@gmail.com


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
