# 🤖 AI Meeting Notes Summarizer

This is a full-stack application that leverages AI to summarize meeting transcripts based on custom instructions. The generated summaries can be edited and shared directly via email.

**Live Demo:** [Add your Vercel deployment link here]

---

## Features

-   **Upload Transcript**: Paste any text-based meeting or call transcript.
-   **Custom Prompts**: Provide a specific instruction for the AI (e.g., "Summarize for executives," "List all action items").
-   **AI-Powered Summarization**: Uses the Groq API with Llama 3 for near-instant summary generation.
-   **Editable Output**: The generated summary is fully editable in the browser.
-   **Email Sharing**: Share the final summary with multiple recipients directly from the app.

---

## Tech Stack

-   **Frontend**: React (with Vite)
-   **Backend**: Node.js Serverless Functions
-   **Deployment**: Vercel
-   **AI Service**: Groq API (Llama 3)
-   **Email Service**: Resend

---

## Local Development Setup

To get a local copy up and running, follow these detailed steps.

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/your-username/ai-meeting-summarizer.git](https://github.com/your-username/ai-meeting-summarizer.git)
    cd ai-meeting-summarizer
    ```

2.  **Install Dependencies**

    This command reads your `package.json` file and downloads all the necessary code libraries (like React, Vercel, and Axios) into the `node_modules` folder.
    ```bash
    npm install
    ```

3.  **Set Up Environment Variables**

    This is the crucial step where you provide your secret API keys to the project securely. The recommended way is using the Vercel CLI.

    First, install the Vercel CLI globally if you haven't already:
    ```bash
    npm install -g vercel
    ```

    Next, run the following commands one by one. The CLI will prompt you to enter the value for each secret key.
    ```bash
    vercel env add GROQ_API_KEY
    vercel env add RESEND_API_KEY
    ```
    **Important**: When the command asks which environments to add the key to, press `a` to select **all three** (Development, Preview, and Production), then press `Enter`.

4.  **Run the Development Server**

    This command starts the local server so you can view your app in a web browser. You must use `vercel dev` to ensure both the frontend and backend API functions run correctly.
    ```bash
    vercel dev
    ```
    Your application will now be available at `http://localhost:3000`.

---

## Deployment

This project is configured for easy deployment on **Vercel**. Simply push your code to the `main` branch on GitHub, and Vercel will automatically build and deploy the application. The environment variables you set with `vercel env add` will be used automatically in production.