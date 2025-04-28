import React, { useEffect, useRef } from "react";

type SortProps = {
	sortValuse: { name: string; sortProperty: string };
	onClickSort: (index: { name: string; sortProperty: string }) => void;
};

const Sort: React.FC<SortProps> = React.memo(({ sortValuse, onClickSort }) => {
	const [open, setOpen] = React.useState(false);

	function onClickSelected(index: { name: string; sortProperty: string }) {
		onClickSort(index);
		setOpen(false);
	}

	const sortRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
				setOpen(false);
			}
		};

		document.body.addEventListener("click", handleClickOutside);

		return () => {
			document.body.removeEventListener("click", handleClickOutside);
		};
	}, []);

	const list = [
		{ name: "популярности (Убывание)", sortProperty: "rating" },
		{ name: "популярности (Возрастание)", sortProperty: "-rating" },
		{ name: "цене (Убывание)", sortProperty: "price" },
		{ name: "цене (Возрастание)", sortProperty: "-price" },
		{ name: "алфавиту (Убывание)", sortProperty: "title" },
		{ name: "алфавиту (Возрастание)", sortProperty: "-title" },
	];

	return (
		<div className="sort" ref={sortRef}>
			<div className="sort__label">
				<svg
					width="10"
					height="6"
					viewBox="0 0 10 6"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
						fill="#2C2C2C"
					/>
				</svg>
				<b>Сортировка по:</b>
				<span onClick={() => setOpen((prev) => !prev)}>{sortValuse.name}</span>
			</div>
			<div className={open ? "sort__popup" : ""}>
				<ul>
					{open &&
						list.map((obj, index) => (
							<li
								onClick={() => onClickSelected(obj)}
								className={
									sortValuse.sortProperty === obj.sortProperty ? "active" : ""
								}
								key={index}
							>
								{obj.name}
							</li>
						))}
				</ul>
			</div>
		</div>
	);
});

export default Sort;
