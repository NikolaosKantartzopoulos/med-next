import React, { useState } from "react";

import Image from "next/image";

import deleteIcon from "../../public/images/delete.svg";
import editIcon from "../../public/images/edit.svg";

import styles from "./ResponsiveItem.module.css";

function ResponsiveItem(props) {
	const [responsiveItemState, setResponsiveItemState] = useState(props);

	return (
		<button
			className={styles.responsiveItem}
			type={props.type || "button"}
			onClick={props.onClick}
			style={props.customStyles}
		>
			<div>{responsiveItemState}</div>
			<div className={styles.manageIcons}>
				<Image
					src={editIcon}
					alt="edit"
					className={styles.image}
					onClick={(e) => props.editItemHandler(e, props.tier1, props.tier2)}
				/>
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
