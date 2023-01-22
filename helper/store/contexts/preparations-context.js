import { createContext, useState, useReducer, useEffect } from "react";
import { useRouter } from "next/router.js";
import {
	preparationsReducer,
	preparationsSample,
} from "../../store/reducers/manage-preparations-reducer.js";

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

export function PreparationsContextProvider({
	allPreparations,
	info,
	setInfo,
	infoMessage,
	children,
}) {
	const [activePreparationsList, setActivePreparationsList] =
		useState(allPreparations);
	const [previousTitle, setPreviousTitle] = useState(null);

	const [actionLoaded, setActionLoaded] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	function checkFieldValidity() {
		if (preparationsInputs.title.trim() === "") {
			setInfo({ type: "error", text: "Title field is empty" });
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

	/*************************************************************
	 * 	ADD ITEM
	 **************************************************************/

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

		const prepPostRes = await fetch("/api/admin/manage-preparations", {
			method: "POST",
			headers: { "Content-Type": "application-json" },
			body: JSON.stringify(preparationsInputs),
		});
		if (prepPostRes.ok) {
			let data = await prepPostRes.json();

			const toAdd = { ...preparationsInputs, _id: data.item._id };
			setActivePreparationsList([...activePreparationsList, toAdd]);
			dispatchPreparationsAction({ type: "resetAll" });
			infoMessage(data.type, data.text);
		} else {
			infoMessage("error", "Something went wrong!");
		}
	}

	/*************************************************************
	 * 	EDIT ITEM
	 **************************************************************/

	function setEditItem(e, item) {
		if (item.title == "---") {
			return;
		}
		setInfo(null);
		setActionLoaded("editPreparation");
		setPreviousTitle(item.title);
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

		const prepPutRes = await fetch("/api/admin/manage-preparations", {
			method: "PUT",
			headers: { "Content-Type": "application-json" },
			body: JSON.stringify({
				item: preparationsInputs,
				previousTitle: previousTitle,
			}),
		});
		if (prepPutRes.ok) {
			let data = await prepPutRes.json();
			console.log(data);

			setActionLoaded(null);
			setActivePreparationsList([...filteredArray, preparationsInputs]);
			dispatchPreparationsAction({ type: "resetAll" });
			setPreviousTitle(null);
			infoMessage(data.type, data.text);
		} else {
			infoMessage("error", "Something went wrong!");
		}
	}

	/*************************************************************
	 * 	DELETE ITEM
	 **************************************************************/

	async function deleteItem(e, item) {
		if (item.title == "---") {
			return;
		}

		setActivePreparationsList([
			...activePreparationsList.filter((it) => it._id != item._id),
		]);
		console.log(item._id);

		const prepDelRes = await fetch("/api/admin/manage-preparations", {
			method: "DELETE",
			headers: { "Content-Type": "application-json" },
			body: JSON.stringify({ _id: item._id }),
		});
		if (prepDelRes.ok) {
			let data = await prepDelRes.json();
			console.log(data);
			infoMessage(data.type, data.text);
			setActionLoaded(null);
			dispatchPreparationsAction({ type: "resetAll" });
		} else {
			infoMessage("error", "Something went wrong!");
		}
	}

	const preparationsContext = {
		actionLoaded,
		activePreparationsList,
		checkFieldValidity,
		deleteItem,
		dispatchPreparationsAction,
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
