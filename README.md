# CoreMentor

## 📖 Project Description
**CoreMentor** is a cross-platform (Web and Mobile) application designed to connect aspiring developers with mentors and technology experts. Built with a minimalist and modern approach using the *Liquid Glass* style, it aims to deliver an optimal user experience for continuous learning and code evolution.

## 🏗️ Architecture (MVVM)
The project strictly follows the **Model-View-ViewModel (MVVM)** pattern to ensure clean, modular, and scalable code with a clear separation of concerns:
*   **Model (`src/Models/`):** Defines data structures and direct backend interactions.
*   **ViewModel (`src/ViewModels/`):** Manages application state, handles API calls, and prepares data for the view.
*   **View (`src/Views/`):** Reactive user interface screens and components focused purely on rendering UI and capturing user interactions.

## ✨ Features
*   **Secure Authentication:** Real-time user login and registration system.
*   **Mentorship Dashboard:** Clear overview of upcoming scheduled sessions (topic, mentor, date, and time).
*   **User Roles:** Role-specific workflows depending on whether the account belongs to a *Mentor* or a *Mentee*.
*   **Mentor Discovery (Coming Soon):** Search experts by tech stack and availability.
*   **Communication System (Coming Soon):** Internal chat and video call links for mentorship sessions.

## 💻 Tech Stack & Languages
The entire CoreMentor ecosystem is built on a modern stack centered around JavaScript and cloud services:
*   **Primary Language:** 🟨 JavaScript (ES6+)
*   **Frontend Web & Mobile:** ⚛️ React Native managed with Expo.
*   **Backend, Database & APIs:** ⚡ Supabase (PostgreSQL relational database, Authentication, and auto-generated REST APIs).
*   **Styling & UI:** 💎 Glassmorphism effects (via `expo-blur`).
*   **Typography & Icons:** Google Fonts (Poppins family via `@expo-google-fonts/poppins`) and Material Icons (via `@expo/vector-icons`).

## 👥 Development Team

| Name | Primary Role |
| :--- | :--- |
| **Juan Moreno** | Lead Developer & Software Architect |
| **Oswaldo Oseguera** | UI/UX Designer & Frontend Engineer |
| **** | |

## 🛠️ How to Clone & Install the Project

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/core-mentor.git](https://github.com/your-username/core-mentor.git)

# INIT EXPO PROJECT 

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
