# UniMind
# UniMind - Mental Health Support Web Application

This project is the web application frontend for UniMind, a conversational AI system designed to provide mental wellbeing support and resource information. It offers users an interface to interact with the AI, manage their account, and personalize their experience. This application is part of the larger AI Group Project, which also includes a Rasa-based backend ([AI-Mental-Health-Chatbot](https://github.com/ryantigi254/AI-Mental-Health-Chatbot)) and an experimental native Swift app ([Mental-Health-Chatbot-App](https://github.com/ryantigi254/Mental-Health-Chatbot-App)).

## :bookmark_tabs: Table of Contents

*   [Overview](#rocket-overview)
*   [Key Features](#sparkles-key-features)
*   [Technology Stack](#computer-technology-stack)
*   [Project Structure](#file_folder-project-structure)
*   [Setup and Installation](#gear-setup-and-installation)
*   [Running the Application](#arrow_forward-running-the-application)
*   [Relationship to Other Projects](#link-relationship-to-other-projects)
*   [License](#memo-license)

## :rocket: Overview

UniMind Web provides a user-friendly interface built with React and Supabase. Users can sign in anonymously (with hCaptcha verification) or create an account to access personalized features. The settings page allows customization of appearance, account details, and chat behavior personalization. The core chat functionality (if integrated) would connect to the Rasa backend for NLU and dialogue management.

## :sparkles: Key Features

*   **User Authentication:** Supports anonymous sign-in, email/password registration/login via Supabase Auth.
*   **CAPTCHA Protection:** Uses hCaptcha to prevent abuse during anonymous sign-in.
*   **Settings Management:**
    *   **Appearance:** Light, Dark, System theme preferences.
    *   **Account:** Update email, password, phone number; Logout; Clear local data.
    *   **Personalization:** Enable/disable conversation memory, set user nickname, role, preferred bot traits, and other custom instructions.
*   **Responsive UI:** Built with React, Tailwind CSS, and NextUI components for a modern look and feel across devices.
*   **State Management:** Uses Zustand for efficient global state management.

## :computer: Technology Stack

*   **Frontend Framework:** React
*   **Language:** TypeScript
*   **Build Tool:** Vite
*   **UI Library:** NextUI
*   **Styling:** Tailwind CSS
*   **State Management:** Zustand
*   **Backend Service (BaaS):** Supabase (Auth, potentially Database)
*   **Icons:** Lucide React
*   **CAPTCHA:** hCaptcha (@hcaptcha/react-hcaptcha)
*   **Routing:** React Router DOM

## :file_folder: Project Structure
```
├── public/ # Static assets
├── src/
│ ├── components/ # Reusable UI components (e.g., modals)
│ ├── lib/ # Utility functions, Supabase client initialization
│ ├── pages/ # Page components (AuthPage, SettingsPage, etc.)
│ ├── store/ # Zustand store definition
│ ├── App.tsx # Main application component with routing
│ ├── main.tsx # Application entry point
│ └── index.css # Global styles, Tailwind directives
├── .env # Environment variables (Supabase keys, hCaptcha key) - DO NOT COMMIT anon key
├── .gitignore # Files/directories ignored by Git
├── index.html # Vite entry HTML
├── package.json # Project metadata and dependencies
├── tsconfig.json # TypeScript configuration
├── tailwind.config.js # Tailwind CSS configuration
├── postcss.config.js # PostCSS configuration
└── README.md # This file
```

## :gear: Setup and Installation

1.  **Prerequisites**:
    *   Node.js (LTS version recommended, e.g., v18 or v20)
    *   Python 3 (for creating the local virtual environment)
    *   `npm` or `yarn`
    *   Git

2.  **Clone the Repository**:
    ```bash
    git clone git@github.com:ryantigi254/UniMind.git
    cd unimind
    ```

3.  **Create and Activate the Virtual Environment**:
    ```bash
    python3 -m venv .venv
    source .venv/bin/activate
    ```
    Run all project commands from an activated `.venv` shell.

4.  **Install Dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

5.  **Set Up Environment Variables**:
    *   Create a file named `.env` in the root of the project.
    *   Add the following variables, replacing the placeholder values with your actual Supabase and hCaptcha credentials:
        ```dotenv
        VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
        VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
        VITE_RECAPTCHA_SITE_KEY=YOUR_HCAPTCHA_SITE_KEY
        ```
    *   You can find your Supabase URL and Anon Key in your Supabase project settings under "API".
    *   You can find your hCaptcha Site Key in your hCaptcha dashboard.

## :arrow_forward: Running the Application

1.  **Activate the Virtual Environment** (every new terminal session):
    ```bash
    source .venv/bin/activate
    ```
2.  **Start the Development Server**:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
3.  Open your browser and navigate to the local URL provided by Vite (usually `http://localhost:5173`).

## :link: Relationship to Other Projects

*   **Backend:** This web application is designed to potentially interact with the [AI-Mental-Health-Chatbot](https://github.com/ryantigi254/AI-Mental-Health-Chatbot) (Rasa) project, which would handle the core conversational AI logic.
*   **Native App:** It serves a similar purpose to the [Mental-Health-Chatbot-App](https://github.com/ryantigi254/Mental-Health-Chatbot-App) but is web-based and relies on cloud services (Supabase, netlify) rather than running entirely on-device.
