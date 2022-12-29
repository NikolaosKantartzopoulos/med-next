import React, { useState, useReducer } from "react";
import uuid from "react-uuid";
import "../../../../UI/ResponsiveItem";

import {
	preparationsReducer,
	preparationsSample,
} from "../../../../../helper/store/reducers/manage-preparations-reducer.js";

import TitleAndRadio from "./TitleAndRadio.js";

import InfoPanel from "../../../../UI/InfoPanel";
import Textarea from "../../../../UI/Textarea";
import PreparationsUI from "./PreparationsUI";
import ActivePreparationsList from "./ActivePreparationsList.js";

import styles from "./CommonPreparationsList.module.css";
import Button from "../../../../UI/Button";

function CommonPreparationsList({ allPreparations }) {
	const [activePreparationsList, setActivePreparationsList] =
		useState(allPreparations);
	const [activeItem, setActiveItem] = useState(null);
	const [actionLoaded, setActionLoaded] = useState(null);
	const [info, setInfo] = useState(null);

	function checkFieldValidity() {
		if (preparationsInputs.title.trim() === "") {
			setInfo({ type: "error", text: "Title filed is empty" });
			return false;
		}
		if (preparationsInputs.details.trim() === "") {
			setInfo({ type: "error", text: "Details field is empty" });
			return false;
		}
		return true;
	}

	const [preparationsInputs, dispatchPreparationsAction] = useReducer(
		preparationsReducer,
		preparationsSample
	);

	function setEditItem(e, item) {
		setInfo(null);
		setActionLoaded("editPreparation");
		setActiveItem(item);
		dispatchPreparationsAction({
			type: "setItem",
			item: item,
		});
	}

	function saveUpdatedItem() {
		if (!checkFieldValidity()) {
			return;
		}

		const foundItem = activePreparationsList.find(
			(a) => a._id == activeItem._id
		);
		const filteredArray = activePreparationsList.filter(
			(a) => a._id != activeItem._id
		);

		setActivePreparationsList([
			...[...filteredArray, preparationsInputs].sort((a, b) =>
				a.title > b.title ? 1 : -1
			),
		]);

		dispatchPreparationsAction({ type: "resetAll" });
		setActionLoaded(null);
		setActiveItem(null);
	}

	function setAddItem() {
		setInfo(null);
		setActionLoaded("addPreparation");
		dispatchPreparationsAction({ type: "resetAll" });
	}

	function saveAddItem() {
		if (!checkFieldValidity()) {
			return;
		}

		const titlesArray = activePreparationsList.map((a) => a.title);
		if (titlesArray.includes(preparationsInputs.title.trim())) {
			setInfo({ type: "error", text: "Existing title" });
			return;
		}
		const toAdd = { ...preparationsInputs, _id: uuid() };
		setActivePreparationsList([...activePreparationsList, toAdd]);
		dispatchPreparationsAction({ type: "resetAll" });
		setInfo({ type: "good", text: "Entry submited" });
		setTimeout(() => setInfo(null), 3000);
	}

	function deleteItem(e, item) {
		setActivePreparationsList(
			activePreparationsList.filter((it) => it._id != item._id)
		);
	}

	async function handlePost() {
		const response = await fetch("/api/admin/manage-preparations", {
			method: "POST",
			body: JSON.stringify(activePreparationsList),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		console.log(data);
	}

	return (
		<section className={styles.managePreparationsSection}>
			<Button
				onClick={handlePost}
				customStyle={{ margin: "auto", position: "absolute", right: 0, top: 0 }}
			>
				Submit
			</Button>
			<div className={styles.managePreparationsUI}>
				<PreparationsUI
					setAddItem={setAddItem}
					saveAddItem={saveAddItem}
					activeItem={activeItem}
					saveUpdatedItem={saveUpdatedItem}
					actionLoaded={actionLoaded}
					setActionLoaded={setActionLoaded}
					setInfo={setInfo}
					preparationsInputs={preparationsInputs}
					dispatchPreparationsAction={dispatchPreparationsAction}
					setActiveItem={setActiveItem}
				/>
				{(actionLoaded == "addPreparation" ||
					actionLoaded == "editPreparation") && (
					<>
						<Textarea
							id="prepDetails"
							label="Details"
							value={preparationsInputs.details}
							rows={10}
							columns={40}
							onChange={(e) => {
								setInfo(null);
								dispatchPreparationsAction({
									type: "setDetails",
									newDetailsValue: e.target.value,
								});
							}}
						/>
					</>
				)}
			</div>
			<InfoPanel info={info} />
			<ActivePreparationsList
				setActionLoaded={setActionLoaded}
				activePreparationsList={activePreparationsList}
				activeItem={activeItem}
				setActiveItem={setActiveItem}
				dispatchPreparationsAction={dispatchPreparationsAction}
				saveUpdatedItem={saveUpdatedItem}
				setEditItem={setEditItem}
				deleteItem={deleteItem}
			/>
		</section>
	);
}

export default CommonPreparationsList;
