import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Comments from './Comments';
import UpdateForm from './UpdateForm';
import 'bootstrap/dist/css/bootstrap.min.css';

// Define the default profile image URL
const defaultProfileImage = 'https://i.pinimg.com/564x/fd/cd/d4/fdcdd4eeba23eaaf4cf2d6012102c4b5.jpg';

function TaskList() {
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchTasks = () => {
      const url = showAllTasks ? `https://task-master-backend-ng4l.onrender.com/all-tasks?page=${currentPage}` : `https://task-master-backend-ng4l.onrender.com/tasks?page=${currentPage}`;
      fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        return response.json();
      })
      .then(data => {
        setTasks(data.tasks);
        setTotalPages(data.total_pages);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
    };

    fetchTasks();
  }, [showAllTasks, currentPage]);

  const handleUpdateTask = (taskId, newData) => {
    // Implement function to update task
    console.log('Updating task', taskId, 'with data:', newData);
  };

  const handleDeleteTask = (taskId) => {
    // Implement function to delete task
    console.log('Deleting task', taskId);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside the list, do nothing

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1); // Remove the dragged item from the original position
    items.splice(result.destination.index, 0, reorderedItem); // Insert the dragged item into the new position

    setTasks(items);
  };

  const handleTaskClick = (taskId) => {
    setSelectedTask(taskId);
  };

  return (
    <div className="page-container">
      <div className="container pt-5">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-auto">
                <button className="btn btn-primary mr-2" onClick={() => setShowAllTasks(false)}>Show Your Tasks</button>
                <button className="btn btn-primary" onClick={() => setShowAllTasks(true)}>Show All Tasks</button>
              </div>
            </div>
            <h2 className="mt-4">{showAllTasks ? 'All Tasks' : 'Your Tasks'}</h2>
            <Droppable droppableId="tasks">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          onClick={() => handleTaskClick(task.id)}
                        >
                          <div className={`card mt-3 ${selectedTask === task.id ? 'border-primary' : ''}`}>
                            <div className="card-body">
                              <h3 className="card-title">{task.title}</h3>
                              <p className="card-text">{task.description}</p>
                              <div className="d-flex align-items-center">
                                {/* Display profile picture and username */}
                                <img src={task.user?.profile_image || defaultProfileImage} alt="Profile" style={{ width: '50px', height: '50px', marginRight: '10px', borderRadius: '50%' }} />
                                <span>{task.user?.username}</span>
                              </div>
                              <Comments taskId={task.id} />
                              {!showAllTasks && selectedTask === task.id && (
                                <UpdateForm
                                  taskId={task.id}
                                  onUpdate={handleUpdateTask}
                                  onDelete={handleDeleteTask}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <nav>
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>{'Previous'}</button>
                </li>
                {[...Array(totalPages).keys()].map((page) => (
                  <li key={page} className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(page + 1)}>{page + 1}</button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>{'Next'}</button>
                </li>
              </ul>
            </nav>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default TaskList;
