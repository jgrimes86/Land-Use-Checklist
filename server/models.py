from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    company = db.Column(db.Text)
    phone_number = db.Column(db.Text)
    email = db.Column(db.Text, nullable=False)
    _password_hash = db.Column(db.Text, nullable=False)

    tasks = db.relationship('Task', back_populates='user')
    roles = db.relationship('Role', back_populates='user')

    projects = association_proxy('roles', 'users')

    serialize_rules = ('-_password_hash', '-tasks', '-roles')

    def __repr__(self):
        return f"<User {self.id}: {self.name}>"

    @property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    @validates('email')
    def validate_email(self, key, new_email):
        emails = [user.email for user in User.query.all()]
        userWithEmail = User.query.filter_by(email=new_email).first()
        if (new_email in emails) and (userWithEmail.id != self.id):
            raise ValueError("Email already in use")
        else:
            return new_email


class Project(db.Model, SerializerMixin):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
    client = db.Column(db.Text)
    property_address = db.Column(db.Text)
    property_lot = db.Column(db.Text)
    property_block = db.Column(db.Text)
    municipality = db.Column(db.Text)
    county = db.Column(db.Text)
    state = db.Column(db.Text)

    tasks = db.relationship('Task', back_populates='project', cascade='all, delete-orphan')
    roles = db.relationship('Role', back_populates='project', cascade='all, delete-orphan')

    users = association_proxy('roles', 'projects')

    serialize_rules = ('-tasks', '-roles')

    def __repr__(self):
        return f'<Project {self.id}: {self.name}>'


class Role(db.Model, SerializerMixin):
    __tablename__ = 'roles'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))

    user = db.relationship('User', back_populates='roles')
    project = db.relationship('Project', back_populates='roles')

    serialize_rules = ('-user', '-project')


class Task(db.Model, SerializerMixin):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
    description = db.Column(db.Text)
    start_date = db.Column(db.Text)
    end_date = db.Column(db.Text)
    status = db.Column(db.Text)
    comments = db.Column(db.Text)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))

    user = db.relationship('User', back_populates='tasks')
    project = db.relationship('Project', back_populates='tasks')

    serialize_rules = ('-user', '-project')


