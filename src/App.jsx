import React from 'react';
import AddNoteForm from './Composants/AddNoteForm';
import NoteList from './Composants/NoteList';
import './app.css'


const App = () => {
  return (
<div className="main">
  <div class="menu">
  <h1>Ajouter vos notes</h1>
  <AddNoteForm />
</div>

<div class="droite">



<div class="piza">
  <div class="premtitle">
    <h1>Vos Notes</h1></div>
    <NoteList />
</div>
</div>
</div>
  );
};

export default App;

