import React from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => {
	return (
		<div className={styles.root}>
			<span>😕</span>
			<h1>Ничего не найдено</h1>
			<p>SZXCZXCZXCxzbnczvnmagdjoighadjghadjgadhjgadhj</p>
		</div>
	);
};

export default NotFoundBlock;
