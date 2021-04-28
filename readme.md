## About The System

The scope and feature of this project are as follows:

- Backend: NodeJS
- API: JWT
- User/Admin authentication
- Add a new user
- Edit a user
- Delete a user
- View list of all users in the system 
- Allow multiple users to be removed  

Post deployment intructions:

- cp .env.example .env (setup your environment)
- npm install
- node install.js (this will create or drop the tables and seed user and admin)
- npm start

Please use the default credentials from the seeder:

**Admin Credentials**
- username: admin
- password: password

**User Credentials**
- username: user
- password: password