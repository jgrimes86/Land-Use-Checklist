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

api.add_resource(Signup, '/api/v1/signup')

class Login(Resource):
    def post(self):
        email = request.json['email']
        user = User.query.filter_by(email=email).first()

        password = request.json['password']

        if user.authenticate(password):
            session['user_id'] = user.id
            return make_response(user.to_dict(), 201)
        else:
            return make_response({"error": "Invalid username or password"}, 401)

api.add_resource(Login, '/api/v1/login')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return make_response({}, 204)

api.add_resource(Logout, '/api/v1/logout')

class CheckSession(Resource):
    def get(self):
        user = User.query.filter_by(id=session.get('user_id')).first()
        if user:
            return make_response(user.to_dict(), 200)
        else:
            return make_response({'message': '401: Not Authorized'}, 401)

api.add_resource(CheckSession, '/api/v1/check_session')

class ChangePassword(Resource):

    def patch(self, id):

        if id != session.get('user_id'):
            return make_response({"error":"Unauthorized user"}, 401)

        data = request.json
        user = User.query.filter_by(id=id).first()
        if user.authenticate(data['oldPassword']):
            try:
                user.password_hash = data['newPassword']
                db.session.commit()
                return make_response({"message": "Password Changed"}, 201)
            except:
                return make_response({"error": "Unable to change password"}, 400)
        else:
            return make_response({"error": "Unauthorized. Incorrect password."}, 401)

api.add_resource(ChangePassword, '/api/v1/users/<int:id>/change-password')



class Users(Resource):
    
    def get(self):
        try:
            users = [user.to_dict() for user in User.query.all()]
            return make_response(users, 200)
        except:
            make_response ({"error": "Unable to retrieve data"}, 500)

api.add_resource(Users, '/api/v1/users')

class UsersById(Resource):
    
    def patch(self, id):
        if id != session.get('user_id'):
            return make_response({"error":"Unauthorized user"}, 401)
        user = User.query.filter_by(id=id).first()
        if user:
            try:
                data = request.json
                for attr in data:
                    setattr(user, attr, data[attr])
                db.session.commit()
                return make_response(user.to_dict(), 200)
            except ValueError as v_error:
                return make_response({"error": str(v_error)}, 400)
        else:
            return make_response({"error": "User not found"}, 404)

api.add_resource(UsersById, '/api/v1/users/<int:id>')

class UserProjects(Resource):
    
    def get(self, id):
        projects = db.session.query(Project).join(Role, Project.id == Role.project_id).join(User, Role.user_id == User.id).filter(User.id == id).all()
        if projects:
            project_list = [project.to_dict() for project in projects]
            return make_response(project_list, 200)
        else:
            return make_response({"error": "User projects not found"}, 404)

api.add_resource(UserProjects, '/api/v1/users/<int:id>/projects')

class UserTasks(Resource):

    def get(self, id):
        tasks = Task.query.filter_by(user_id=id).all()
        if tasks:
            task_list =[task.to_dict(rules=('user.name', '-user.company', '-user.email', '-user.phone_number', '-user.tasks', 'project.name', '-project.client', '-project.county', '-project.municipality', '-project.property_address', '-project.property_block', '-project.property_lot', '-project.state')) for task in tasks]
            return make_response(task_list, 200)
        else:
            return make_response({"error": "User tasks not found"}, 404)

api.add_resource(UserTasks, '/api/v1/users/tasks/<int:id>')


class TasksById(Resource):

    def patch(self, id):
        task = Task.query.filter_by(id=id).first()
        if task:
            data = request.json
            for attr in data:
                setattr(task, attr, data[attr])
            db.session.commit()
            return make_response(task.to_dict(rules=('user.name', '-user.company', '-user.email', '-user.phone_number', '-user.tasks', 'project.name', '-project.client', '-project.county', '-project.municipality', '-project.property_address', '-project.property_block', '-project.property_lot', '-project.state')), 202)
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


api.add_resource(TasksById, '/api/v1/tasks/<int:id>')



class Projects(Resource):
    
    def post(self):
        data = request.json
        try:
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
        except ValueError as v_error:
            return make_response({"error": str(v_error)}, 404)
        except Exception as e:
            return make_response({"error": str(e)}, 500)

api.add_resource(Projects, '/api/v1/projects')

class ProjectsById(Resource):

    def get(self, id):
        if id == 0:
            return make_response({}, 204)
        
        project = Project.query.filter_by(id=id).first()
        if project:
            return make_response(project.to_dict(), 200)
        else:
            return make_response({"error": "Project not found."}, 404)

    def patch(self, id):
        project = Project.query.filter_by(id=id).first()
        if project:
            try:
                data = request.json
                for attr in data:
                    setattr(project, attr, data[attr])
                db.session.commit()
                return make_response(project.to_dict(), 202)
            except ValueError as v_error:
                return make_response({"error": str(v_error)}, 400)
        else:
            return make_response({"error": "Project not found"}, 404)

    def delete(self, id):
        project = Project.query.filter_by(id=id).first()
        if project:
            try:
                db.session.delete(project)
                db.session.commit()
                return make_response({}, 204)
            except:
                make_response({"error": "Unable to delete project"}, 500)
        else:
            return make_response({"error": "Project not found"}, 404)

api.add_resource(ProjectsById, '/api/v1/projects/<int:id>')

class ProjectTasks(Resource):

    def get(self, id):
        tasks = Task.query.filter_by(project_id=id).all()
        if tasks:
            task_list = [task.to_dict(rules=('user.name', '-user.company', '-user.email', '-user.phone_number', '-user.tasks', 'project.name', '-project.client', '-project.county', '-project.municipality', '-project.property_address', '-project.property_block', '-project.property_lot', '-project.state')) for task in tasks]
            return make_response(task_list, 200)
        else:
            return make_response({"error": "Poject tasks not found"}, 404)

    def post(self, id):
        data = request.json
        try:
            newTask = Task(
                name=data['name'],
                description=data['description'],
                start_date=data['start_date'],
                end_date=data['end_date'],
                status=data['status'],
                comments=data['comments'],
                user_id=data['user_id'],
                project_id=id
            )           
            db.session.add(newTask)
            db.session.commit()
            return make_response(newTask.to_dict(rules=('user.name', '-user.company', '-user.email', '-user.phone_number', '-user.tasks', 'project.name', '-project.client', '-project.county', '-project.municipality', '-project.property_address', '-project.property_block', '-project.property_lot', '-project.state')), 202)
        except ValueError as v_error:
            return make_response({"error": str(v_error)}, 404)
        except Exception as e:
            return make_response({"error": str(e)}, 500)

api.add_resource(ProjectTasks, '/api/v1/projects/<int:id>/tasks')

class ProjectRoles(Resource):
    
    def get(self, id):
        roles = Role.query.filter_by(project_id=id).all()
        if roles:
            roles_list = [role.to_dict(rules=('user.name', '-user.email', 
            '-user.company', '-user.phone_number', '-project_id',)) for role in roles]
            return make_response(roles_list, 200)
        else:
            return make_response({"error": "Unable to get project roles"}, 404)

api.add_resource(ProjectRoles, '/api/v1/projects/<int:id>/roles')

class ProjectTeam(Resource):

    def get(self, id):
        team = db.session.query(User).join(Role, User.id == Role.user_id).filter(Role.project_id == id).all()
        if team:
            team_list = [user.to_dict() for user in team]
            return make_response(team_list, 200)
        else:
            return make_response({"error": "Unable to get team members"}, 404)

api.add_resource(ProjectTeam, '/api/v1/projects/<int:id>/team-members')




class Roles(Resource):

    def post(self):
        data = request.json
        try:
            newRole = Role(
                name=data['role'],
                user_id=data['user_id'],
                project_id=data['project_id'],
            )
            db.session.add(newRole)
            db.session.commit()
            return make_response(newRole.to_dict(rules=('user.name', '-user.email', 
            '-user.company', '-user.phone_number', '-project_id',)), 202)
        except ValueError as v_error:
            return make_response({"error": str(v_error)}, 400)
        except:
            return make_response({"error": "Unable to create role"}, 500)

api.add_resource(Roles, '/api/v1/roles')

class RolesById(Resource):
    
    def patch(self, id):
        role = Role.query.filter_by(id=id).first()
        if role:
            try:
                params = request.json
                data = {
                    'name': params['name'],
                    'user_id': int(params['user_id'])
                }
                for attr in data:
                    setattr(role, attr, data[attr])
                db.session.commit()
                return make_response(role.to_dict(rules=('user.name', '-user.email', 
            '-user.company', '-user.phone_number', '-project_id',)), 202)
            except ValueError as v_error:
                return make_response({"error": str(v_error)}, 400)
            except:
                return make_response({"error": "Unable to change role"}, 500)
        else:
            return make_response({"error": "Role not found"}, 404)

    def delete(self, id):
        role = Role.query.filter_by(id=id).first()
        if role:
            try:
                db.session.delete(role)
                db.session.commit()
                return make_response({}, 204)
            except:
                return make_response({"error": "Unable to delete role"}, 500)
        else:
            return make_response({"error": "Role not found"}, 404)

api.add_resource(RolesById, '/api/v1/roles/<int:id>')



if __name__ == '__main__':
    app.run(port=5555, debug=True)

