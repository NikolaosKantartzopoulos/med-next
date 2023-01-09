import React, { useContext } from "react";

import TitleAndRadio from "./TitleAndRadio";

import ButtonClose from "../../../../UI/ButtonClose";
import Button from "../../../../UI/Button";
import Image from "next/image";

import addIcon from "../../../../../public/images/plus.svg";
import saveIcon from "../../../../../public/images/save.svg";
import styles from "./CommonPreparationsList.module.css";
import PreparationsContext from "../../../../../helper/store/contexts/preparations-context";
import LanguageContext from "../../../../../helper/store/contexts/language-context";

function PreparationsUI() {
	const {
		actionLoaded,
		dispatchPreparationsAction,
		preparationsInputs,
		saveAddItem,
		saveUpdatedItem,
		setActionLoaded,
		setAddItem,
		setInfo,
	} = useContext(PreparationsContext);
	const { lng } = useContext(LanguageContext);

	return (
		<div className={styles.headerBar}>
			<div className={styles.buttonSection}>
				{actionLoaded === null && (
					<Button onClick={setAddItem} customStyle={{ width: "8rem" }}>
						<Image src={addIcon} alt="add preparation" />
						{lng("Add")}
					</Button>
				)}
				{actionLoaded === "addPreparation" && (
					<Button onClick={saveAddItem} customStyle={{ width: "8rem" }}>
						<Image src={saveIcon} alt="save preparation" />
						{lng("Add")}
					</Button>
				)}
				{actionLoaded == "editPreparation" && (
					<Button onClick={saveUpdatedItem} customStyle={{ width: "8rem" }}>
						<Image src={addIcon} alt="submit edited preparation" />
						{lng("Update")}
					</Button>
				)}
				{(actionLoaded === "addPreparation" ||
					actionLoaded === "editPreparation") && (
					<ButtonClose
						onClick={() => {
							setActionLoaded(null);
							setInfo(null);
						}}
						customStyle={{ width: "8rem" }}
					/>
				)}
			</div>
			{actionLoaded && (
				<TitleAndRadio
					preparationsInputs={preparationsInputs}
					dispatchPreparationsAction={dispatchPreparationsAction}
				/>
			)}
		</div>
	);
}

export default PreparationsUI;
