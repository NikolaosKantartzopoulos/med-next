import React, { useContext } from "react";
import Image from "next/image";

import closeIcon from "../../public/images/close.svg";
import LanguageContext from "../../helper/store/contexts/language-context";

import styles from "./ButtonClose.module.css";

const ButtonClose = (props) => {
	const { lng } = useContext(LanguageContext);
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
			{lng("Close")}
		</button>
	);
};

export default ButtonClose;
