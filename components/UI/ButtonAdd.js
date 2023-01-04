import React from "react";
import addIcon from "../../public/images/plus.svg";
import styles from "./ButtonAdd.module.css";
import Image from "next/image";

const ButtonAdd = (props) => {
	return (
		<button
			className={styles.myButton}
			type={props.type || "button"}
			onClick={props.onClick}
			style={props.customStyle}
			disabled={props.disabled}
		>
			<Image src={addIcon} alt="add preparation" />
			Add
			{props.children}
		</button>
	);
};

export default ButtonAdd;
