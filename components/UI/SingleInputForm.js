import React from "react";

import Button from "./Button";
import Input from "./Input.js";

import styles from "./SingleInputForm.module.css";

function SingleInputForm({
	id,
	label,
	onSubmit,
	onClick,
	value,
	onChange,
	buttonText = "Submit",
	type = "submit",
	customStyle,
}) {
	return (
		<>
			{type == "submit" && (
				<form className={styles.SingleInputFormDiv} onSubmit={onSubmit}>
					<Input
						id={id}
						label={label}
						value={value}
						customStyle={customStyle}
						onChange={onChange}
					/>
					<Button type="submit">{buttonText}</Button>
				</form>
			)}
			{type != "submit" && (
				<div className={styles.SingleInputFormDiv} onClick={onClick}>
					<Input
						id={id}
						label={label}
						value={value}
						customStyle={customStyle}
						onChange={onChange}
					/>
					<Button type="button">{buttonText}</Button>
				</div>
			)}
		</>
	);
}

export default SingleInputForm;
