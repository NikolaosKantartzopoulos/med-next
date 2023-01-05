import React, { useContext, useState } from "react";
import { useRouter } from "next/router";

import ListExistingBuildings from "./ListExistingBuildings";

import SingleInputForm from "../../../../../components/UI/SingleInputForm";
import InfoPanel from "../../../../../components/UI/InfoPanel.js";
import LoadingSpinner from "../../../../../components/UI/LoadingSpinner.js";
import UrlContext from "../../../../../helper/store/url-context";

function ManageBuildings({ allBuildings }) {
	const { buildingsAPIURL } = useContext(UrlContext);
	const router = useRouter();
	const [activeBuildings, setActiveBuildings] = useState(allBuildings);
	const [newBuilding, setNewBuilding] = useState("");
	const [info, setInfo] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	async function addNewBuildingHandler(e) {
		e.preventDefault();
		if (newBuilding.trim() === "") {
			setInfo({ type: "error", text: "Field is empty" });
			return;
		}
		setActiveBuildings([...activeBuildings, { address: newBuilding }]);

		let toPost = { address: newBuilding };
		try {
			setIsLoading(true);
			let response = await fetch(buildingsAPIURL, {
				method: "POST",
				body: JSON.stringify(toPost),
				headers: {
					"Content-Type": "application/json",
				},
			});
			let data = await response.json();
			setIsLoading(false);
			setInfo({ type: "good", text: "Building Submited" });
			setTimeout(() => setInfo(null), 3000);
		} finally {
			router.reload();
		}
	}

	async function deleteBuildingHandler(e, deleteAddress) {
		e.preventDefault();
		setIsLoading(true);
		const newValue = activeBuildings.filter((b) => b.address !== deleteAddress);
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
			setIsLoading(false);
		} finally {
			setInfo({ type: "good", text: "Building Deleted" });
			setTimeout(() => setInfo(null), 3000);
			setTimeout(() => router.reload(), 3100);
		}
	}
	return (
		<div>
			{isLoading && <LoadingSpinner />}
			{!isLoading && (
				<>
					<SingleInputForm
						id="buildingsInput"
						label="Add"
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
				</>
			)}
		</div>
	);
}

export default ManageBuildings;
