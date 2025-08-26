
# Daily Diet App

![Project Cover](./src/assets/logo.png) 

A mobile application for daily diet tracking, allowing users to log and manage their meals, staying focused on their health goals.

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Application](#-running-the-application)
- [Tests](#-tests)
- [License](#-license)

---

## 🚀 About the Project

**Daily Diet** is an application developed in React Native with Expo, focused on helping users keep a record of their daily meals. The goal is to provide a simple and intuitive interface to add, edit, and view meals, as well as offering statistics on diet progress.

---

## ✨ Features

- **Meal Logging:** Add new meals with a name, description, date, time, and status (within or outside the diet).
- **Meal Listing:** View all meals grouped by date.
- **Meal Details:** See the complete details of a specific meal.
- **Editing and Deletion:** Modify or remove already registered meals.
- **Statistics:** Track your progress with detailed statistics, such as the percentage of meals within the diet.
- **Visual Feedback:** Receive immediate visual feedback when logging a meal, indicating if it aligns with your goals.

---

## 🛠️ Technologies Used

This project was built using the following technologies:

- **[React Native](https://reactnative.dev/)** - A framework for cross-platform mobile app development.
- **[Expo](https://expo.dev/)** - A platform and toolset for building and deploying React Native applications.
- **[TypeScript](https://www.typescriptlang.org/)** - A superset of JavaScript that adds static typing.
- **[Styled Components](https://styled-components.com/)** - A library for styling components with CSS-in-JS.
- **[React Navigation](https://reactnavigation.org/)** - A routing and navigation solution for React Native applications.
- **[Async Storage](https://react-native-async-storage.github.io/async-storage/)** - Local persistent data storage.
- **[Jest](https://jestjs.io/) & [React Native Testing Library](https://testing-library.com/docs/react-native-testing-library/intro/)** - Tools for unit and component testing.
- **[Phosphor Icons](https://phosphoricons.com/)** - A flexible icon library.

---

## 🏁 Getting Started

Follow the steps below to set up and run the project in your local development environment.

### Prerequisites

Before you begin, you will need to have the following installed on your machine:
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

You can install the Expo CLI globally with the following command:
```bash
npm install -g expo-cli
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://YOUR_GIT_USERNAME/dailyDiet.git
   ```
2. Navigate to the project directory:
   ```bash
   cd dailyDiet
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

---

## ▶️ Running the Application

After installing the dependencies, you can start the Expo development server:

```bash
npm start
```

This will open the Expo Dev Tools in your browser. You can then use the Expo Go app on your mobile device (Android or iOS) to scan the QR code and run the application.

You can also run it directly in an emulator/simulator:

- **For Android:**
  ```bash
  npm run android
  ```
- **For iOS:**
  ```bash
  npm run ios
  ```

---

## ✅ Tests

To run the tests defined for the project, execute the following command in the project root:

```bash
npm test
```

To run the tests in watch mode, which re-runs the tests on every file change:

```bash
npm run test:watch
```

To generate a test coverage report:
```bash
npm run test:coverage
```

---

Made with ❤️ by Guilherme Mendes
