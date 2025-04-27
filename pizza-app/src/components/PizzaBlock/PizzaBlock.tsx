import React, { useState } from "react";
import { addItems, CartItem } from "../../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { Link } from "react-router-dom";

type PizzaItemProps = {
	id: number;
	title: string;
	price: number;
	image: string;
	description: string;
	types: number[];
	sizes: number[];
};

const PizzaBlock: React.FC<PizzaItemProps> = ({
	id,
	title,
	price,
	image,
	sizes,
	types,
	description,
}) => {
	const dispatch = useDispatch();
	const cartCount = useSelector((state: RootState) =>
		state.cart.items.find((item: CartItem) => item.id === id)
	) || { count: 0 };

	const [sizesActive, setSizesActive] = useState(0);
	const [typeActive, setTypeActive] = useState(0);

	const typeNames = ["тонкое", "традиционное"];

	const onClickAdd = () => {
		const item: CartItem = {
			id,
			title,
			price,
			description,
			imageUrl: image,
			types: [typeActive],
			sizes: [sizesActive],
			count: 0,
		};
		dispatch(addItems(item));
	};
	return (
		<div style={{ display: "flex", justifyContent: "center" }}>
			<div className="pizza-block">
				<Link to={`/pizza/${id}`} key={id}>
					<div className="pizza-block__image-wrapper">
						<img className="pizza-block__image" src={image} alt="Pizza" />
						<div className="pizza-block__hover-text">Нажмитие чтобы подробнее</div>
						<h4 className="pizza-block__title">{title}</h4>
					</div>
				</Link>
				<div className="pizza-block__selector">
					<ul>
						{types.map((type: number, index: number) => (
							<li
								onClick={() => setTypeActive(index)}
								className={typeActive === index ? "active" : ""}
								key={index}
							>
								{typeNames[type]}
							</li>
						))}
					</ul>

					<ul>
						{sizes.map((item: number, index: number) => (
							<li
								key={index}
								onClick={() => setSizesActive(index)}
								className={sizesActive === index ? "active" : ""}
							>
								{item} см.
							</li>
						))}
					</ul>
				</div>
				<div className="pizza-block__bottom">
					<div className="pizza-block__price">от {price} ₽</div>
					<button
						onClick={() => onClickAdd()}
						className="button button--outline button--add"
					>
						<svg
							width="16"
							height="12"
							viewBox="0 0 12 12"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
								fill="white"
							/>
						</svg>
						<span>Добавить</span>
						<i>{cartCount ? cartCount.count : 0}</i>{" "}
					</button>
				</div>
			</div>
		</div>
	);
};

export default PizzaBlock;
