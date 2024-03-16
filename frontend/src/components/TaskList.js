import React, { useEffect, useState } from 'react';
import Comments from './Comments';
import UpdateForm from './UpdateForm';

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

  const [showUpdateFormId, setShowUpdateFormId] = useState(null);

  return (
    <div>
      <div>
        <button onClick={() => setShowAllTasks(false)}>Show Your Tasks</button>
        <button onClick={() => setShowAllTasks(true)}>Show All Tasks</button>
      </div>
      <h2>{showAllTasks ? 'All Tasks' : 'Your Tasks'}</h2>
      {tasks.map(task => (
        <div key={task.id} onClick={() => setShowUpdateFormId(task.id)}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <div>
            {showAllTasks ? (
              <>
                {/* Display profile picture and username if task.user exists */}
                {task.user && (
                  <>
                    <img src={task.user.profile_image || defaultProfileImage} alt="Profile" style={{ width: '50px', height: '50px' }} />
                    <span>{task.user.username}</span>
                  </>
                )}
              </>
            ) : (
              <>
                {/* Display group leader if task.group_leader exists */}
                {task.group_leader && (
                  <>
                    <img src={task.group_leader.profile_image || defaultProfileImage} alt="Profile" style={{ width: '50px', height: '50px' }} />
                    <span>{task.group_leader.username}</span>
                  </>
                )}
              </>
            )}
          </div>
          <Comments taskId={task.id} /> {/* Always render the Comments component */}
          {showUpdateFormId === task.id && (
            <UpdateForm
              taskId={task.id}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskList;

