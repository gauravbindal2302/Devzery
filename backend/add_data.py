from app import app, db, Event

def add_data():
    with app.app_context():
        # Creating new events
        event1 = Event(
            name='Client Presentation',
            time='2024-07-26 14:00:00',
            module='Sales',
            priority='Medium',
            status='PASS'
        )

        event2 = Event(
            name='Client Presentation',
            time='2024-07-26 14:00:00',
            module='Sales',
            priority='Medium',
            status='FAIL'
        )
        
        event3 = Event(
            name='Client Presentation',
            time='2024-07-26 14:00:00',
            module='Sales',
            priority='Medium',
            status='PASS'
        )
        
        # Adding events to the database
        db.session.add_all([event1, event2, event3])
        db.session.commit()
        
        print('Events added successfully!')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    add_data()