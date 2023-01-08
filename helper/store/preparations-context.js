import { createContext, useState, useReducer, useEffect } from "react";
import { useRouter } from "next/router.js";
import {
	preparationsReducer,
	preparationsSample,
} from "../store/reducers/manage-preparations-reducer.js";

import uuid from "react-uuid";

const PreparationsContext = createContext({
	actionLoaded: "",
	activePreparationsList: [],
	checkFieldValidity: () => {},
	deleteItem: () => {},
	dispatchPreparationsAction: () => {},
	handlePost: () => {},
	info: {},
	isLoading: false,
	preparationsInputs: {},
	saveAddItem: () => {},
	saveUpdatedItem: () => {},
	setActionLoaded: () => {},
	setActivePreparationsList: () => {},
	setAddItem: () => {},
	setEditItem: () => {},
	setInfo: {},
});

export function PreparationsContextProvider({ allPreparations, children }) {
	const [activePreparationsList, setActivePreparationsList] =
		useState(allPreparations);
	const [actionLoaded, setActionLoaded] = useState(null);
	const [info, setInfo] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

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
		dispatchPreparationsAction({
			type: "setItem",
			item: item,
		});
	}

	async function saveUpdatedItem() {
		if (!checkFieldValidity()) {
			return;
		}

		const filteredArray = activePreparationsList.filter(
			(a) => a._id != preparationsInputs._id
		);

		setActivePreparationsList([...filteredArray, preparationsInputs]);
		await handlePost([...filteredArray, preparationsInputs]);
		setActionLoaded(null);
	}

	function setAddItem() {
		setInfo(null);
		setActionLoaded("addPreparation");
		dispatchPreparationsAction({ type: "resetAll" });
	}

	async function saveAddItem() {
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
		await handlePost([...activePreparationsList, toAdd]);
		dispatchPreparationsAction({ type: "resetAll" });
		// setInfo({ type: "good", text: "Entry submited" });
		// setTimeout(() => setInfo(null), 3000);
	}

	async function deleteItem(e, item) {
		setActivePreparationsList([
			...activePreparationsList.filter((it) => it._id != item._id),
		]);
		await handlePost([
			...activePreparationsList.filter((it) => it._id != item._id),
		]);
	}

	async function handlePost(these) {
		dispatchPreparationsAction({ type: "resetAll" });

		setIsLoading(true);

		const response = await fetch("/api/admin/manage-preparations", {
			method: "POST",
			body: JSON.stringify({ entry: these }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		if (response.ok) {
			setInfo({ type: "ok", text: "Changes submited" });
			setTimeout(() => {
				setInfo(null);
				router.reload();
			}, 3000);
		}
		setIsLoading(false);
	}

	const preparationsContext = {
		actionLoaded,
		activePreparationsList,
		checkFieldValidity,
		deleteItem,
		dispatchPreparationsAction,
		handlePost,
		info,
		isLoading,
		preparationsInputs,
		saveAddItem,
		saveUpdatedItem,
		setActionLoaded,
		setActivePreparationsList,
		setAddItem,
		setEditItem,
		setInfo,
	};

	return (
		<PreparationsContext.Provider value={preparationsContext}>
			{children}
		</PreparationsContext.Provider>
	);
}

export default PreparationsContext;
