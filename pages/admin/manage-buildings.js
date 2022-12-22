import React, { useState } from "react";
import { useRouter } from "next/router";

import ListExistingBuildings from "../../components/main/admin/manageAssets/ListExistingBuildings";

import SingleInputForm from "../../components/UI/SingleInputForm";

import { connectDatabase } from "../../helper/database/db";

function ManageBuildings({ allBuildings }) {
	const router = useRouter();
	const [newBuilding, setNewBuilding] = useState("");

	async function addNewBuildingHandler(e) {
		e.preventDefault();
		if (newBuilding.trim() === "") return;
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
		} finally {
			router.reload();
		}
	}

	async function deleteBuildingHandler(e, deleteAddress) {
		e.preventDefault();
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
			console.log(data);
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
				allBuildings={allBuildings}
				deleteBuildingHandler={deleteBuildingHandler}
			/>
		</div>
	);
}

export default ManageBuildings;

export async function getStaticProps() {
	const [client, db] = await connectDatabase();
	const data = await db
		.collection("assets")
		.find({ building: { $exists: true } })
		.project({ _id: 0 })
		.toArray();
	return { props: { allBuildings: data } };
}
