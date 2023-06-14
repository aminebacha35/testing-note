import { test, expect } from 'vitest';
import create from 'zustand';

test('modification normal', () => {
const useStore = create((set) => ({
notes: [
{ id: 1, title: 'Note 1', score: 10, comment: 'note 1' },
{ id: 2, title: 'Note 2', score: 15, comment: 'note 2' },
{ id: 3, title: 'Note 3', score: 12, comment: 'note 3' },
],
updateNote: (id, updatedNote) => {
    set((state) => ({
      notes: state.notes.map((note) => {
        if (note.id === id) {
          return { ...note, ...updatedNote };
        }
        return note;
      }),
    }));
  },
}));

const store = useStore.getState();
const initialNotes = store.notes;

const updatedNote = {
id: 2,
title: 'mise à jour',
score: 18,
comment: 'La note doit etre mise à jour',
};

useStore.getState().updateNote(2, updatedNote);

const updatedStore = useStore.getState();
const updatedNotes = updatedStore.notes;

const updatedNoteInStore = updatedNotes.find((note) => note.id === 2);

expect(updatedNotes.length).toBe(initialNotes.length);
expect(updatedNoteInStore.title).toBe('mise à jour');
expect(updatedNoteInStore.score).toBe(18);
expect(updatedNoteInStore.comment).toBe('La note doit etre mise à jour');
});

test('modification avec mauvaise id', () => {
const useStore = create((set) => ({
notes: [
{ id: 1, title: 'Note 1', score: 10, comment: 'note 1' },
{ id: 2, title: 'Note 2', score: 15, comment: 'note 2' },
{ id: 3, title: 'Note 3', score: 12, comment: 'note 3' },
],
updateNote: (id, updatedNote) => {
    set((state) => ({
      notes: state.notes.map((note) => {
        if (note.id === id) {
          return { ...note, ...updatedNote };
        }
        return note;
      }),
    }));
  },
}));

const store = useStore.getState();
const initialNotes = store.notes;

const updatedNote = {
id: 4, 
title: 'mise à jour',
score: 18,
comment: 'La note doit etre mise à jour',
};

useStore.getState().updateNote(4, updatedNote);

const updatedStore = useStore.getState();
const updatedNotes = updatedStore.notes;

expect(updatedNotes.length).toBe(initialNotes.length);
});

test('avec note vide', () => {
const useStore = create((set) => ({
notes: [
{ id: 1, title: 'Note 1', score: 10, comment: 'note 1' },
{ id: 2, title: 'Note 2', score: 15, comment: 'note 2' },
{ id: 3, title: 'Note 3', score: 12, comment: 'note 3' },
],
updateNote: (id, updatedNote) => {
    set((state) => ({
      notes: state.notes.map((note) => {
        if (note.id === id && Object.keys(updatedNote).length > 0) {
          return { ...note, ...updatedNote };
        }
        return note;
      }),
    }));
  },
}));

const store = useStore.getState();
const initialNotes = store.notes;

const updatedNote = {
id: 2,
title: '', 
score: null, 
comment: '', 
};

useStore.getState().updateNote(2, updatedNote);

const updatedStore = useStore.getState();
const updatedNotes = updatedStore.notes;

expect(updatedNotes.length).toBe(initialNotes.length);
});

