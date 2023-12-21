from app import app
from models import db, User, Project, Role, Task, Template
import json

with app.app_context():
    print("Starting seed...")

    User.query.delete()
    Project.query.delete()
    Role.query.delete()
    Task.query.delete()
    Template.query.delete()
    db.session.commit()


    u1 = User(name="Peter Brown", company="ACME Engineering", phone_number="555-303-6080", email="peter@email.com", password_hash="123")
    u2 = User(name="Diana Bland", company="Jones & Garfunkle LLC", phone_number="555-584-5537", email="diana@email.com", password_hash="456")
    u3 = User(name="Erica Woods", company="Woods Planning, LLC", phone_number="555-896-1255", email="erica@email.com", password_hash="789")
    u4 = User(name="Mark Michaels", company="Many Acres Surveying, Inc.", phone_number="555-682-5826", email="mark@email.com", password_hash="101")

    db.session.add_all([u1, u2, u3, u4])
    db.session.commit()



    p1 = Project(name="Grace Figueroa Conditional Use", client="Grace Figueroa", property_address="12 Washington Court", property_lot="35", property_block="19", municipality="Piscataway Township", county="Middlesex", state="New Jersey")
    p2 = Project(name="Sunny Vineyards Use Variance and Site Plan", client="A&L Holdings, LLC", property_address="586 Maple Road, Skillman", property_lot="59", property_block="26002", municipality="Montgomery Township", county="Somerset", state="New Jersey")

    db.session.add_all([p1, p2])
    db.session.commit()



    r1 = Role(name="Attorney", user=u2, project=p1)
    r2 = Role(name="Surveyor", user=u4, project=p1)
    r3 = Role(name="Planner", user=u3, project=p1)

    r4 = Role(name="Attorney", user=u2, project=p2)
    r5 = Role(name="Planner", user=u3, project=p2)
    r6 = Role(name="Engineer", user=u1, project=p2)

    db.session.add_all([r1, r2, r3, r4, r5, r6])
    db.session.commit()



# ##### TASKS FOR CONDITIONAL USE APPLICATION DEMO ########

    t1 = Task(
        name="Application submission", 
        description="14 set of duly executed, folded site plans; 1 signed original application plus 13 copies of the application; 1 checklist for each application", 
        start_date="2023-12-13", 
        end_date="2023-12-13", 
        status="Complete", 
        user=u3, 
        project=p1
    )
    t2 = Task(
        name="Filing fees", 
        description="", 
        start_date="2023-12-13", 
        end_date="2023-12-13", 
        status="Complete", 
        user=u2, 
        project=p1
    )
    t3 = Task(
        name="Proof of ownership", 
        description="1 proof of ownership document, preferably a deed. If owner is not the applicant, a statement of consent from the owner allowing the applicant to proceed, and a copy of the contract of sale, if possible.", 
        start_date="2023-12-13", 
        end_date="2023-12-13", 
        status="Complete", 
        user=u2, 
        project=p1
    )
    t4 = Task(
        name="Proposed form of notice", 
        description="Proposed form of notice for publication and service, unless application is for a minor subdivision with no variances or for a conventional site plan with no use or other variances or for final approval.", 
        start_date="2023-12-06", 
        end_date="2023-12-13", 
        status="Not Satisfied", 
        user=u2, 
        project=p1
    )
    t5 = Task(
        name="Property list", 
        description="Property list may need to be requested if notice is required. These take seven (7) to ten (10) days to process.", 
        start_date="2023-11-07", 
        end_date="2023-11-17", 
        status="Complete", 
        user=u2, 
        project=p1
    )
    t6 = Task(
        name="Affidavit of notice", 
        description="Affidavit of publication (obtained from newspaper) where notice is required. Affidavit of service if notice is required. Signed property list must be attached if property owners were personally served, or, certified letter return receipts must be attached if certified mail was use.", 
        start_date="2024-01-12", 
        end_date="2024-01-16", 
        status="Open", 
        user=u2,
        project=p1
    )

################ PRELIM SITE PLAN DEMO ########
    t7 = Task(
        name="Environmental Impact Statement", 
        description="EIC must be submitted which complies with Code §148-102(C)", 
        start_date="2024-01-08", 
        end_date="2024-02-05", 
        status="Open", 
        user=u1, 
        project=p2
    )
    t8 = Task(
        name="Soil Erosion and Sediment Control Plan", 
        description="Proposals for soil erosion and sediment control as required by the Readington Township Soil Erosion and Sediment Control Ordinance, Code Chapter 197", 
        start_date="2024-01-08", 
        end_date="2024-02-05", 
        status="Open", 
        comments="Topographic survey scheduled for Jan 4.", 
        user=u1, 
        project=p2
    )
    t9 = Task(
        name="Notice", 
        description="Issue notice of application by publication in newspaper and by certified mail to surrounding property owners at least 10 days prior to hearing date", 
        start_date="2024-03-11",
        end_date="2024-03-13", 
        status="Open", 
        comments="Montgomery Township's official newspaper is the Courier News.  Notices must be submitted for publication 3 business days prior to date of publication.  Courier News does not publish print edition on Saturdays. \n Request for list of property owners within 200 feet of subject property submitted to township tax assessor.", 
        user=u2, 
        project=p2
    )
    t10 = Task(
        name="Planners Report", 
        description="Properaration of report in support of application detailing conditions justifying use variance and suitability of site for intended purpose", 
        start_date="2024-02-05", 
        end_date="2024-02-19", 
        status="Open", 
        user=u3, 
        project=p2
    )
        
    db.session.add_all([t1, t2, t3, t4, t5, t6, t7, t8, t9, t10])
    db.session.commit()



    tp1 = Template(
        title='Notice by Certified Mail and Newspaper Publication',
        task_list=json.dumps([{"description": "Request certified list of abutting property owners from township tax assessor.  May take seven (7) to ten (10) days to process. Standard fee is $10.", "name": "Certified Property List"}, {"description": "Provide proposed form of notice to board attorney for review prior to publication and service.", "name": "Proposed Form of Notice"}, {"description": "Publish notice in municipality's official newspaper at least 10 days prior to hearing date.  Confirm frequency of newspaper publication and deadlines for submission to newspaper.", "name": "Publication of Notice"}, {"name": "Service to Surrounding Property Owners", "description": "Notice to surrounding property owners within 200 feet of the subject property must be made by certified mail at least 10 days prior to hearing date."}, {"name": "Affidavit of Service", "description": "Affidavit of service must be submitted to board prior to or at hearing.  Must include certified mail return receipts and affidavit of publication obtained from newspaper."}])
    )
    tp2 = Template(
        title= 'Franklin Township Variance Submission Checklist (Somerset Co., NJ)',
        task_list=json.dumps([{"name": "Variance application", "description": "\nTwenty-five (25) sets (1 original and 24 copies) of the Variance\nApplication Form, fully completed, signed and notarized "}, {"name": "Variance submission checklist", "description": "2 Two (2) copies of the Variance Submission Checklist fully completed X X\n"}, {"name": "Site plan", "description": "Twenty-five (25) sets of a clear, legible site layout plan, prepared by an\nappropriately licensed or certified professional (e.g., surveyor, engineer,\narchitect, landscape architect, planner)."}, {"name": "Copies of dimensional renderings", "description": "Twenty-five (25) sets of a dimensioned renderings or elevations of the\nexisting and proposed buildings, and dimensioned floor plans, that\ninclude the use and square footage of each area with change of use areas\nclearly defined, where applicable. "}, {"name": "Traffic impact report", "description": "Fifteen (15) sets of a traffic impact report"}, {"name": "Environmental assessment", "description": "Fifteen (15) sets of an environmental assessment per \u00a7112-199"}, {"name": "DRCC application", "description": "Proof of submittal to the D&R Canal Commission"}, {"name": "County Planning Board application", "description": "Proof of submittal to the Somerset County Planning Board"}, {"name": "NJDOT application", "description": "Proof of submittal to the State Department of Transportation, if applicable"}, {"name": "Franklin Township Sewerage Authority application", "description": "Proof of submittal to the Franklin Township Sewerage Authority, if\napplicable"}, {"name": "NJDEP application", "description": "Proof of submittal to the State Department of Environmental Protection,\nif applicable"}, {"name": "Application fees", "description": "Fees in accordance with \u00a7112-327 of the Land Development Ordinance\nand \u00a7112-213.B as applicable"}, {"name": "Escrow", "description": "Escrow deposit in accordance with \u00a7112-213.A of the Land Development\nOrdinance as applicable. Applications requiring an escrow deposit shall\nbe accompanied by a W-9 form."}, {"name": "Digital copies of application", "description": "Submittal of digital copies of application materials pursuant to \u00a7112-\n320.1.\nPer Section \u00a7112-320.1 this requirement shall not apply to single- or two-family homeowners preparing submittals on their\nown behalf and shall not include submittal of the W-9 form (which shall be provided in hard copy only)."}, {"name": "Tax certification", "description": "Certification that no taxes or assessments on the property are delinquent"}, {"name": "Property Title", "description": "Disclosure of ownership as required pursuant to N.J.S.A. 40:55D-48.1\nand 2."}])
    )
    tp3 = Template(
        title= 'Readington Township Preliminary Major Site Plan (Hunterdon Co., NJ)',
        task_list=json.dumps([{"name": "Site Plan Application and Checklist", "description": "Application forms and checklists (20 completed copies)."}, {"name": "Application Fees and Escrow", "description": "Application fees and escrow fees in accordance with Article XI, Fees, Guaranties, Inspections and Off-Tract Improvements."}, {"name": "Site Plan", "description": "Plats or plans (20 folded copies) signed and sealed by a N.J. professional engineer and folded with title block revealed."}, {"name": "Architectural Plans", "description": "Architectural floor plans and elevations (20 folded copies) prepared by an architect certified in New Jersey (site plans only)."}, {"name": "Property Title", "description": "Protective covenants or deed restrictions (20 copies)."}, {"name": "Tax Certification", "description": "Certification by the tax collector indicating that all taxes and assessments are paid to date."}, {"name": "Waiver List", "description": "Identification of all waivers sought (20 copies)."}, {"name": "Environmental Impact Statement", "description": "Environmental impact statement (20 copies) in accordance with \u00a7 148-102."}, {"name": "Owner Certification", "description": "Certification of ownership or authorization to file application."}, {"name": "Soil Erosion and Sediment Control Plan", "description": "Proposals for soil erosion and sediment control as required by the Readington Township Soil Erosion and Sediment Control Ordinance."}, {"name": "Fire Suppression Certification", "description": "In developments served by public water, certification that hydrants and fire flows are adequate. In developments not served by water, certification of the minimum size of water storage tank required for fire-fighting purposes."}, {"name": "Construction Cost Estimate", "description": "For site plan applications, an estimate of construction costs for all on site improvements exclusive of buildings."}, {"name": "Variance Application", "description": ""}, {"name": "County Planning Board application", "description": "Hunterdon County Planning Board application or proof of filing with the county."}])
    )

    db.session.add_all([tp1, tp2, tp3])
    db.session.commit()