import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sortMethod: "asc",
  currentPage: 1,
  sortType: {
    name: "популярности",
    sortProp: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
    setSortMethod(state, action) {
      state.sortMethod = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
      state.sortMethod = action.payload.sortMethod;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCategoryId,
  setSortType,
  setSortMethod,
  setCurrentPage,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
