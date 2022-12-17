import React from "react";

import styles from "./InputDiv.module.css";

function InputDiv(props) {
	return (
		<div className={styles.InputDiv} id={props.id}>
			{props.children}
		</div>
	);
}

export default InputDiv;
