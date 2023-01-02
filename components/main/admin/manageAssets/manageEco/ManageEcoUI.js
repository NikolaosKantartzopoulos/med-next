import React, { useContext } from "react";
import EcoContext from "../../../../../helper/store/eco-context.js";
import ButtonClose from "../../../../UI/ButtonClose";
import Button from "../../../../UI/Button";
import Image from "next/image";

import addIcon from "../../../../../public/images/plus.svg";
import saveIcon from "../../../../../public/images/save.svg";

import styles from "./ManageEcoUI.module.css";

function ManageEcoUI() {
	const {
		saveEditedItem,
		setAddItem,
		saveAddItem,
		actionLoaded,
		dispatchEcoReducerAction,
		setActionLoaded,
		setActiveItem,
		setInfo,
	} = useContext(EcoContext);
	return (
		<div className={styles.headerBar}>
			<div className={styles.buttonSection}>
				{actionLoaded === null && (
					<>
						<Button onClick={setAddItem} customStyle={{ width: "8rem" }}>
							<Image src={addIcon} alt="add preparation" />
							Add
						</Button>
					</>
				)}
				{actionLoaded === "addEco" && (
					<Button onClick={saveAddItem} customStyle={{ width: "8rem" }}>
						<Image src={saveIcon} alt="save preparation" />
						Add
					</Button>
				)}
				{actionLoaded == "editEco" && (
					<Button onClick={saveEditedItem} customStyle={{ width: "8rem" }}>
						<Image src={addIcon} alt="submit edited preparation" />
						Update
					</Button>
				)}
				{(actionLoaded === "addEco" || actionLoaded === "editEco") && (
					<ButtonClose
						onClick={() => {
							dispatchEcoReducerAction({ type: "resetAll" });
							setActiveItem(null);
							setActionLoaded(null);
							setInfo(null);
						}}
						customStyle={{ width: "8rem" }}
					>
						Close
					</ButtonClose>
				)}
			</div>
		</div>
	);
}

export default ManageEcoUI;