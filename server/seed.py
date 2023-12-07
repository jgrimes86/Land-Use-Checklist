from app import app
from models import db, User, Project, Role, Task

with app.app_context():
    print("Starting seed...")

    User.query.delete()

    u1 = User(name="Peter Brown, P.E.", company="ACME Engineering", phone_number="555-303-6080", email="peter@email.com", password_hash="123")
    u2 = User(name="Diana Bland, Esq.", company="Jones & Garfunkle LLC", phone_number="555-584-5537", email="diana@email.com", password_hash="456")
    u3 = User(name="Erica Woods, P.P.", company="Woods Planning, LLC", phone_number="555-896-1255", email="erica@email.com", password_hash="789")

    db.session.add_all([u1, u2, u3])
    db.session.commit()


    Project.query.delete()

    p1 = Project(name="Sunny Vineyards Use Variance and Site Plan", client="A&L Holdings, LLC", property_address="586 Maple Road, Skillman", property_lot="59", property_block="26002", municipality="Montgomery Township", county="Somerset", state="New Jersey")
    p2 = Project(name="Grace Figeuroa Conditional Use", client="Grace Figueroa", property_address="12 Washington Court", property_lot="35", property_block="19", municipality="Readington Township", county="Hunterdon", state="New Jersey")

    db.session.add_all([p1, p2])
    db.session.commit()


    Role.query.delete()

    r1 = Role(name="Attorney", user=u2, project=p1)
    r2 = Role(name="Engineer", user=u1, project=p1)
    r3 = Role(name="Planner", user=u3, project=p1)
    r4 = Role(name="Attorney", user=u2, project=p2)
    r5 = Role(name="Planner", user=u3, project=p2)

    db.session.add_all([r1, r2, r3, r4, r5])
    db.session.commit()


    Task.query.delete()

    t1 = Task(name="Environmental Impact Statement", description="EIC must be submitted which complies with Code §148-102(C)", start_date="January 8, 2024", end_date="February 5, 2024", status="open", user=u1, project=p1)
    t2 = Task(name="Soil Erosion and Sediment Control Plan", description="Proposals for soil erosion and sediment control as required by the Readington Township Soil Erosion and Sediment Control Ordinance, Code Chapter 197", start_date="January 8, 2024", end_date="February 5, 2024", status="open", comments="Topographic survey scheduled for Jan 4.", user=u1, project=p1)
    t3 = Task(name="Notice", description="Issue notice of application by publication in newspaper and by certified mail to surrounding property owners at least 10 days prior to hearing date", start_date="March 11, 2024", end_date="March 13, 2024", status="open", comments="Montgomery Township's official newspaper is the Courier News.  Notices must be submitted for publication 3 business days prior to date of publication.  Courier News does not publish print edition on Saturdays. \n Request for list of property owners within 200 feet of subject property submitted to township tax assessor.", user=u2, project=p1)
    t4 = Task(name="Planners Report", description="Properaration of report in support of application detailing conditions justifying use variance and suitability of site for intended purpose", start_date="February 5, 2024", end_date="February 19, 2024", status="open", user=u3, project=p1)
    t5 = Task(name="Variance Application Form", description="Prepare variance application for operation of home business on property", start_date="January 15, 2024", end_date="January 19, 2024", status="open", user=u3, project=p2)
    t6 = Task(name="Access Easement", description="Finalize and record amendment to access easement accross neighboring property", start_date="January 15, 2024", end_date="January 15, 2024", status="open", user=u2, project=p2)
        
    db.session.add_all([t1, t2, t3, t4, t5, t6])
    db.session.commit()


    # Comment.query.delete()

    # c1 = Comment(comment="Montgomery Township's official newspaper is the Courier News.  Notices must be submitted for publication 3 business days prior to date of publication.  Courier News does not publish print edition on Saturdays.", task=t3)
    # c2 = Comment(comment="Request for list of property owners within 200 feet of subject property submitted to township tax assessor.", task=t3)
    # c3 = Comment(comment="Topographic survey scheduled for Jan 4.", task=t2)

    # db.session.add_all([c1, c2, c3])
    # db.session.commit()


