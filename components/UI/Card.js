import React, { useContext } from "react";

import cardCSS from "./Card.module.css";

import ThemeContext from "../../assets/store/themeContext";

function Card(props) {
	const themeCtx = useContext(ThemeContext);

	const classesSelected = `${
		themeCtx.darkThemeEnabled ? cardCSS.cardDarkTheme : cardCSS.card
	} ${props.className}`;

	return (
		<div className={classesSelected} style={props.customStyles}>
			{props.children}
		</div>
	);
}

export default Card;
