import React, { useContext } from "react";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Sort from "../components/Sort";
import "../scss/app.scss";
import { useEffect } from "react";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { SearchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setSortId } from "../redux/slices/filterSlice";
import { pizzaFetch } from "../redux/slices/pizzaSlice";
import { RootState, AppDispatch } from "../redux/store";
import { CartItem } from "../redux/slices/cartSlice";

const Home: React.FC = () => {
	const items = useSelector(
		(state: RootState) => state.pizza.items
	) as CartItem[];
	const isLoading = useSelector((state: RootState) => state.pizza.isLoading);

	const contextHome = useContext(SearchContext);

	if (!contextHome) {
		return <div>Ошибка!</div>;
	}
	const { searchValue } = contextHome;

	const activeCategory = useSelector(
		(state: RootState) => state.filter.categoryId
	);
	const sortChoose = useSelector((state: RootState) => state.filter.sort);

	const dispatch = useDispatch<AppDispatch>();

	const urlCategory = `${
		activeCategory > 0 ? `category=${activeCategory}` : ""
	}`;

	const deskOrAsk = sortChoose.sortProperty.includes("-") ? "asc" : "desc";

	useEffect(() => {
		const fetchData = async () => {
			try {
				dispatch(pizzaFetch({ urlCategory, deskOrAsk, sortChoose }));
			} catch (error) {
				console.warn(error, "ошибка");
			}
		};
		fetchData();
	}, [activeCategory, sortChoose]);

	const pizzas = items
		.filter((obj) => {
			if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
				return true;
			}
			return false;
		})
		.map((item) => (
			<PizzaBlock
				key={item.id}
				id={item.id}
				title={item.title}
				price={item.price}
				image={item.imageUrl}
				sizes={item.sizes}
				types={item.types}
				description={item.description}
			/>
		));

	return (
		<div className="container">
			<div className="content__top">
				<Categories
					categories={activeCategory}
					onClickCategories={(id: number) => dispatch(setCategoryId(id))}
				/>
				<Sort
					sortValuse={sortChoose}
					onClickSort={(id) => dispatch(setSortId(id))}
				/>
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading
					? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
					: pizzas}
			</div>
		</div>
	);
};

export default Home;
