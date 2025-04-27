import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type PizzaFetchArgs = {
	urlCategory: string;
	deskOrAsk: string;
	sortChoose: { sortProperty: string };
};

export type Pizza = {
	id: number;
	title: string;
	price: number;
	imageUrl: string;
	types: number[];
	sizes: number[];
	count: number;
	description: string;
};

export const pizzaFetch = createAsyncThunk<Pizza[], PizzaFetchArgs>(
	"pizza/pizzaFetchStatus",
	async ({ urlCategory, deskOrAsk, sortChoose }) => {
		const res = await axios.get<Pizza[]>(
			`https://67d2c2b890e0670699beefb3.mockapi.io/items?${urlCategory}&sortBy=${sortChoose.sortProperty.replace(
				"-",
				""
			)}&order=${deskOrAsk}`
		);
		return res.data.map((item: Pizza) => ({
			...item,
			description: item.description || "описание недоступно",
		}));
	}
);

interface pizzaState {
	items: Pizza[];
	isLoading: boolean;
	error: string | null;
}

const initialState: pizzaState = {
	items: [],
	isLoading: false,
	error: null as string | null,
};

const pizzaSlice = createSlice({
	name: "pizza",
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<Pizza[]>) {
			state.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(pizzaFetch.pending, (state) => {
				state.isLoading = true;
				state.error = null;
				state.items = [];
			})
			.addCase(pizzaFetch.fulfilled, (state, action) => {
				state.isLoading = false;
				state.items = action.payload;
			})
			.addCase(pizzaFetch.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message ?? "something went wrong!";
				state.items = [];
				console.log(state.error);
			});
	},
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
