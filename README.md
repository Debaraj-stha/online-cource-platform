# 🎓 Coursely – Frontend

**Coursely** is a modern **MERN-based online learning platform** that connects learners and instructors through an intuitive and feature-rich experience.  
Built with **React**, **TypeScript**, and **Tailwind CSS**, Coursely enables seamless course enrollment, learning progress tracking, payment integration, and instructor analytics.

👉 **Live Demo:** [https://www.devrajstha.com.np](https://www.devrajstha.com.np)  
👉 **Backend Repo:** [Coursely Backend](https://github.com/Debaraj-stha/online-cource-platform-backend.git)

---

## 🚀 Key Features

### 👨‍🎓 Student Dashboard
- 🎯 Enroll in courses
- 📈 Track course progress
- ⭐ Review, like/dislike, or report a course
- 🔍 Search, filter, and sort courses easily
- 💎 Explore **popular** and **highest-rated** courses
- 💰 Pay via:
  - **eSewa**
  - **Khalti**
  - **Bank Transfer**

### 👨‍🏫 Instructor Dashboard
- ✅ Approve or reject course reviews
- 📂 Upload course videos and document resources via **Supabase**
- 📊 View analytics:
  - Student enrollments
  - Yearly earnings graph
  - Course ratings and engagement stats

### 🌍 Multilingual Support
Coursely supports multiple languages:
- English 🇬🇧  
- Nepali 🇳🇵  
- Hindi 🇮🇳  
- French 🇫🇷  

The language data is managed inside the `locales/` directory.

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend Framework** | React (TypeScript) |
| **Styling** | Tailwind CSS + Custom CSS |
| **State Management** | Redux Toolkit |
| **Routing** | React Router DOM |
| **Animations** | Framer Motion |
| **Data Visualization** | Recharts |
| **API Client** | Axios |
| **Authentication** | JSON Web Token (via backend) |
| **Video & File Storage** | Supabase |
| **Build Tool** | Vite |

---

## 📁 Folder Structure

```

coursely-frontend/
│
├── public/
│   ├── favicon.png
│   ├── favicon-32x32.png
│   ├── favicon-64x64.png
│   ├── preview.png
│   ├── share.html
│
├── src/
│   ├── @types/             # Custom TypeScript type definitions
│   ├── assets/             # Images, icons, logos, and other static assets
│   ├── components/         # Reusable UI components
│   ├── constants/          # Global constants (routes, configs, etc.)
│   ├── css/                # Custom CSS utilities and overrides
│   ├── locales/            # i18n files (English, Nepali, Hindi, French)
│   ├── pages/              # Page-level React components
│   ├── provider/           # Context and ThemeProvider setup
│   ├── store/              # Redux store, slices, and actions
│   ├── utils/              # Helper functions and API handlers
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── .env.example
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md

````

---

## ⚙️ Environment Variables

Create a `.env` file at the root of the project:

```env
VITE_BACKEND_URL=https://online-cource-platform-backend-7.onrender.com
VITE_SUPABASE_URL=https://hxbcyyumbdyzktaztjwr.supabase.co
VITE_SUPABASE_KEY=your_public_supabase_key
````

> ⚠️ Make sure the backend’s CORS configuration includes your frontend domain:
> `https://www.devrajstha.com.np`

---

## 🧠 Setup & Run Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Debaraj-stha/online-cource-platform.git
cd online-cource-platform
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Add environment variables

Create a `.env` file using the example above.

### 4️⃣ Start the development server

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🧩 State Management (Redux Toolkit)

Coursely uses **Redux Toolkit** to handle:

* Authentication & user state
* Courses, reviews, and filters
* Enrollments
* Instructor analytics

Reducers and actions live inside:

```
src/store/reducers/
```

---

## 🎨 Theme & Styling

* Styled with **Tailwind CSS** and a few custom styles in the `css/` folder.
* Theme switching handled by the `ThemeProvider` inside `src/provider/`.

---

## 🌐 Internationalization (i18n)

Coursely uses a locale-based structure to support multiple languages:

```
src/locales/
├── en.json
├── np.json
├── hi.json
└── fr.json
```

Language switching is dynamic and persisted via local storage.

---

## 💰 Payment Integration

Students can purchase paid courses using:

* eSewa
* Khalti
* Bank Transfer

Upon successful payment, the enrollment is verified and activated automatically.

---

## 📊 Instructor Analytics

Instructors can visualize:

* Enrollment trends
* Yearly earnings
* Course ratings and engagement
  All powered by **Recharts**.

---

## 🌐 Deployment

Deployed using:

* **Frontend:** Render (Static Hosting)
* **Backend:** Render (Node.js Server)
* **Database:** MongoDB Atlas
* **File Storage:** Supabase

---

## 🧑‍💻 Author

**👋 Devraj Shrestha**
🌐 [Portfolio](https://www.devrajstha.com.np)
💻 [GitHub](https://github.com/Debaraj-stha)
📧 [dstha221@gmail.com](mailto:dstha221@gmail.com)

---

## 🏁 License

This project is open-source under the **MIT License**.


