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

    serialize_rules=('-_password_hash',)

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
        if new_email in emails:
            raise ValueError("Email already in use")
        else:
            return new_email





