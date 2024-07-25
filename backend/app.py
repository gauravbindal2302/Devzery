from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
password = 'Hello%40123'
app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://postgres:{password}@localhost/testcases'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    time = db.Column(db.String(50), nullable=False)
    module = db.Column(db.String(100), nullable=False)
    priority = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(50), nullable=True)

@app.route('/')
def index():
    events = Event.query.all()
    events_list = []
    for event in events:
        events_list.append({
            'id': event.id,
            'name': event.name,
            'time': event.time,
            'module': event.module,
            'priority': event.priority,
            'status': event.status
        })
    response = jsonify(events_list)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/update_status', methods=['POST'])
def update_status():
    data = request.get_json()
    event_id = data.get('id')
    new_status = data.get('status')    
    event = Event.query.get(event_id)
    if event:
        print(f"Updating event ID {event_id} status from {event.status} to {new_status}")
        event.status = new_status
        db.session.commit()
        return jsonify({'message': 'Status updated successfully'})
    else:
        print(f"Event with ID {event_id} not found")
        return jsonify({'message': 'Event not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)