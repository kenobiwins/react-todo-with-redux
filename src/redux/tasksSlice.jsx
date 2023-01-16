import { createSlice } from '@reduxjs/toolkit';
import { fetchTasks, addTask, deleteTask, toggleCompleted } from './operations';

const tasksInitialState = { items: [], isLoading: false, error: null };

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.error;
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: tasksInitialState,
  // reducers: {
  //   addTask: {
  //     reducer(state, action) {
  //       console.log(action.payload);
  //       state.items.push(action.payload);
  //     },
  //     prepare(text) {
  //       return {
  //         payload: {
  //           id: nanoid(),
  //           completed: false,
  //           text,
  //         },
  //       };
  //     },
  //   },
  //   deleteTask(state, action) {
  //     const index = state.items.findIndex(task => task.id === action.payload);
  //     state.items.splice(index, 1);
  //   },
  //   toggleCompleted(state, action) {
  //     for (const task of state.items) {
  //       if (task.id === action.payload) {
  //         task.completed = !task.completed;
  //         break;
  //       }
  //     }
  //   },
  // },
  extraReducers: {
    [fetchTasks.pending]: handlePending,
    [addTask.pending]: handlePending,
    [deleteTask.pending]: handlePending,
    [toggleCompleted.pending]: handlePending,
    [fetchTasks.rejected]: handleRejected,
    [addTask.rejected]: handleRejected,
    [deleteTask.rejected]: handleRejected,
    [toggleCompleted.rejected]: handleRejected,
    [fetchTasks.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [addTask.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    },
    [deleteTask.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      const index = state.items.findIndex(
        task => task.id === action.payload.id
      );
      state.items.splice(index, 1);
    },
    [toggleCompleted.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      const index = state.items.findIndex(
        task => task.id === action.payload.id
      );
      state.items.splice(index, 1, action.payload);
    },
  },
});

export const tasksReducer = tasksSlice.reducer;
