import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCartFromLS } from "../../utils/getCartFromLS";

export type CartItem = {
	id: number;
	title: string;
	price: number;
	imageUrl: string;
	types: number[];
	sizes: number[];
	count: number;
	description: string;
};

interface CartSliceState {
	totalPrice: number;
	items: CartItem[];
}

const dataCart = getCartFromLS()

const initialState: CartSliceState = {
	totalPrice: dataCart.totalPrice,
	items: dataCart.items,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItems(state, action: PayloadAction<CartItem>) {
			const findItem = state.items.find(
				(item) => item.id === action.payload.id
			);

			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({ ...action.payload, count: 1 });
			}

			state.totalPrice = state.items.reduce(
				(acc, obj) => acc + obj.price * obj.count,
				0
			);
		},
		removeItems(state, action: PayloadAction<number>) {
			state.items = state.items.filter((item) => item.id !== action.payload);
		},
		clearItems(state) {
			state.items = [];
			state.totalPrice = 0;
		},
		minusItem(state, action: PayloadAction<number>) {
			const findItem = state.items.find((item) => item.id === action.payload);

			if (findItem) {
				findItem.count--;
			}
		},
	},
});

export const { addItems, removeItems, clearItems, minusItem } =
	cartSlice.actions;

export default cartSlice.reducer;
