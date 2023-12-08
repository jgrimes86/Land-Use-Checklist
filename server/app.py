from flask import request, make_response, session
from flask_restful import Resource
from config import app, db, api

from models import User, Project, Role, Task

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Signup(Resource):
    def post(self):
        data = request.json
        try:
            user = User(
                name=data['name'], 
                company=data['company'], 
                phone_number=data['phoneNumber'],
                email=data['email'], 
                password_hash=data['password'])
        except ValueError as v_error:
            return make_response({"error": str(v_error)}, 400)
        
        db.session.add(user)
        db.session.commit()

        session['user_id'] = user.id
        return make_response(user.to_dict(), 202)

api.add_resource(Signup, '/signup')

class Login(Resource):
    def post(self):
        email = request.json['email']
        user = User.query.filter_by(email=email).first()

        password = request.json['password']

        if user.authenticate(password):
            session['user_id'] = user.id
            return make_response(user.to_dict(rules=('-roles', '-tasks')), 201)
        else:
            return make_response({"error": "Invalid username or password"}, 401)

api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return make_response('', 204)

api.add_resource(Logout, '/logout')

class CheckSession(Resource):
    def get(self):
        user = User.query.filter_by(id=session.get('user_id')).first()
        if user:
            return user.to_dict()
        else:
            return {'message': '401: Not Authorized'}, 401

api.add_resource(CheckSession, '/check_session')





class UserById(Resource):
    
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            data = request.json
            # userUpdate = {
            #     name: data['name'],
            #     company: data['company'],
            #     phone_number: data['phoneNumber'],
            #     email: data['email']
            # }
            # if data['newpassword']:
            #     if not user.authenticate(data['oldPassword']):
            #         return make_response({"error": "Incorrect password"}, 401)
            for attr in data:
                setattr(user, attr, data[attr])
            db.session.commit()
            return make_response(user.to_dict(), 200)
        else:
            return make_response({"error": "User not found"}, 404)

api.add_resource(UserById, '/users/<int:id>')

            # user = User(
            #     name=data['name'], 
            #     company=data['company'], 
            #     phone_number=data['phoneNumber'],
            #     email=data['email'], 
            #     password_hash=data['password'])




class UserProjects(Resource):
    
    def get(self, id):
        roles = Role.query.filter_by(user_id=id).all()
        if roles:
            projects = [role.project.to_dict(rules=('-roles', '-tasks')) for role in roles]
            return make_response(projects, 200)
        else:
            return make_response({"error": "User not found"}, 404)

api.add_resource(UserProjects, '/roles/users/<int:id>')



class UserTasks(Resource):

    def get(self, id):
        tasks = [task.to_dict(rules=('-project.roles', '-user')) for task in Task.query.filter_by(user_id=id).all()]
        if tasks:
            return make_response(tasks, 200)
        else:
            return make_response({"error": "User not found"}, 404)

api.add_resource(UserTasks, '/tasks/users/<int:id>')



class TasksById(Resource):

    def patch(self, id):
        task = Task.query.filter_by(id=id).first()
        if task:
            data = request.json
            for attr in data:
                setattr(task, attr, data[attr])
            db.session.commit()
            return make_response(task.to_dict(), 202)
        else:
            return make_response({"error": "Task not found"}, 404)

    def delete(self, id):
        task = Task.query.filter_by(id=id).first()
        if task:
            db.session.delete(task)
            db.session.commit()
            return make_response({}, 204)
        else:
            return make_response({"error": "Task not found"}, 404)


api.add_resource(TasksById, '/tasks/<int:id>')


class Projects(Resource):
    
    def post(self):
        data = request.json
        # try:
        newProject = Project(
            name = data["name"],
            client = data["client"],
            property_address = data["propertyAddress"],
            property_lot = data["propertyLot"],
            property_block = data["propertyBlock"],
            municipality = data["municipality"],
            county = data["county"],
            state = data["state"],
        )
        db.session.add(newProject)
        db.session.commit()
        return make_response(newProject.to_dict(), 202)
        # except:
        #     return make_response({"error": "Error saving project"}, 400)

api.add_resource(Projects, '/projects')

class ProjectsById(Resource):

    def get(self, id):
        project = Project.query.filter_by(id=id).first().to_dict()
        return make_response(project, 200)


api.add_resource(ProjectsById, '/projects/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

