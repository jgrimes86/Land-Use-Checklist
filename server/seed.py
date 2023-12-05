from app import app
from models import db, User

with app.app_context():
    print("Starting seed...")

    User.query.delete()

    u1 = User(name="Frank", company="ACME, Inc.", phone_number="555-5555", email="frank@email.com", password_hash="123")

    db.session.add_all([u1])
    db.session.commit()

# name, company, phone number, email, password

        