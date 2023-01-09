import React, { useContext } from "react";
import EcoContext from "../../../../../helper/store/contexts/eco-context.js";
import ButtonClose from "../../../../UI/ButtonClose";
import Button from "../../../../UI/Button";
import Image from "next/image";
import LanguageContext from "../../../../../helper/store/contexts/language-context.js";

import addIcon from "../../../../../public/images/plus.svg";
import saveIcon from "../../../../../public/images/save.svg";
import { useRouter } from "next/router.js";
import styles from "./ManageEcoUI.module.css";

function ManageEcoUI() {
	const { lng } = useContext(LanguageContext);
	const {
		saveEditedItem,
		setAddItem,
		saveAddItem,
		actionLoaded,
		dispatchEcoReducerAction,
		setActionLoaded,
		setInfo,
	} = useContext(EcoContext);
	const router = useRouter();
	return (
		<div className={styles.headerBar}>
			<div className={styles.buttonSection}>
				{actionLoaded === null && (
					<>
						<Button onClick={setAddItem} customStyle={{ width: "8rem" }}>
							<Image src={addIcon} alt="add preparation" />
							{lng("Add")}
						</Button>
					</>
				)}
				{actionLoaded === "addEco" && (
					<Button onClick={saveAddItem} customStyle={{ width: "8rem" }}>
						<Image src={saveIcon} alt="save preparation" />
						{lng("Save")}
					</Button>
				)}
				{actionLoaded == "editEco" && (
					<Button onClick={saveEditedItem} customStyle={{ width: "8rem" }}>
						<Image src={addIcon} alt="submit edited preparation" />
						{lng("Update")}
					</Button>
				)}
				{(actionLoaded === "addEco" || actionLoaded === "editEco") && (
					<ButtonClose
						onClick={() => {
							dispatchEcoReducerAction({ type: "resetAll" });
							setActionLoaded(null);
							setInfo(null);
						}}
						customStyle={{ width: "8rem" }}
					/>
				)}
			</div>
		</div>
	);
}

export default ManageEcoUI;
