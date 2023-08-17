## CoderManagement

CoderManagement is a platform that helps individuals and teams manage their tasks.
These are more than just simple to-do lists. Task management tools allow teams to collaborate digitally by organizing, prioritizing, and assigning tasks to each other.

## ERD

### Features

You are the only manager who assigns task
Your team members are an employee
Your team members could sign up for an account with their name and become employees by default
You will create, assign and delete tasks to other users
A user may have one, many, or no task he/she is responsible for.
A task may have one or no one asign to it yet
Right now, you are the only user of this project, so no authentication is needed

### Description
Everyone who uses the app is a user. There are 2 roles for user: employee and manager
You are the user that has higher authority in the company ( later could be other managers).
This hierarchy of roles allows us to limit access to certain features in the application that only the manager has permission.

However, at this stage, you just want to warm up your coding skills and make the most straightforward version as fast as possible.

End points requirements
For now, your account will be created through Compass with the role: manager

Design your routes so that from a client app, you can:

### User
- Create a new user with user's name. The default role is employee.
- Get all users with filters. You can decide yourself which queries you allow in the request based on the User schema.
- Search for an employee by name
- Get all tasks of 1 user (Decide which one is better: by name or by id?)

### Task
- Create a task with the required information.
- Browse your tasks with filter allowance (name, status, createdAt,…). The following attributes are required to help filtering tasks by status, and help sorting by createdAt, updatedAt status createdAt,updatedAt
- Get a single task by id.
- Assign a task to a user or unassign them
- Update the status of a task.
There's a rule for updating task status: when the status is set to done, it can't be changed to other value except archive

- Soft delete a task.

#### Express-validator and apply further API request input control:

Create user request must check body for : existence, including name , name's value is a valid string.
Create task request must check body for : existence, and other requirements per task schema.
All routes that require _id , must be checked for its existence and whether it is a mongo object id.

#### User Schema:

User is created by name, so there must be a nam field in User schema. This is mandatory (required)
User has two roles: manager and employee => a role field in User with String type and we need enum validator for its value. more
The enum validator is an array that will check if the value given is an item in the array. If the value is not in the array, Mongoose will throw an error.

#### Task Schema:

A task should contain the field name and description for the basic information. Can a task have no name and no description? For now, let's make them mandatory.

The task status is tricky. Let's say you have decided there are 5 types of values for the status field: pending, working, review, done, archive.

pending: work not started
working: is working on it
review: waiting for review result
done : review is finished with satisfaction
archive: package as references for future
Key note from requirements

A user may have one, many, or no task he/she is responsible for.
A task may have one or no one asign to it yet

<h1 align="center">Hi 👋, I'm Kim</h1>
<h3 align="center">A passionate learner from Vietnam</h3>

- 🌱 I’m currently learning **typescript, python**

- 💬 Ask me about **javascript, react**

- 📫 How to reach me **tranhoangbichkim@gmail.com**

<h3 align="left">Connect with me:</h3>
<p align="left">
</p>

<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://aws.amazon.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="aws" width="40" height="40"/> </a> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://www.figma.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg" alt="figma" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://www.microsoft.com/en-us/sql-server" target="_blank" rel="noreferrer"> <img src="https://www.svgrepo.com/show/303229/microsoft-sql-server-logo.svg" alt="mssql" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://redux.js.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="redux" width="40" height="40"/> </a> <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> </p>

