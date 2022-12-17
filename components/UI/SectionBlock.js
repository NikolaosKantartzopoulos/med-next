import React, { useContext } from "react";

import ThemeContext from "../../assets/store/themeContext";

import styles from "./SectionBlock.module.css";

function SectionBlock({ title, children, addedClasses, childClasses }) {
	const themeCtx = useContext(ThemeContext);
	const classString = `${addedClasses} ${
		themeCtx.darkThemeEnabled ? styles.edgeDark : styles.edge
	}`;
	return (
		<section className={classString}>
			<h1>{title}</h1>
			<div className={childClasses}>{children}</div>
		</section>
	);
}

export default SectionBlock;
