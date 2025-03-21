# JKTech-Application

## Overview
I have developed a simple blog application where users can log in using Google authentication. Authenticated users can create, update, read, and delete their own posts. For testing, I have written unit test cases using Jest and implemented end-to-end testing with Cypress. Additionally, I have written a Dockerfile and a deployment script to deploy the service on AWS EKS. This project covers the complete application lifecycle, from development and testing to deployment.

## Features
- Users can log in only via Google authentication; the app redirects to the Google login screen on launch.
- After logging in, users are directed to the dashboard, where they can view all their posts.
- Users can create new posts.
- Users can edit their existing posts.
- Users can delete posts.
- Users won't be able to route to any url if logged out
- Users can log out anytime.

## Tools & Technologies

### Development
- React
- NestJs
- Material UI
- TypeOrm

### Database
- Postgres

### Testing
- Cypress
- Jest

## Installation and Setup

### Prerequisites
Ensure you have the following installed before proceeding:
- Node.js (LTS version recommended)
- A database setup (Update `.env.dev` accordingly)

### Steps to Set Up

1. **Clone the repository**  
   ```sh
   git clone https://github.com/MuskanSinghal-3028/JKTech-Application.git
   ```

2. **Navigate to the project directory**  
   ```sh
   cd JKTech-Application
   ```

3. **Checkout the develop branch**  
   ```sh
   git checkout develop
   ```

4. **Install dependencies**  
   ```sh
   npm install
   ```

5. **Register Your App in Google Cloud Console**

   1. **Sign in to Google Cloud Console:**  
      [Google Cloud Console](https://console.cloud.google.com/)
   2. **Create a New Project:**
      - Click the project dropdown and select **“New Project.”**
      - Name your project and click **“Create.”**
   3. **Enable Required APIs:**
      - Go to **APIs & Services → Library.**
      - Enable **OAuth 2.0 API** and any other APIs your app requires.
   4. **Configure OAuth Consent Screen:**
      - Go to **APIs & Services → OAuth consent screen.**
      - Select **External** on your app.
      - Fill in details and in the **Scopes** section, add "email", "profile" and "open-id". Click **Save and Continue.**
   5. **Create OAuth 2.0 Credentials:**
      - Go to **APIs & Services → Credentials.**
      - Click **“+ Create Credentials”** → Select **OAuth Client ID.**
      - Choose **Web Application** and configure authorized redirect URIs:
        ```
        http://localhost:5600/auth/google/callback
        ```
      - Click **Create** and download the `client_secret.json` file.

6. **Configure environment variables**  
   
   - Modify `.env.dev` to include database configuration.
   - Add the following variables:
     ```
     GOOGLE_CLIENT_ID=<your-client-id>
     GOOGLE_CLIENT_SECRET=<your-client-secret>
     GOOGLE_CALLBACK_URL=http://localhost:5600/auth/google/callback
     ```

7. **Start the application in production mode**  
   ```sh
   npm run start:prod
   ```

8. **Access API documentation via Swagger**  
   Open in your browser:
   ```bash
   <backend-url>/api
   ```
   (Replace `<backend-url>` with the actual backend URL.)

9. **Generate test data**  
   - Use the `/posts/generate-test-data` endpoint via Swagger.
   - Add your email (e.g., test@gmail.com) as a query parameter.
   - This will populate test data in your database.

### Testing

**Run unit tests for the backend service**  
```sh
npm run test:posts
```








