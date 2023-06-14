import { test, expect, vi } from 'vitest';
import create from 'zustand';

test('score supp à 20', () => {
  const useStore = create((set) => ({
    notes: [],

    addNote: (note) => {
      if (note.score >= 0 && note.score <= 20) {
        set((state) => ({
          notes: [...state.notes, note]
        }));
      }
    }
  }));

  const store = useStore.getState();
  const initialNotes = store.notes;

  useStore.getState().addNote({
    title: 'Test Note',
    score: 25, 
    comment: 'Test test test wewe la hiat',
    date: new Date(),
  });

  const updatedStore = useStore.getState();
  const updatedNotes = updatedStore.notes;

  expect(updatedNotes.length).toBe(initialNotes.length);
});

test('Note inf à 0', () => {
  const useStore = create((set) => ({
    notes: [],

    addNote: (note) => {
      if (note.score >= 0 && note.score <= 20) {
        set((state) => ({
          notes: [...state.notes, note]
        }));
      }
    }
  }));

  const store = useStore.getState();
  const initialNotes = store.notes;

  useStore.getState().addNote({
    title: 'Test Note',
    score: -5, // Score less than 0
    comment: 'Test test test wewe la hiat',
    date: new Date(),
  });

  const updatedStore = useStore.getState();
  const updatedNotes = updatedStore.notes;

  expect(updatedNotes.length).toBe(initialNotes.length);
});

test('note normale', () => {
  const useStore = create((set) => ({
    notes: [],

    addNote: (note) => {
      if (note.score >= 0 && note.score <= 20) {
        set((state) => ({
          notes: [...state.notes, note]
        }));
      }
    }
  }));

  const store = useStore.getState();
  const initialNotes = store.notes;

  useStore.getState().addNote({
    title: 'Test Note',
    score: 15, // Score between 0 and 20
    comment: 'Test test test wewe la hiat',
    date: new Date(),
  });

});
