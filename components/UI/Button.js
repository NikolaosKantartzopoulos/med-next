import React, { useContext } from "react";
import ToolsContext from "../../helper/store/contexts/tools-context";

import styles from "./Button.module.css";

const Button = (props) => {
	const { theme } = useContext(ToolsContext);
	return (
		<button
			onClick={props.onClick}
			disabled={props.disabled}
			className={styles.myButton}
			type={props.type || "button"}
			style={props.customStyle}
		>
			{props.children}
		</button>
	);
};

export default Button;
