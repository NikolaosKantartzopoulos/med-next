import React, { useContext, useState } from "react";
import { useRouter } from "next/router";

import LanguageContext from "../../../../../helper/store/contexts/language-context";
import ToolsContext from "../../../../../helper/store/contexts/tools-context";

import ListExistingBuildings from "./ListExistingBuildings";

import SingleInputForm from "../../../../../components/UI/SingleInputForm";
import LoadingSpinner from "../../../../../components/UI/LoadingSpinner.js";

function ManageBuildings({ allBuildings }) {
	const router = useRouter();

	const { info, setInfo } = useContext(ToolsContext);
	const { lng } = useContext(LanguageContext);

	const [activeBuildings, setActiveBuildings] = useState(allBuildings);
	const [newBuilding, setNewBuilding] = useState("");
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
			let response = await fetch("/api/admin/manage-buildings", {
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

	async function deleteBuildingHandler(e, item) {
		e.preventDefault();
		setIsLoading(true);
		console.log(item);
		// let toDel = { toDel_id: item._id };
		let toDel = { item: item };

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
						label={lng("Add")}
						buttonText={lng("Add")}
						onSubmit={(e) => addNewBuildingHandler(e)}
						value={newBuilding}
						onChange={(e) => {
							setInfo(null);
							setNewBuilding(e.target.value);
						}}
					/>
					<ListExistingBuildings
						allBuildings={activeBuildings}
						deleteBuildingHandler={deleteBuildingHandler}
					/>
				</>
			)}
		</div>
	);
}

export default ManageBuildings;
