import { useReducer, useState } from "react";

function controlAssetsReducer(state, action) {
	switch (action.type) {
		case "addEntry":
			if (
				state.activeEntries.includes(action.newEntryValue) ||
				state.removedEntries.includes(action.newEntryValue) ||
				action.newEntryValue.trim() == ""
			) {
				return { ...state };
			}
			const addEntryActiveEntries = [
				...state.activeEntries,
				action.newEntryValue,
			];
			return {
				activeEntries: addEntryActiveEntries,
				removedEntries: state.removedEntries,
			};

		case "removeEntry":
			const removeActiveEntries = [
				...state.activeEntries.filter((a) => a != action.removedEntry),
			];
			const removeRemovedEntries = [
				...state.removedEntries,
				action.removedEntry,
			];
			return {
				activeEntries: removeActiveEntries,
				removedEntries: removeRemovedEntries,
			};
		case "reinstateEntry":
			const reinstateActiveEntries = [
				...state.activeEntries,
				action.reinstatedEntry,
			];
			const reinstateRemovedEntries = [
				...state.removedEntries.filter((a) => a != action.reinstatedEntry),
			];
			return {
				activeEntries: reinstateActiveEntries,
				removedEntries: reinstateRemovedEntries,
			};
	}
}

export default function useControlAsset(initialArray) {
	const [newEntry, setNewEntry] = useState("");

	const [assetStatus, dispatchAssetsAction] = useReducer(controlAssetsReducer, {
		activeEntries: initialArray,
		removedEntries: [],
	});

	async function assetSubmitHandler(e) {
		e.preventDefault();
		const res = await fetch("/api/admin/add-asset", {
			method: "POST",
			body: JSON.stringify({ newEntry: newEntry }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		let data = await res.json();
	}
	return [
		newEntry,
		setNewEntry,
		assetStatus.activeEntries,
		assetStatus.removedEntries,
		dispatchAssetsAction,
		assetSubmitHandler,
	];
}
