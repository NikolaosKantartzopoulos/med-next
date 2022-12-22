import Image from "next/image";
import React, { useEffect } from "react";
import deleteIcon from "../../../../public/images/delete.svg";

import ClickableItem from "../../../UI/ClickableItem";

import styles from "./ListExistingAssets.module.css";

function ListExistingAssets({
	activeEntries,
	removedEntries,
	dispatchAssetsAction,
	deleteBuildingHandler,
}) {
	return (
		<div className={styles.ListExistingAssets}>
			<div className={styles.entries}>
				<div className={styles.titleDivision}>Active</div>
				{activeEntries.map((entry) => (
					<ClickableItem
						key={entry}
						onClick={() => {
							dispatchAssetsAction({
								type: "removeEntry",
								removedEntry: entry,
							});
						}}
					>
						{entry}
					</ClickableItem>
				))}
			</div>
			<div className={styles.entries}>
				<div className={styles.titleDivision}>Removed</div>
				{removedEntries.map((entry) => (
					<ClickableItem
						key={entry}
						onClick={() => {
							dispatchAssetsAction({
								type: "reinstateEntry",
								reinstatedEntry: entry,
							});
						}}
					>
						{entry}
						<Image
							src={deleteIcon}
							alt="bin"
							onClick={(e) => {
								e.stopPropagation();
								deleteBuildingHandler(e, entry);
							}}
						/>
					</ClickableItem>
				))}
			</div>
		</div>
	);
}

export default ListExistingAssets;
