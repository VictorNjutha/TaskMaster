import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Comments from './Comments';
import UpdateForm from './UpdateForm';
import 'bootstrap/dist/css/bootstrap.min.css';

// Define the default profile image URL
const defaultProfileImage = 'https://image.kilimall.com/kenya/shop/store/goods/5603/2022/09/1663988910431b23368a706e8434e822580b9ab7cba98_360.jpg.webp#';

function TaskList() {
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = () => {
      const url = showAllTasks ? 'http://127.0.0.1:5552/all-tasks' : 'http://127.0.0.1:5552/tasks';
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
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
    };

    fetchTasks();
  }, [showAllTasks]); // Include showAllTasks in the dependency array

  const handleUpdateTask = (taskId, newData) => {
    // Implement function to update task
    console.log('Updating task', taskId, 'with data:', newData);
  };

  const handleDeleteTask = (taskId) => {
    // Implement function to delete task
    console.log('Deleting task', taskId);
  };


  const onDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside the list, do nothing

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1); // Remove the dragged item from the original position
    items.splice(result.destination.index, 0, reorderedItem); // Insert the dragged item into the new position

    setTasks(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container">
        <div className="row">
          <div className="col">
            <button className="btn btn-primary mr-2" style={{ backgroundColor: 'blue' }} onClick={() => setShowAllTasks(false)}>Show Your Tasks</button>
            <button className="btn btn-primary" style={{ backgroundColor: 'blue' }} onClick={() => setShowAllTasks(true)}>Show All Tasks</button>
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
                    >
                      <div className="card mt-3">
                        <div className="card-body">
                          <h3 className="card-title">{task.title}</h3>
                          <p className="card-text">{task.description}</p>
                          <div className="d-flex align-items-center">
                            {/* Display profile picture and username */}
                            <img src={task.user?.profile_image || defaultProfileImage} alt="Profile" style={{ width: '50px', height: '50px', marginRight: '10px', borderRadius: '50%' }} />
                            <span>{task.user?.username}</span>
                          </div>
                          <Comments taskId={task.id} />
                          {!showAllTasks && (
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
      </div>
    </DragDropContext>
  );
}

export default TaskList;
