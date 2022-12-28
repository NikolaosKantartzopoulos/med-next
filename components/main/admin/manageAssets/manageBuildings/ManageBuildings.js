import React, { useState } from "react";
import { useRouter } from "next/router";

import ListExistingBuildings from "./ListExistingBuildings";

import SingleInputForm from "../../../../../components/UI/SingleInputForm";
import InfoPanel from "../../../../../components/UI/InfoPanel.js";

function ManageBuildings({ allBuildings }) {
	const router = useRouter();
	const [activeBuildings, setActiveBuildings] = useState(allBuildings);
	const [newBuilding, setNewBuilding] = useState("");
	const [info, setInfo] = useState(null);
	console.log(allBuildings);
	async function addNewBuildingHandler(e) {
		e.preventDefault();
		if (newBuilding.trim() === "") {
			setInfo({ type: "error", text: "Field is empty" });
			return;
		}
		setActiveBuildings([
			...activeBuildings,
			{ building: { address: newBuilding } },
		]);

		let toPost = { building: { address: newBuilding } };
		try {
			let response = await fetch("/api/admin/manage-buildings", {
				method: "POST",
				body: JSON.stringify(toPost),
				headers: {
					"Content-Type": "application/json",
				},
			});
			let data = await response.json();
			setInfo({ type: "good", text: "Building Submited" });
			setTimeout(() => setInfo(null), 3000);
		} finally {
			router.reload();
		}
	}

	async function deleteBuildingHandler(e, deleteAddress) {
		e.preventDefault();
		const newValue = activeBuildings.filter(
			(b) => b.building.address !== deleteAddress
		);
		setActiveBuildings(newValue);
		let toDel = { deleteAddress: deleteAddress };
		try {
			let response = await fetch("/api/admin/manage-buildings", {
				method: "DELETE",
				body: JSON.stringify(toDel),
				headers: {
					"Content-Type": "application/json",
				},
			});
			let data = await response.json();
		} finally {
			router.reload();
		}
	}
	return (
		<div>
			<SingleInputForm
				id="buildingsInput"
				label="Add building"
				onSubmit={(e) => addNewBuildingHandler(e)}
				value={newBuilding}
				onChange={(e) => {
					setNewBuilding(e.target.value);
				}}
			/>
			<ListExistingBuildings
				allBuildings={activeBuildings}
				deleteBuildingHandler={deleteBuildingHandler}
			/>
			<InfoPanel info={info}></InfoPanel>
		</div>
	);
}

export default ManageBuildings;
