# JKTech-Application

## Overview
JKTech-Application is a backend application built with Node.js. It integrates Google OAuth authentication and provides API endpoints, including a test data generation feature.

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

5. **Configure environment variables**  
   - Create a `.env.dev` file in the root directory.
   - Add the following environment variables:
     ```env
     GOOGLE_CLIENT_ID=907182114586-50hm44obj3s80iu1cnqokejovcu3bc4d.apps.googleusercontent.com
     GOOGLE_CLIENT_SECRET=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
     GOOGLE_CALLBACK_URL=http://localhost:5600/auth/google/callback
     ```
   - Modify `.env.dev` to include database configuration.

6. **Start the application in production mode**  
   ```sh
   npm run start:prod
   ```

7. **Access API documentation via Swagger**  
   Open in your browser:
   ```bash
   <backend-url>/api
   ```
   (Replace `<backend-url>` with the actual backend URL.)

8. **Generate test data**  
   - Use the `/posts/generate-test-data` endpoint via Swagger.
   - Add your email (e.g., test@gmail.com) as a query parameter.
   - This will populate test data in your database.

### Notes
Ensure your database is properly configured before running the application.

### Contact
For any queries or support, reach out to Muskan Singhal.






