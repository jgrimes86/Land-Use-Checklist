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
        return make_response(user.to_dict(rules=('tasks', '-tasks.user', 'roles', '-roles.user')), 202)

api.add_resource(Signup, '/signup')

class Login(Resource):
    def post(self):
        email = request.json['email']
        user = User.query.filter_by(email=email).first()

        password = request.json['password']

        if user.authenticate(password):
            session['user_id'] = user.id
            return make_response(user.to_dict(rules=('tasks', '-tasks.user', 'roles', '-roles.user')), 201)
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
            return user.to_dict(rules=('tasks', '-tasks.user', 'roles', '-roles.user'))
        else:
            return {'message': '401: Not Authorized'}, 401

api.add_resource(CheckSession, '/check_session')




class Users(Resource):
    
    def get(self):
        users = [user.to_dict(rules=('tasks', '-tasks.user', 'roles', '-roles.user')) for user in User.query.all()]
        return make_response(users, 200)

api.add_resource(Users, '/users')

class UserById(Resource):
    
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            data = request.json
            for attr in data:
                setattr(user, attr, data[attr])
            db.session.commit()
            return make_response(user.to_dict(rules=('tasks', '-tasks.user', 'roles', '-roles.user')), 200)
        else:
            return make_response({"error": "User not found"}, 404)

api.add_resource(UserById, '/users/<int:id>')

class UserProjects(Resource):
    
    def get(self, id):
        roles = Role.query.filter_by(user_id=id).distinct()
        if roles:
            allProjects = [role.project.to_dict(rules=('tasks', '-tasks.project', 'roles', '-roles.project')) for role in roles]
            uniqueProjects = []
            [uniqueProjects.append(project) for project in allProjects if project not in uniqueProjects]
            return make_response(uniqueProjects, 200)
        else:
            return make_response({"error": "User not found"}, 404)

api.add_resource(UserProjects, '/users/roles/<int:id>')

class UserTasks(Resource):

    def get(self, id):
        tasks = [task.to_dict(rules=('user', '-user.tasks', 'project', '-project.tasks')) for task in Task.query.filter_by(user_id=id).all()]
        if tasks:
            return make_response(tasks, 200)
        else:
            return make_response({"error": "User not found"}, 404)

api.add_resource(UserTasks, '/users/tasks/<int:id>')



class TasksById(Resource):

    def patch(self, id):
        task = Task.query.filter_by(id=id).first()
        if task:
            data = request.json
            for attr in data:
                setattr(task, attr, data[attr])
            db.session.commit()
            return make_response(task.to_dict(rules=('user', '-user.tasks', 'project', '-project.tasks')), 202)
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

class TasksByProject(Resource):
    
    def get(self, id):
        tasks = [task.to_dict(rules=('user', '-user.tasks')) for task in Task.query.filter_by(project_id=id).all()]
        return make_response(tasks, 200)

api.add_resource(TasksByProject, '/projects/<int:id>/tasks')


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
        return make_response(newProject.to_dict(rules=('tasks', '-tasks.project', 'roles', '-roles.project')), 202)
        # except:
        #     return make_response({"error": "Error saving project"}, 400)

api.add_resource(Projects, '/projects')

class ProjectsById(Resource):

    def get(self, id):
        if id == 0:
            return make_response({}, 204)
        else:
            project = Project.query.filter_by(id=id).first().to_dict(rules=('tasks', '-tasks.project', 'roles', '-roles.project'))
            return make_response(project, 200)

    def patch(self, id):
        project = Project.query.filter_by(id=id).first()
        data = request.json
        for attr in data:
            setattr(project, attr, data[attr])
        db.session.commit()
        return make_response(project.to_dict(rules=('tasks', '-tasks.project', 'roles', '-roles.project')), 202)

api.add_resource(ProjectsById, '/projects/<int:id>')


class Roles(Resource):

    def post(self):
        data = request.json
        newRole = Role(
            name=data['role'],
            user_id=data['user_id'],
            project_id=data['project_id'],
        )
        db.session.add(newRole)
        db.session.commit()
        return make_response(newRole.to_dict(rules=('user', '-user.roles', 'project', '-project.roles')), 202)

api.add_resource(Roles, '/roles')

class RolesById(Resource):
    
    def patch(self, id):
        role = Role.query.filter_by(id=id).first()
        params = request.json
        data = {
            'name': params['name'],
            'user_id': int(params['user_id'])
        }
        for attr in data:
            setattr(role, attr, data[attr])
        db.session.commit()
        return make_response(role.to_dict(rules=('user', '-user.roles')), 202)

    def delete(self, id):
        role = Role.query.filter_by(id=id).first()
        if role:
            db.session.delete(role)
            db.session.commit()
            return make_response({}, 204)
        else:
            return make_response({"error": "Role not found"}, 404)

api.add_resource(RolesById, '/roles/<int:id>')

class RolesByProject(Resource):
    
    def get(self, id):
        roles = [role.to_dict(rules=('user', '-user.roles')) for role in Role.query.filter_by(project_id=id).all()]
        return make_response(roles, 200)

api.add_resource(RolesByProject, '/projects/<int:id>/roles')

class TeamMembers(Resource):

    def get(self, id):
        team = db.session.query(User).join(Role, User.id == Role.user_id).filter(Role.project_id == id).all()
        team_list = [user.to_dict() for user in team]
        return make_response(team_list, 200)

api.add_resource(TeamMembers, '/projects/<int:id>/team-members')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

