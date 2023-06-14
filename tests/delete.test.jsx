import { test, expect } from 'vitest';
import create from 'zustand';

test('delete en mode normal', () => {
const useStore = create((set) => ({
notes: [
{ id: 1, title: 'Note 1', score: 10, comment: 'note 1' },
{ id: 2, title: 'Note 2', score: 15, comment: 'note 2' },
{ id: 3, title: 'Note 3', score: 12, comment: 'note 3' },
],
deleteNote: (id) => {
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    }));
  },
}));

const store = useStore.getState();
const initialNotes = store.notes;

useStore.getState().deleteNote(2);

const updatedStore = useStore.getState();
const updatedNotes = updatedStore.notes;

expect(updatedNotes.length).toBe(initialNotes.length - 1);
expect(updatedNotes.some((note) => note.id === 2)).toBe(false);
});

test('delete avec une id mauvaise', () => {
const useStore = create((set) => ({
notes: [
{ id: 1, title: 'Note 1', score: 10, comment: 'note 1' },
{ id: 2, title: 'Note 2', score: 15, comment: 'note 2' },
{ id: 3, title: 'Note 3', score: 12, comment: 'note 3' },
],
deleteNote: (id) => {
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    }));
  },
}));

const store = useStore.getState();
const initialNotes = store.notes;

useStore.getState().deleteNote(4); 

const updatedStore = useStore.getState();
const updatedNotes = updatedStore.notes;

expect(updatedNotes.length).toBe(initialNotes.length);
});