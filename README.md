# CS 222 - Team 55
## Group Members
- Kaiwen Ren
- Zhilan Wang
- Xuanzhen Chang
- Xiangcan Li

## Library Management System

Our library management system is designed to make libraries run better and give users a better experience. It allows librarians and members to manage and search for books easily.

## Functionality
The system has the following functionalities:

### For Librarians:
- Add/Remove books
- Renew books
- Return books
- Rate books and write reviews
- Search books

### For General Members:
- Renew books
- Return books
- Rate books and write reviews
- Search books

## Architecture
![alt text](https://github.com/niconicoo0w0/cs222_team55/blob/e619e3754723b0c503495f4fc2644b34edd404ab/revised_libraryApp/librarySystemArchitecture.png)

## Components
### Frontend: 
JavaScript & React.js. These technologies will be used to build a user-friendly
interface that makes it easy for librarians to manage their collections and users.
### Backend: 
Java. This language will be used to build a scalable and secure architecture that
will support the needs of libraries of all sizes.
### Database: 
MongoDB. This NoSQL database will be used to store the library's information
in a decentralized manner, making it possible for librarians to access their data from any
location. There will be two tables in our database.

One database is called  It stores books in the library and has the following information:
- Unique ID
- Title
- Author
- Count (The number of the book)
- Publication Date
- Rating
- Review

## How to use

### Prerequisites:
- Node.js
- npm

### Installation:
- Download the project files
- Open the terminal in the root directory of the project
- Execute the following commands in the terminal:
  - npm install
  - npm install -g @vue/cli
  - chmod 777 /path/to/vue-cli-service
  - npm run serve
  
### Note:
- It is important to make sure that Node.js and npm are installed before proceeding with the installation process.
- This project was developed using VSCode, but it can also be run using other code editors or IDEs.
- The "npm install" command installs all the necessary dependencies required to run the project.
- The "npm install -g @vue/cli" command installs the Vue CLI globally, which is required for running the project.
- The "chmod 777 /path/to/vue-cli-service" command grants the necessary permissions for running the Vue CLI service.
- The "npm run serve" command runs the project on a local server.


After successfully executing the above commands, the project should be up and running on a local server, and can be accessed through a web browser. If any issues arise during the installation process, please refer to the troubleshooting guide or contact the development team for assistance.

## Work Distribution: 
- Xuanzhen Chang: built up backend service (BookService.java, UserService.java)
- Kaiwen Ren: built up user controller and entity (UserController.java, Result.java)
- Zhilan Wang: built up book controller and a part of frontend (BookController.java, Home.vue)
- Xiangcan Li: built up the rest part of the frontend (rest files in the frontend)
