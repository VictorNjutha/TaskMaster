# TaskMaster App

TaskMaster is a comprehensive task management system designed to streamline and optimize task tracking, assignment, and completion within organizations. The application provides a user-friendly interface and robust features to facilitate efficient communication and collaboration among team members.

## Features

### Frontend (React)

- **User Registration and Authentication:**
  - Users can register and login securely using their username and password.
  - Client-side validation ensures data integrity and security.
  
- **Dashboard Overview:**
  - Upon successful login, users are presented with an overview dashboard displaying task lists, deadlines, and progress.
  - Basic statistics such as total tasks completed, overdue tasks, and upcoming deadlines are included.
  
- **Task Lists:**
  - Users can create, view, edit, and delete task lists, organizing tasks by project, priority, or due date.
  - Drag-and-drop functionality allows easy task list reordering.

- **Task Creation and Assignment:**
  - Forms are provided for creating new tasks with options for title, description, due date, priority, and assignment.
  - Autocomplete suggestions facilitate task assignment based on user input.

- **Task Details and Comments:**
  - Detailed information for each task, including description, due date, priority, and comments, is displayed.
  - Users can add comments to tasks, promoting communication and collaboration.

- **Progress Tracking:**
  - Visual indicators such as completion percentage and status labels help track task progress.
  - Users can mark tasks as complete, update status, and track changes over time.

- **Notification System:**
  - Notifications alert users of task assignments, deadline reminders, and updates.
  - Options for email notifications and in-app notifications are provided.

### Backend (Flask)

- **User Management:**
  - API endpoints handle user registration, login, and authentication securely using JWT.
  
- **Database Integration:**
  - PostgreSQL database stores user information, task data, and comments, managed using SQLAlchemy ORM.
  
- **Task Management API:**
  - CRUD endpoints manage tasks, task lists, and comments.
  
- **Pagination:**
  - Pagination is implemented for large datasets to improve performance and resource management.
  
- **Error Handling:**
  - Error-handling mechanisms ensure a smooth user experience with informative error messages.
  
- **Authentication Middleware:**
  - Middleware secures API endpoints and validates user authentication using JWT tokens.
  
- **Logging and Monitoring:**
  - Critical events are logged, and system health is monitored to identify and resolve issues proactively.
  
- **Security Measures:**
  - Data encryption, input validation, and role-based access control protect user data and prevent unauthorized access.

## Technologies Used

- **Frontend:** React
- **Backend:** Flask (Python)
- **Database:** PostgreSQL
- **ORM:** SQLAlchemy
- **Authentication:** JWT (JSON Web Tokens)

## Installation and Setup

1. Clone the repository:
git clone git@github.com:VictorNjutha/TaskMaster.git


2. Navigate to the project directory:
cd TaskMaster

3. Install dependencies for both frontend and backend:
cd frontend
npm install
cd ../backend
pip install -r requirements.txt


4. Set up PostgreSQL database:
- Create a new database and update the database URI in `config.py` file.

5. Run the backend server:

flask run


6. Run the frontend server:

cd ../frontend
npm start


7. Access the application at `http://localhost:3000` in your web browser.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
