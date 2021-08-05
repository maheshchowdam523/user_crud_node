# User CRUD node

This project is about performing CRUD (create, read, update, delete) operations with images using Nodejs, Express, Multer and MongoDB. This project used [Cloudinary](https://cloudinary.com/) to store the images.
The image id is stored on user object and maintaining relation between mongo and Cloudinary

### Prerequisites 
1. NodeJs
2. Mongo DB
3. Cloudinary account
4. Any API testing application (Postman/ ThunderClient on VSCode)

### Steps to run the application
1. Run `npm install` on the project directory
2. Add `.env` file and add the fields from `.env.sample`
3. Run `npm start`
4. Access the application at `http://localhost:8080` - Port can be changed based on your `.env` properties.

