import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { pizzaFetch } from "../redux/slices/pizzaSlice";
import { AppDispatch, RootState } from "../redux/store";

type Pizza = {
	id: number;
	title: string;
	price: number;
	description: string;
	imageUrl: string;
};

const FullPizza: React.FC = () => {
	const [pizzaData, setPizzaData] = useState<Pizza | null>(null);
	const { id } = useParams();
	const dispatch: AppDispatch = useDispatch();
	const items = useSelector((state: RootState) => state.pizza.items) as Pizza[];

	useEffect(() => {
		dispatch(
			pizzaFetch({
				urlCategory: "",
				deskOrAsk: "",
				sortChoose: { sortProperty: "price" },
			})
		);
	}, []);

	useEffect(() => {
		if (items.length > 0) {
			const selectedPizza = items.find(
				(pizza) => pizza.id === parseInt(id || "")
			);
			setPizzaData(selectedPizza || null);
		}
	}, [items, id]);

	if (!pizzaData) {
		return <div>Loading...</div>;
	}

	return (
		<div className="fullpizza">
			<h1 className="fullpizza__title">{pizzaData.title}</h1>
			<img src={pizzaData.imageUrl} alt={pizzaData.title} />
			<p className="description">{pizzaData.description}</p>
			<p className="price">Price: {pizzaData.price} ₽</p>
		</div>
	);
};

export default FullPizza;
