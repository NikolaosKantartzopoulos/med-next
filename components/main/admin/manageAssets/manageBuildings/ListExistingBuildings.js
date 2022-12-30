import React from "react";
import ClickableItem from "../../../../UI/ClickableItem";
import Image from "next/image";

import styles from "./ListExistingAssets.module.css";
import deleteIcon from "../../../../../public/images/delete.svg";

function ListExistingBuildings({ allBuildings, deleteBuildingHandler }) {
	const addresses = allBuildings.map((b) => b.building.address).sort();
	return (
		<div className={styles.entries}>
			<p className={styles.titleDivision}>ExistingBuildings</p>
			{addresses.map((addr) => (
				<ClickableItem key={addr}>
					{addr}
					<Image
						src={deleteIcon}
						alt="delete"
						onClick={(e) => deleteBuildingHandler(e, addr)}
					/>
				</ClickableItem>
			))}
		</div>
	);
}

export default ListExistingBuildings;
