# The Land Use Checklist

The Land Use Checklist is an app that provides a convenient location to track the status of application requirements for land use and zoning applications.  When a user signs up or logs in to an existing account, they are brought to their home page, where they can see a list of all land use projects they are working on and a list of all tasks they have been assigned for those projects.  Users can create new projects, edit existing projects, add other users as team members for a project, and create or edit project tasks.

This is a full-stack application that was created as a final project for Flatiron School's software engineering course.  It makes use of a [Flask](https://flask.palletsprojects.com/en/2.3.x/) backend using [Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/en/3.0.x/) and [SQLite](https://sqlite.org/docs.html), and it has a [React](https://react.dev/) frontend that uses [Material UI](https://mui.com/material-ui/getting-started/) components for added functionality and styling.

## Instructions

If you would like to use this application, fork and clone this GitHub repository to your computer.  After making a local copy of the application, open the application directory in your preferred code editor or navigate to the application directory in your terminal, then run the following commands in your terminal to get everything up and running!

### Install and Start the Backend

1. In your terminal, install Python environment:
```
pipenv install
```

2. Enter the Python virtual environment and navigate to the server director:
```
pipenv shell
cd server
```

3. Create the database:
```
flask db init
flask db migrate
flask db upgrade head
```

4. There is a file with some starting data that you can use:
```
python seed.py
```

5. Start the backend server:
```
python app.py
```

### Install and Start the Frontend

1. In a second terminal, navigate into the client directory and install React components:
```
cd client
npm install
```

2. Start the frontend:
```
npm start
```

## Author

This application was created by [Jim Grimes](http://github.com/jgrimes86).