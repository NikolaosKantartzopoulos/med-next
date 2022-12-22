import React from "react";

import styles from "./ClickableItem.module.css";

function ClickableItem(props) {
	return (
		<button
			className={styles.clickableItem}
			type={props.type || "button"}
			onClick={props.onClick}
			style={props.customStyles}
		>
			{props.children}
		</button>
	);
}

export default ClickableItem;
