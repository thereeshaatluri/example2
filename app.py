from flask import Flask, request, jsonify

app = Flask(__name__)

# Simulated database
tasks = []
task_id = 0

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/add-task', methods=['POST'])
def add_task():
    global task_id
    data = request.json
    task_id += 1
    task = {'id': task_id, 'title': data['title'], 'completed': data['completed']}
    tasks.append(task)
    return jsonify({'message': 'Task added successfully'}), 201

@app.route('/delete-task/<int:id>', methods=['DELETE'])
def delete_task(id):
    global tasks
    tasks = [task for task in tasks if task['id'] != id]
    return jsonify({'message': 'Task deleted successfully'})

@app.route('/toggle-task/<int:id>', methods=['PUT'])
def toggle_task(id):
    for task in tasks:
        if task['id'] == id:
            task['completed'] = not task['completed']
            break
    return jsonify({'message': 'Task updated successfully'})
from waitress import serve
from app import app
if __name__ == '__main__':
    serve(app,host='0.0.0.0',port=5000)

