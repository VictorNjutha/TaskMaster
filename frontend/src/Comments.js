import React, { useState, useEffect } from 'react';

function Comments({ taskId }) {
  const [text, setText] = useState('');
  const [comments, setComments] = useState([]);

  const fetchComments = () => {
    fetch(`http://127.0.0.1:5552/all-tasks/${taskId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      return response.json();
    })
    .then(data => {
      setComments(data.task.comments);
    })
    .catch(error => {
      console.error('Error fetching comments:', error);
    });
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5552/all-tasks/${taskId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const data = await response.json();
        setComments(data.task.comments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [taskId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:5552/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify({
        text: text,
        task_id: taskId
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to create comment');
      }
      return response.json();
    })
    .then(data => {
      // Refresh comments after successfully adding a new comment
      fetchComments();
      setText('');
    })
    .catch(error => {
      console.error('Error creating comment:', error);
    });
  };

  const handleDelete = (commentId) => {
    fetch(`http://127.0.0.1:5552/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }
      // Refresh comments after successfully deleting a comment
      fetchComments();
    })
    .catch(error => {
      console.error('Error deleting comment:', error);
    });
  };

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter your comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add Comment</button>
      </form>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <p>{comment.text}</p>
            <button onClick={() => handleDelete(comment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;