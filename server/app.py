from flask import request, make_response
from flask_restful import Resource
from config import app, db, api


@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Signup(Resource):
    def post(self):
        data = request.json
        user = User(
            name=data['name'], 
            company=data['company'], 
            phone_number=data['phoneNumber']
            email=data['email'], 
            password_hash=data['password'])
        db.session.add(user)
        db.session.commit()
        return make_response(user.to_dict(), 200)

api.add_resource(Signup, '/signup')

class Login(Resource):
    def post(self):
        email = request.json['email']
        user = User.query.filter_by(email=email).first()

        password = request.json['password']

        if user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict()

        return make_response({"error": "Invalid username or password"}, 401)

api.add_resource(Login, '/login')

class Logout(Resource):
    def get(self):
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





if __name__ == '__main__':
    app.run(port=5555, debug=True)

