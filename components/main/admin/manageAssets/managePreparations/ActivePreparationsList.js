import React, { useContext } from "react";
import PreparationsContext from "../../../../../helper/store/preparations-context";
import ResponsiveItem from "../../../../UI/ResponsiveItem";
import styles from "./CommonPreparationsList.module.css";

function ActivePreparationsList() {
	const {
		activeItem,
		activePreparationsList,
		deleteItem,
		saveUpdatedItem,
		setEditItem,
	} = useContext(PreparationsContext);
	return (
		<div className={styles.activePreparations}>
			<div>
				<h4>Common</h4>
				<div className={styles.preparationItems}>
					{activePreparationsList
						.filter((a) => a.common)
						.map((pr) => (
							<ResponsiveItem
								key={pr._id}
								tier2={pr.title}
								helperValue={activeItem ? activeItem.title : ""}
								editItemHandler={(e) => setEditItem(e, pr)}
								saveItemHandler={saveUpdatedItem}
								deleteItemHandler={(e) => deleteItem(e, pr)}
							>
								{pr.title}
							</ResponsiveItem>
						))}
				</div>
			</div>
			<div>
				<h4>Unique</h4>
				<div className={styles.preparationItems}>
					{activePreparationsList
						.filter((a) => !a.common)
						.map((pr) => (
							<ResponsiveItem
								key={pr._id}
								tier2={pr.title}
								helperValue={activeItem ? activeItem.title : ""}
								editItemHandler={(e) => setEditItem(e, pr)}
								saveItemHandler={saveUpdatedItem}
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
