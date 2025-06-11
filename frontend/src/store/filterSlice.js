import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ajans: '',
  category: '',
  type: '',
  dateRange: [null, null],
  importance: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFilter: () => initialState,
  },
});

export const { setFilter, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;
