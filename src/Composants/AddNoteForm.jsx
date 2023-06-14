import React, { useState } from 'react';
import useStore from '../store';



const AddNoteForm = () => {
  const addNote = useStore((state) => state.addNote);
  const [title, setTitle] = useState('');
  const [score, setScore] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(score >= 0 && score <= 20){
        addNote({
        title,
        score,
        comment,
        date: new Date(),
      });
      setTitle('');
      setScore('');
      setComment('');
    }else{
      alert('La note doit etre entre 0 et 20');
    }
    
  };

  return (
    <div class="formulaire">
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre" required />
      <input type="number" value={score} onChange={(e) => setScore(e.target.value)} placeholder="Note" required />
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Commentaire" required />
      <button type="submit">Ajouter une Note</button>
    </form></div>
  );
};

export default AddNoteForm;
