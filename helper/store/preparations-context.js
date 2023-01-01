import { createContext, useState, useReducer } from "react";
import { useRouter } from "next/router.js";
import {
	preparationsReducer,
	preparationsSample,
} from "../store/reducers/manage-preparations-reducer.js";

import uuid from "react-uuid";
import { infoMessage } from "../fn/ui.js";

const PreparationsContext = createContext({
	actionLoaded: "",
	activeItem: {},
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
	setActiveItem: () => {},
	setActivePreparationsList: () => {},
	setAddItem: () => {},
	setEditItem: () => {},
	setInfo: {},
});

export function PreparationsContextProvider({ allPreparations, children }) {
	const [activePreparationsList, setActivePreparationsList] =
		useState(allPreparations);
	const [activeItem, setActiveItem] = useState(null);
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
			...[...filteredArray, { ...preparationsInputs, _id: uuid() }].sort(
				(a, b) => (a.title > b.title ? 1 : -1)
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
		setIsLoading(true);
		const response = await fetch("/api/admin/manage-preparations", {
			method: "POST",
			body: JSON.stringify(activePreparationsList),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		console.log(data);
		setInfo({ type: "ok", text: "Changes submited" });
		setIsLoading(false);
		setTimeout(() => {
			setInfo(null);
			router.reload();
		}, 3000);
	}

	const preparationsContext = {
		actionLoaded,
		activeItem,
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
		setActiveItem,
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
