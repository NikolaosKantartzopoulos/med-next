import React from "react";

import styles from "./Input.module.css";

function Input(props) {
	const allClasses = `${props.className} ${styles.inputComp} `;
	return (
		<div className={allClasses}>
			<label htmlFor={props.id} className={styles.labelComp}>
				{props.label}
			</label>
			{props.type != "textarea" && (
				<input
					id={props.id}
					type={props.type}
					value={props.value}
					className={styles.inputComp}
					onChange={props.onChange}
				>
					{props.children}
				</input>
			)}
			{props.type == "textarea" && (
				<textarea
					id={props.id}
					type={props.type}
					className={styles.inputComp}
					value={props.value}
					rows={props.rows}
					cols={props.columns}
					onChange={props.onChange}
				>
					{props.children}
				</textarea>
			)}
		</div>
	);
}

export default Input;
