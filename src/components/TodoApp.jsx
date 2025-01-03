import React, { useState } from "react";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editInput, setEditInput] = useState("");

  // Add a new task
  const addTask = (e) => {
    e.preventDefault()
    if (taskInput!== "") {
      setTasks([...tasks, { id: Date.now(), text: taskInput, completed: false }]);
      setTaskInput("");
    }
  };

  // Toggle task completion
  const toggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Enter edit mode
  const startEditing = (taskId, taskText) => {
    setEditId(taskId);
    setEditInput(taskText);
  };

  // Save the edited task
  const saveEdit = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editId ? { ...task, text: editInput } : task
      )
    );
    setEditId(null);
    setEditInput("");
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditId(null);
    setEditInput("");
  };

  return (
    <div className="container py-5 ">
      <h1 className="text-center mb-4">To-Do </h1>

      {/* Input for adding tasks */}
      <form onSubmit={addTask} className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button className="btn btn-primary" >
          Add Task
        </button>
      </form>

      {/* Task List */}
      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              task.completed ? "list-group-item-success" : ""
            }`}
          >
            {editId === task.id ? (
              // Edit Mode
              <div className="d-flex flex-grow-1">
                <input
                  type="text"
                  className="form-control me-2"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
                <button className="btn btn-success me-2" onClick={saveEdit}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={cancelEdit}>
                  Cancel
                </button>
              </div>
            ) : (
              // View Mode
              <>
                <span

                  onClick={() => toggleTask(task.id)}
                  style={{ cursor: "pointer", flexGrow: 1 }}
                >
                  {task.text}
                </span>
                <div>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => startEditing(task.id, task.text)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {tasks.length === 0 && (
        <p className="text-center text-muted mt-3">No tasks yet!</p>
      )}
    </div>
  );
};

export default TodoApp;
