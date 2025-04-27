import { CartItem } from "../redux/slices/cartSlice";

export const getCartFromLS = () => {
	const data = localStorage.getItem("cart");
	const items: CartItem[] = data ? JSON.parse(data) : [];

    const totalPrice = items.reduce((acc: number, item: CartItem) => acc + item.count * item.price, 0)

    return { items , totalPrice }
};
