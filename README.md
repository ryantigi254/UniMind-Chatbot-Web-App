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
*   [Backend Integration](#link-backend-integration)
*   [Troubleshooting](#wrench-troubleshooting)
*   [Relationship to Other Projects](#link-relationship-to-other-projects)
*   [License](#memo-license)

## :rocket: Overview

UniMind Web provides a user-friendly interface built with React and Supabase. Users can sign in anonymously (with hCaptcha verification) or create an account to access personalized features. The settings page allows customization of appearance, account details, and chat behavior personalization. The core chat functionality connects to the Rasa backend for NLU and dialogue management.

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
    *   `npm` or `yarn`
    *   Git
    *   Python 3.8+ (for backend)
    *   pip (Python package manager)

2.  **Clone the Repository**:
    ```bash
    git clone git@github.com:ryantigi254/UniMind.git
    cd unimind
    ```

3.  **Install Frontend Dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

4.  **Set Up Environment Variables**:
    *   Create a file named `.env` in the root of the project.
    *   Add the following variables, replacing the placeholder values with your actual credentials:
        ```dotenv
        # Supabase Configuration
        VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
        VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
        
        # CAPTCHA Configuration
        VITE_RECAPTCHA_SITE_KEY=YOUR_HCAPTCHA_SITE_KEY
        
        # Backend API Configuration
        VITE_API_URL=http://localhost:8000  # Default backend URL
        ```
    *   You can find your Supabase URL and Anon Key in your Supabase project settings under "API".
    *   You can find your hCaptcha Site Key in your hCaptcha dashboard.

## :arrow_forward: Running the Application

1.  **Start the Frontend Development Server**:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The frontend will be available at `http://localhost:4000`

## :link: Backend Integration

1. **Clone and Setup the Backend**:
   ```bash
   # In a separate directory
   git clone https://github.com/ryantigi254/AI-Mental-Health-Chatbot.git
   cd AI-Mental-Health-Chatbot
   ```

2. **Install Backend Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure Backend CORS**:
   Make sure your backend's CORS settings allow requests from the frontend. In your FastAPI backend, add:
   ```python
   from fastapi import FastAPI
   from fastapi.middleware.cors import CORSMiddleware

   app = FastAPI()

   app.add_middleware(
       CORSMiddleware,
       allow_origins=["http://localhost:4000"],
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

4. **Start the Backend Server**:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```
   The backend will be available at `http://localhost:8000`

## :wrench: Troubleshooting

### Common Issues

1. **CORS Errors**:
   - If you see CORS errors in the browser console, ensure:
     - The backend server is running
     - CORS is properly configured in the backend
     - The frontend is using the correct backend URL in `.env`

2. **Connection Issues**:
   - Verify both frontend and backend servers are running
   - Check the `VITE_API_URL` in your `.env` file matches your backend URL
   - Ensure no firewall is blocking the connections

3. **Environment Variables**:
   - If you see errors about missing environment variables:
     - Check that `.env` file exists in the project root
     - Verify all required variables are set
     - Restart the development server after updating `.env`

4. **Backend Connection**:
   - If the chat functionality isn't working:
     - Check the backend server logs for errors
     - Verify the backend is running on the correct port
     - Test the backend API endpoints directly using tools like Postman

## :link: Relationship to Other Projects

*   **Backend:** This web application is designed to interact with the [AI-Mental-Health-Chatbot](https://github.com/ryantigi254/AI-Mental-Health-Chatbot) (Rasa) project, which handles the core conversational AI logic.
*   **Native App:** It serves a similar purpose to the [Mental-Health-Chatbot-App](https://github.com/ryantigi254/Mental-Health-Chatbot-App) but is web-based and relies on cloud services (Supabase, netlify) rather than running entirely on-device.
