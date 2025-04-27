import React from "react";

type CategoriesProps = {
	categories: number;
	onClickCategories: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(
	({ categories, onClickCategories }) => {
		const categoriesList = [
			"Все",
			"Мясные",
			"Вегетарианская",
			"Гриль",
			"Острые",
			"Закрытые",
		];

		return (
			<div className="categories">
				<ul>
					{categoriesList.map((value, index) => (
						<li
							key={index}
							className={categories === index ? "active" : ""}
							onClick={() => onClickCategories(index)}
						>
							{value}
						</li>
					))}
				</ul>
			</div>
		);
	}
);

export default Categories;
