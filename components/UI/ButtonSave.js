import React, { useContext } from "react";
import saveIcon from "../../public/images/save.svg";
import styles from "./ButtonAdd.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import LanguageContext from "../../helper/store/contexts/language-context";
const ButtonAdd = (props) => {
	const router = useRouter();
	const { lng } = useContext(LanguageContext);
	return (
		<button
			className={styles.myButton}
			type={props.type || "button"}
			onClick={props.onClick}
			style={props.customStyle}
			disabled={props.disabled}
		>
			<Image src={saveIcon} alt="add preparation" />
			{lng("Save")}
			{props.children}
		</button>
	);
};

export default ButtonAdd;
