import React, { useState } from "react";
import { useRouter } from "next/router";

import SingleInputForm from "../../../UI/SingleInputForm.js";

import useControlAsset from "../../../../helper/fn/useControlAsset";

import styles from "./ManageAssetsComponent.module.css";
import ListExistingAssets from "./ListExistingAssets.js";
import Button from "../../../UI/Button.js";

function ManageAssetsComponent({ props }) {
	const router = useRouter();
	const [info, setInfo] = useState("");
	const { allUsers, allBuildings, allDepartments } = props;

	const [
		newBuilding,
		setNewBuilding,
		activeBuildings,
		removedBuildings,
		dispatchBuildingsAction,
		buildingSubmitHandler,
	] = useControlAsset(allBuildings.map((a) => a.address));

	async function submitBuildingsHandler(e) {
		e.preventDefault();
		dispatchBuildingsAction({
			type: "addEntry",
			newEntryValue: newBuilding,
		});
		let initialAddresses = allBuildings.map((a) => a.address);
		let filteredAddresses = activeBuildings.filter(
			(active) => !initialAddresses.includes(active)
		);
		let addressesToAdd = filteredAddresses.map((entry) => ({
			building: { address: entry },
		}));
		if (addressesToAdd.length > 0) {
			const toPost = {
				type: "buildings",
				addressesToAdd: addressesToAdd,
			};
			const result = await fetch("/api/admin/add-asset", {
				method: "POST",
				body: JSON.stringify(toPost),
				headers: {
					"Content-Type": "application/json",
				},
			});
			router.reload();
		}
	}

	async function deleteBuildingHandler(e, delBuilding) {
		const toDelete = {
			type: "buildings",
			toDel: { building: { address: delBuilding } },
		};

		const result = await fetch("/api/admin/add-asset", {
			method: "DELETE",
			body: JSON.stringify(toDelete),
			headers: {
				"Content-Type": "application/json",
			},
		});
		router.reload();
	}

	return (
		<>
			{info && <p>{info}</p>}
			<div className={styles.ManageAssetsComponentInputs}>
				<SingleInputForm
					id="building"
					label="Manage Buildings"
					onSubmit={submitBuildingsHandler}
					value={newBuilding}
					onChange={(e) => setNewBuilding(e.target.value)}
				/>
				<ListExistingAssets
					activeEntries={activeBuildings}
					removedEntries={removedBuildings}
					dispatchAssetsAction={dispatchBuildingsAction}
					deleteBuildingHandler={deleteBuildingHandler}
				/>
			</div>
		</>
	);
}

export default ManageAssetsComponent;
