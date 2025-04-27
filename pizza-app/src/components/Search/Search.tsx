import React, { useContext, useRef, useCallback, useState } from "react";
import style from "./Search.module.scss";
import search from "./search.png";
import { SearchContext } from "../../App";
import debounce from "lodash.debounce";

const Search = () => {
	const contexSearch = useContext(SearchContext) ;
	const [input, setInput] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

    if (!contexSearch ) {
        return <div>Ошибка</div>
    }

    const { setSearchValue } = contexSearch

	const onClickClear = () => {
		setSearchValue("");
		setInput("");
		inputRef.current?.focus();
	};

	const requestDebounce = useCallback(
		debounce((value) => {
			setSearchValue(value);
		}, 500),
		[]
	);

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInput(event.target.value);
		requestDebounce(event.target.value);
	};

	return (
		<div className={style.container}>
			<img className={style.icon} src={search} alt="" />
			<input
				ref={inputRef}
				id="searchInput"
				value={input}
				onChange={onChangeInput}
				className={style.root}
				type="text"
				placeholder="Enter pizza..."
			/>
			{input && (
				<p onClick={onClickClear} className={style.iconClear}>
					×
				</p>
			)}
		</div>
	);
};

export default Search;
