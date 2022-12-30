import React from "react";
import Image from "next/image";

import closeIcon from "../../public/images/close.svg";

import styles from "./ButtonClose.module.css";

const ButtonClose = (props) => {
	return (
		<button
			className={styles.myButton}
			type={props.type || "button"}
			onClick={props.onClick}
			style={props.customStyle}
		>
			<Image
				src={closeIcon}
				alt="close"
				style={{ position: "relative", left: "8px" }}
			/>
			{props.children}
		</button>
	);
};

export default ButtonClose;
