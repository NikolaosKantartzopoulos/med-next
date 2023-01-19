import React, { useContext } from "react";
import ClickableItem from "../../../../UI/ClickableItem";
import Image from "next/image";
import LanguageContext from "../../../../../helper/store/contexts/language-context";
import styles from "./ListExistingAssets.module.css";
import deleteIcon from "../../../../../public/images/delete.svg";

function ListExistingBuildings({ allBuildings, deleteBuildingHandler }) {
	const addresses = allBuildings.map((b) => b.address);
	const { lng } = useContext(LanguageContext);
	return (
		<div className={styles.entries}>
			<p className={styles.titleDivision}>{lng("ExistingBuildings")}</p>
			{allBuildings
				.sort((a, b) => (a.address < b.address ? 1 : -1))
				.map((b) => (
					<ClickableItem key={b.address}>
						{b.address}
						<Image
							src={deleteIcon}
							alt="delete"
							onClick={(e) => deleteBuildingHandler(e, b)}
						/>
					</ClickableItem>
				))}
		</div>
	);
}

export default ListExistingBuildings;
