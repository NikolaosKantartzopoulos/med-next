import { useState } from "react";

export default function useSubmitNewAsset(title, initialObject) {
	const [newEntry, setNewEntry] = useState("");
	const [activeEntries, setActiveEntries] = useState(initialObject.active);
	const [removedEntries, setRemovedEntries] = useState([]);

	async function assetSubmitHandler(e) {
		e.preventDefault();
		const res = await fetch("/api/admin/add-asset", {
			method: "POST",
			body: JSON.stringify({ asset: title, activeEntries: activeEntries }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		let data = await res.json();
	}
	return [
		newEntry,
		setNewEntry,
		activeEntries,
		setActiveEntries,
		removedEntries,
		setRemovedEntries,
		assetSubmitHandler,
	];
}
