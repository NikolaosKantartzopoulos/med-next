import React from "react";

import Image from "next/image";

import deleteIcon from "../../public/images/delete.svg";
import editIcon from "../../public/images/edit.svg";
import saveIcon from "../../public/images/save.svg";

import styles from "./ResponsiveItem.module.css";

function ResponsiveItem(props) {
	return (
		<button
			className={styles.responsiveItem}
			type={props.type || "button"}
			onClick={props.onClick}
			style={props.customStyles}
		>
			<div>{props.children}</div>
			<div className={styles.manageIcons}>
				{props.helperValue === props.tier2 ? (
					<Image
						src={saveIcon}
						alt="save"
						className={styles.image}
						onClick={(e) => props.saveItemHandler(e, props.tier1, props.tier2)}
					/>
				) : (
					<Image
						src={editIcon}
						alt="edit"
						className={styles.image}
						onClick={(e) => props.editItemHandler(e, props.tier1, props.tier2)}
					/>
				)}
				<Image
					src={deleteIcon}
					alt="delete"
					className={styles.image}
					onClick={(e) => props.deleteItemHandler(e, props.tier1, props.tier2)}
				/>
			</div>
		</button>
	);
}

export default ResponsiveItem;
