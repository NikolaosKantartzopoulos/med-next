import React from "react";

import styles from "./Button.module.css";

const Button = (props) => {
	return (
		<button
			className={styles.myButton}
			type={props.type || "button"}
			onClick={props.onClick}
			style={props.customStyle}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	);
};

export default Button;
