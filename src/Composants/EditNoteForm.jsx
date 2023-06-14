import React, { useState } from 'react';
import useStore from '../store';

const EditNoteForm = ({ note, onUpdate }) => {
  const [title, setTitle] = useState(note.title);
  const [score, setScore] = useState(note.score);
  const [comment, setComment] = useState(note.comment);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(score >= 0 && score <= 20){
      onUpdate({
        ...note,
        title,
        score,
        comment,
      });
    }else{
      alert('Score must be between 0 and 20');
    }
  };

  return (
    <div class="edit">
    <form onSubmit={handleSubmit}>
      <p>Titre</p>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <p>Note</p>
      <input type="number" value={score} onChange={(e) => setScore(e.target.value)} required />
      <p>Commentaire</p>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} required />
      <button type="submit">Modifier</button>
    </form></div>
  );
};

export default EditNoteForm;
