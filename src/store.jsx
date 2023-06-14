import create from 'zustand';

const useStore = create((set) => ({
  notes: JSON.parse(localStorage.getItem('notes')) || [],

  addNote: (note) => {
    set((state) => {
      const newNotes = [...state.notes, note];
      localStorage.setItem('notes', JSON.stringify(newNotes));
      return {
        notes: newNotes
      };
    });
  },

  updateNote: (index, newNote) => {
    set((state) => {
      const newNotes = [...state.notes];
      newNotes[index] = newNote;
      localStorage.setItem('notes', JSON.stringify(newNotes));
      return {
        notes: newNotes
      };
    });
  },

  deleteNote: (index) => {
    set((state) => {
      const newNotes = [...state.notes];
      newNotes.splice(index, 1);
      localStorage.setItem('notes', JSON.stringify(newNotes));
      return {
        notes: newNotes
      };
    });
  },
}));

export default useStore;
