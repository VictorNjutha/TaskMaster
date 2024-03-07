import React, { useState } from 'react';

const Comments = ({ taskId }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleCreateComment = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5552/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'), // Include the JWT token from localStorage
        },
        body: JSON.stringify({
          text: newComment,
          task_id: taskId,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create comment');
      }
      const { comment_id } = await response.json();
      setComments([...comments, { id: comment_id, text: newComment }]);
      setNewComment(''); // Clear the input field after successful comment creation
    } catch (error) {
      console.error('Error creating comment:', error.message);
    }
  };

  const handleUpdateComment = async (commentId, newText) => {
    try {
      const response = await fetch(`http://127.0.0.1:5552/comments/${commentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'), // Include the JWT token from localStorage
        },
        body: JSON.stringify({
          text: newText,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update comment');
      }
      // Update the comment text in the local state
      setComments(comments.map(comment => comment.id === commentId ? { ...comment, text: newText } : comment));
    } catch (error) {
      console.error('Error updating comment:', error.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5552/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'), // Include the JWT token from localStorage
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }
      // Remove the deleted comment from the local state
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error.message);
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)}></textarea>
      <button onClick={handleCreateComment}>Add Comment</button>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <textarea value={comment.text} onChange={(e) => handleUpdateComment(comment.id, e.target.value)}></textarea>
            <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;