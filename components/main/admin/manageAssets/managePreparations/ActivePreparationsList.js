import React, { useContext } from "react";
import LanguageContext from "../../../../../helper/store/contexts/language-context";
import PreparationsContext from "../../../../../helper/store/contexts/preparations-context";
import ResponsiveItem from "../../../../UI/ResponsiveItem";
import styles from "./CommonPreparationsList.module.css";

function ActivePreparationsList() {
	const {
		activePreparationsList,
		preparationsInputs,
		deleteItem,
		saveUpdatedItem,
		setEditItem,
	} = useContext(PreparationsContext);
	const { lng } = useContext(LanguageContext);

	return (
		<div className={styles.activePreparations}>
			<div>
				<h4>{lng("Common")}</h4>
				<div className={styles.preparationItems}>
					{activePreparationsList
						.filter((a) => a.common)
						.sort((a, b) => (a.title > b.title ? 1 : -1))
						.map((pr) => (
							<ResponsiveItem
								key={pr._id}
								tier2={pr.id}
								helperValue={preparationsInputs._id}
								editItemHandler={(e) => setEditItem(e, pr)}
								saveItemHandler={(e) => saveUpdatedItem(e, pr)}
								deleteItemHandler={(e) => deleteItem(e, pr)}
							>
								{pr.title}
							</ResponsiveItem>
						))}
				</div>
			</div>
			<div>
				<h4>{lng("Unique")}</h4>
				<div className={styles.preparationItems}>
					{activePreparationsList
						.filter((a) => !a.common)
						.sort((a, b) => (a.title > b.title ? 1 : -1))

						.map((pr) => (
							<ResponsiveItem
								key={pr._id}
								tier2={pr._id}
								helperValue={preparationsInputs._id}
								editItemHandler={(e) => setEditItem(e, pr)}
								saveItemHandler={(e) => saveUpdatedItem(e, pr)}
								deleteItemHandler={(e) => deleteItem(e, pr)}
							>
								{pr.title}
							</ResponsiveItem>
						))}
				</div>
			</div>
		</div>
	);
}

export default ActivePreparationsList;
