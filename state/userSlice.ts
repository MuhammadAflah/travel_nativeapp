import { ListingType } from "@/types/listingType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserState {
  bookMarks: ListingType[];
}

const initialState: UserState = {
  bookMarks: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addBookMark: (state, action: PayloadAction<{ bookMarks: ListingType }>) => {
      // Ensure bookMarks is an array and append new item
      if (!Array.isArray(state.bookMarks)) {
        state.bookMarks = []; // Re-initialize if undefined
      }
      state.bookMarks.push(action.payload.bookMarks); // Safely add to the array
    },
  },
});

export default userSlice.reducer;
export const { addBookMark } = userSlice.actions;
