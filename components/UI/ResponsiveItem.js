import React from "react";

import Image from "next/image";

import deleteIcon from "../../public/images/delete.svg";
import editIcon from "../../public/images/edit.svg";
import saveIcon from "../../public/images/save.svg";

import styles from "./ResponsiveItem.module.css";

function ResponsiveItem({
	onClick,
	editItemHandler,
	saveItemHandler,
	deleteItemHandler,
	tier1,
	tier2,
	helperValue,
	customStyles,
	type,
	children,
}) {
	return (
		<button
			className={styles.responsiveItem}
			type={type || "button"}
			onClick={onClick}
			style={customStyles}
		>
			<div>{children}</div>
			<div className={styles.manageIcons}>
				{helperValue === tier2 ? (
					<Image
						src={saveIcon}
						alt="save"
						className={styles.image}
						onClick={(e) => saveItemHandler(e, tier1, tier2)}
					/>
				) : (
					<Image
						src={editIcon}
						alt="edit"
						className={styles.image}
						onClick={(e) => editItemHandler(e, tier1, tier2)}
					/>
				)}
				<Image
					src={deleteIcon}
					alt="delete"
					className={styles.image}
					onClick={(e) => deleteItemHandler(e, tier1, tier2)}
				/>
			</div>
		</button>
	);
}

export default ResponsiveItem;
