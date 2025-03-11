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
Navigate to the project directory

sh
Copy
Edit
cd JKTech-Application
Checkout the develop branch

sh
Copy
Edit
git checkout develop
Install dependencies

sh
Copy
Edit
npm install
Configure environment variables

Create a .env.dev file in the root directory.
Add the following environment variables:
env
Copy
Edit
GOOGLE_CLIENT_ID=907182114586-50hm44obj3s80iu1cnqokejovcu3bc4d.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_CALLBACK_URL=http://localhost:5600/auth/google/callback
Modify .env.dev to include database configuration.
Start the application in production mode

sh
Copy
Edit
npm run start:prod
Access API documentation via Swagger
Open in your browser:

bash
Copy
Edit
<backend-url>/api
(Replace <backend-url> with the actual backend URL.)

Generate test data

Use the /posts/generate-test-data endpoint via Swagger.
Add your email (e.g., test@gmail.com) as a query parameter.
This will populate test data in your database.
Notes
Ensure your database is properly configured before running the application.


Contact
For any queries or support, reach out to Muskan Singhal.

sql
Copy
Edit

Copy and paste this into your `README.md` file in your repository. Let me know if you need any changes! 🚀






