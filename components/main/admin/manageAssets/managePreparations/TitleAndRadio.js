import React, { useContext } from "react";
import LanguageContext from "../../../../../helper/store/language-context";
import Input from "../../../../UI/Input";
import RadioButton from "../../../../UI/RadioButton";

import styles from "./CommonPreparationsList.module.css";

function TitleAndRadio({ preparationsInputs, dispatchPreparationsAction }) {
	const { lng } = useContext(LanguageContext);
	return (
		<div className={styles.titleAndRadio}>
			<Input
				id="prepTitle"
				label={lng("Title")}
				value={preparationsInputs.title}
				onChange={(e) => {
					dispatchPreparationsAction({
						type: "setTitle",
						newTitleValue: e.target.value,
					});
				}}
			/>
			<div
				onChange={(e) =>
					dispatchPreparationsAction({
						type: "setCommon",
						newValue: e.target.value,
					})
				}
				className={styles.radioSection}
			>
				<RadioButton
					name="preparationCategory"
					label={lng("Common")}
					value={true}
					checked={preparationsInputs.common == true}
				/>
				<RadioButton
					name="preparationCategory"
					label={lng("Unique")}
					value={false}
					checked={preparationsInputs.common == false}
				/>
			</div>
		</div>
	);
}

export default TitleAndRadio;
