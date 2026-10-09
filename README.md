# CoreMentor

## Project Description
**CoreMentor** is a cross-platform (Web and Mobile) application designed to connect aspiring developers with mentors and technology experts. Built with a minimalist and modern approach using the *Liquid Glass* style, it aims to deliver an optimal user experience for continuous learning and code evolution.

## Architecture (MVVM)
The project strictly follows the **Model-View-ViewModel (MVVM)** pattern to ensure clean, modular, and scalable code with a clear separation of concerns:
*   **Model (`src/Models/`):** Defines data structures and direct backend interactions.
*   **ViewModel (`src/ViewModels/`):** Manages application state, handles API calls, and prepares data for the view.
*   **View (`src/Views/`):** Reactive user interface screens and components focused purely on rendering UI and capturing user interactions.

## 🛠️ Technologies Used
| Technology / Tool | Purpose / Usage |
| :--- | :--- |
| **React Native & Expo** | Frontend framework for building the universal (Web & Mobile) application. |
| **Supabase** | Backend-as-a-Service (BaaS) providing PostgreSQL database, Authentication, and Row Level Security (RLS). |
| **Jitsi Meet API** | External API integration for secure, ad-free, 1-on-1 private video calls. |
| **Vercel** | Cloud platform for continuous deployment and hosting of the web version. |
| **Expo Blur & Animations** | UI/UX implementation to achieve the modern *Liquid Glass* (Glassmorphism) effect and smooth transitions. |
| **CSS Grid / Flexbox** | Responsive grid layouts to adapt perfectly across mobile, tablet, and desktop screens. |

## 🚀 Features & What You Can Do
| Feature | Description |
| :--- | :--- |
| 🔐 **Role-based Authentication** | Secure sign-up/login flow routing users to specific workspaces based on their role: *Student* or *Mentor*. |
| 👨‍🏫 **Mentor Dashboard** | Exclusive panel where mentors can manage the subjects they teach, their schedule, and view upcoming student bookings. |
| 🔍 **Mentor Discovery** | Students can browse a dynamic grid of available mentors, filtering by technology, language, or specialty. |
| 📅 **Session Booking** | Students can select a mentor, choose a topic, and schedule a 20-minute 1-on-1 advisory session seamlessly. |
| 🎥 **Integrated Video Calls** | Direct access to Jitsi-powered private video rooms right from the dashboard, auto-filled with user credentials. |
| ✨ **Liquid Glass UI** | A highly responsive and modern interface featuring hover effects, smooth enter animations, and glassmorphism. |

## Development Team
| Name | Primary Role |
| :--- | :--- |
| **Juan Moreno** | Lead Developer & Software Architect |
| **Oswaldo Oseguera** | UI/UX Designer & Frontend Engineer |

## How to Clone & Install the Project

1. **Clone the repository:**
   
```bash
   git clone [https://github.com/juanitoelorigi/Web-Mentorias.git](https://github.com/juanitoelorigi/Web-Mentorias.git)

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
