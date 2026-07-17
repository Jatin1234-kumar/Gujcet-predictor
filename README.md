# GUJCET College Predictor

## Table of Contents

*   [Project Overview](#project-overview)
*   [Features](#features)
*   [Technology Stack](#technology-stack)
*   [Project Structure](#project-structure)
*   [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Local Development](#local-development)
    *   [Building for Production](#building-for-production)
*   [Usage](#usage)
*   [Contributing](#contributing)
*   [License](#license)
*   [Contact](#contact)

---

## Project Overview

The GUJCET College Predictor is a web application designed to assist students in predicting potential college admissions based on their GUJCET (Gujarat Common Entrance Test) results. This tool aims to simplify the college selection process by providing insights into various colleges, courses, and admission possibilities, helping students make informed decisions about their higher education in Gujarat.

---

## Features

*   **Rank-Based Prediction**: Predict colleges and courses based on a student's GUJCET rank.
*   **Filtering Options**: Filter results by:
    *   College Name
    *   Branch/Course
    *   Admission Category (e.g., General, SC, ST, SEBC, EWS)
    *   Gender
    *   Home State/District (if applicable)
*   **User-Friendly Interface**: An intuitive and responsive interface built for ease of use.

---

## Technology Stack

This project leverages a modern and robust set of technologies for a high-performance and maintainable application.

*   **Frontend**:
    *   [**React**](https://react.dev/): A JavaScript library for building user interfaces.
    *   [**Vite**](https://vitejs.dev/): A fast frontend build tool.
    *   [**TanStack Router**](https://tanstack.com/router): A type-safe routing library for React.
    *   [**TanStack Query**](https://tanstack.com/query): Powerful asynchronous state management for React.
    *   [**Radix UI**](https://www.radix-ui.com/): A low-level UI component library for building accessible design systems.
    *   [**Tailwind CSS**](https://tailwindcss.com/): A utility-first CSS framework for rapid UI development.
*   **Language**:
    *   [**TypeScript**](https://www.typescriptlang.org/): A superset of JavaScript that adds static types.
*   **Tooling**:
    *   [**ESLint**](https://eslint.org/): For identifying and reporting on patterns in JavaScript code.
    *   [**Prettier**](https://prettier.io/): An opinionated code formatter.
    *   [**Bun**](https://bun.sh/): A fast, all-in-one JavaScript runtime (indicated by `bun.lock` and `bunfig.toml`).

---

## Project Structure

The project follows a standard React application structure with specific configurations for Vite and TanStack libraries.

```
Gujcet-predictor/
├── .github/                       # GitHub Actions workflows (if any)
├── src/                           # Main application source code
│   ├── assets/                    # Static assets like images
│   ├── components/                # Reusable React components
│   ├── hooks/                     # Custom React hooks
│   ├── lib/                       # Utility functions and configurations
│   ├── routes/                    # TanStack Router route definitions
│   ├── main.tsx                   # Main entry point of the React application
│   └── App.tsx                    # Root component
├── public/                        # Static files served directly by the web server
├── components.json                # Configuration for Radix UI components
├── eslint.config.js               # ESLint configuration
├── prettier.config.js             # Prettier configuration
├── bun.lockb                      # Bun lock file for dependencies
├── bunfig.toml                    # Bun configuration file
├── package.json                   # Project metadata and dependencies
├── tsconfig.json                  # TypeScript compiler configuration
└── vite.config.ts                 # Vite build configuration
└── README.md                      # This file
```

---

## Getting Started

Follow these instructions to set up and run the GUJCET College Predictor locally.

### Prerequisites

Ensure you have one of the following installed:

*   **Node.js**: Version 18 or above (comes with npm).
*   **Bun**: An all-in-one JavaScript runtime, package manager, bundler, and test runner.

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Jatin1234-kumar/Gujcet-predictor
    cd Gujcet-predictor
    ```
2.  **Install dependencies**:
    If using npm:
    ```bash
    npm install
    ```
    If using Bun:
    ```bash
    bun install
    ```

### Local Development

To run the application in development mode with hot-reloading:

If using npm:
```bash
npm run dev
```
If using Bun:
```bash
bun dev
```
The application will typically be accessible at [http://localhost:5173](http://localhost:5173) (Vite's default port).

### Building for Production

To create an optimized build of the application:

If using npm:
```bash
npm run build
```
If using Bun:
```bash
bun build
```
This will generate production-ready static files in the `dist` directory. You can preview the build using:

If using npm:
```bash
npm run preview
```
If using Bun:
```bash
bun preview
```

---

## Usage

Once the application is running, you can access the GUJCET College Predictor through your web browser.

1.  **Input your GUJCET Rank**: Enter your rank obtained in the GUJCET examination.
2.  **Apply Filters**: Use the provided filters to narrow down college and course options based on your preferences (e.g., specific branches, categories, or regions).
3.  **View Predictions**: The application will display a list of colleges and courses you are likely to be admitted to, along with relevant details.

---

## Contributing

We welcome contributions to improve the GUJCET College Predictor!

### Bug Reports & Feature Requests

*   **Bugs**: If you encounter any bugs, please open an issue on GitHub, providing a detailed description, steps to reproduce, and expected behavior.
*   **Features**: For new feature ideas or enhancements, open an issue to discuss your proposal.

### Code Contributions

1.  **Fork** the repository.
2.  **Create a new branch** for your changes:
    ```bash
    git checkout -b feature/your-feature-name
    # or
    git checkout -b bugfix/issue-description
    ```
3.  **Implement your changes**, ensuring they follow the project's code style.
4.  **Commit your changes** with clear and descriptive commit messages.
5.  **Push your branch** to your forked repository.
6.  **Open a Pull Request** against the `main` branch of this repository, detailing the purpose and scope of your changes.

### Code Style

This project enforces code style using ESLint and Prettier. Please ensure your code is formatted correctly before submitting a pull request.

To format your code:
```bash
npm run format # or bun format
```

To lint your code:
```bash
npm run lint # or bun lint
```

---

## License

This project is open-source.

---