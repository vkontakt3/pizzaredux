import React from "react";
import emptyCart from '../assets/img/empty-cart.png'

export const CartEmpty: React.FC = () => {
	return (
		<>
			<div className="content">
				<div className="container container--cart">
					<div className="cart cart--empty">
						<h2>
							Корзина пустая <b>😕</b>
						</h2>
						<p>
							Вероятней всего, вы не заказывали ещё пиццу.
							<br />
							Для того, чтобы заказать пиццу, перейди на главную страницу.
						</p>
						<img src={emptyCart} alt="Empty cart" />
						<a href="/" className="button button--black">
							<span>Вернуться назад</span>
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default CartEmpty;
