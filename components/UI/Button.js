import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
	return (
		<button
			className={classes.myButton}
			type={props.type || "button"}
			onClick={props.onClick}
			style={props.customStyles}
		>
			{props.children}
		</button>
	);
};

export default Button;
