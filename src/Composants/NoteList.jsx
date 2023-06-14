import React, { useState } from 'react';
import useStore from '../store';
import EditNoteForm from './EditNoteForm';

const NoteList = () => {
    const [sortOption, setSortOption] = useState('date'); // 'date' ou 'note'
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' ou 'desc'
    const [searchTerm, setSearchTerm] = useState("");
    const notes = useStore((state) => {
        const filteredNotes = state.notes.filter((note) =>
          note.title.includes(searchTerm) ||
          note.comment.includes(searchTerm) ||
          note.score.toString().includes(searchTerm)
        );
        const sortedNotes = filteredNotes.sort((a, b) => {
          if (sortOption === 'date') {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
          } else if (sortOption === 'note') {
            return sortOrder === 'asc' ? a.score - b.score : b.score - a.score;
          }
          return 0;
        });
    
        return sortedNotes;
      });
      
  const updateNote = useStore((state) => state.updateNote);
  const deleteNote = useStore((state) => state.deleteNote);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);

  const handleNoteClick = (index) => {
    setSelectedNoteIndex(index);
  };

  const handleUpdateNote = (newNote) => {
    updateNote(selectedNoteIndex, newNote);
    setSelectedNoteIndex(null);
  };



const handleDeleteNote = (event,index) => {
    event.stopPropagation(); 

    const confirmed = window.confirm("Etes-vous Sure ?");
    if (confirmed) {
      deleteNote(index);
    }
  };

  return (
    <div class="mainn">
      <div class="search">
        <input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Recherche"
      /></div>
              <div class="trie">
        <label>
          Trier par:
          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
          >
            <option value="date">Date</option>
            <option value="note">Note</option>
          </select>
        </label>
        <label>
          Ordre :
          <select
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
          >
            <option value="asc">Croissant</option>
            <option value="desc">Décroissant</option>
          </select>
        </label>
      </div>
  
      {selectedNoteIndex === null ? (
        <div class="note">
  <table>
    <thead>
      <tr>
        <div>
        <th>Titre</th>
        <th>Date</th>
        <th>Note</th>
        <th>Commentaire</th>
        <th></th></div>
      </tr>
    </thead>
    <tbody>
      {notes.map((note, index) => {
        let backgroundColor = '';
        if (note.score < 8) {
          backgroundColor = 'red';
        } else if (note.score < 10) {
          backgroundColor = 'orange';
        } else if (note.score < 13) {
          backgroundColor = 'yellow';
        } else {
          backgroundColor = 'green';
        }

        return (
           
          <tr>
          <div class="tablee" key={index}
          onClick={() => handleNoteClick(index)}
          style={{ backgroundColor: backgroundColor }}>
            <td>{note.title}</td>
            <td>{new Date(note.date).toLocaleDateString()}</td>
            <td>{note.score}</td>
            <td>{note.comment.substring(0, 10)}...</td>
            <td>
              <button onClick={(event) => handleDeleteNote(event, index)}>Supprimer</button>
            </td>
            </div>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>


      ) : (
        <EditNoteForm
          note={notes[selectedNoteIndex]}
          onUpdate={handleUpdateNote}
        />
      )}
    </div>
  );
};

export default NoteList;

