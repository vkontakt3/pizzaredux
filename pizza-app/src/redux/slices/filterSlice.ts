import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SortType = {
	name: string;
	sortProperty: string;
};

interface FilterState {
	categoryId: number;
	sort: SortType;
}

const initialState: FilterState = {
	categoryId: 0,
	sort: {
		name: "популярности (Убывание)",
		sortProperty: "rating",
	},
};

const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload;
		},
		setSortId(state, action: PayloadAction<SortType>) {
			state.sort = action.payload;
		},
	},
});

export const { setCategoryId, setSortId } = filterSlice.actions;

export default filterSlice.reducer;
