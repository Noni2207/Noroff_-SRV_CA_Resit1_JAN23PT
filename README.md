# Noroff_-SRV_CA_Resit1_JAN23PT

## Hosted Application
You can find the app hosted on Render at the following link:
[Noroff_-SRV_CA_Resit1_JAN23PT](https://noroff-srv-ca-resit1-jan23pt.onrender.com/)


## Features
**User Management**
 - Register new users.
 - Activate or deactivate existing users.
 - Retrieve user information.
**Picture Management**
 - Upload pictures for users.
 - Fetch all or visible pictures for a user.
 - Update the visibility and description of uploaded pictures.

## Technologies Used
 - Node.js - Backend runtime.
 - Express.js - Web framework for building REST APIs.
 - Multer - Middleware for file uploads.
 - Jest - Testing framework for API testing.

 ## Setup Instructions

1. **Clone this repository**:
   ```bash
   git clone https://github.com/Noni2207/Noroff_-SRV_CA_Resit1_JAN23PT

**Install Dependencies:**
Run the following command to install the project dependencies:
   ---npm install


**Run the application:**
npm start


**Run test:**
npm test


**API Endpoints:**
Users

GET /users/:email - Retrieves user details by email.

PUT /users - Activates or deactivates a user.

Pictures

POST /pictures/:email - Uploads a picture for a user.

GET /pictures/:email - Fetches all pictures for a user.

GET /pictures/visible/:email - Fetches visible pictures for a user.

PUT /pictures/visibility - Updates the visibility of a picture.

PUT /pictures/description - Updates the description of a picture.
