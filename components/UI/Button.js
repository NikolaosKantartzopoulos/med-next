import React, { useContext } from "react";
import ToolsContext from "../../helper/store/contexts/tools-context";

import styles from "./Button.module.css";

const Button = (props) => {
	const { theme } = useContext(ToolsContext);
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
