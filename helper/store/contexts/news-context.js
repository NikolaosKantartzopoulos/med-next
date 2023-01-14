import { useRouter } from "next/router";
import { createContext, useReducer, useState } from "react";
import { initialNewsState, newsReducer } from "../reducers/news-reducer";

const NewsContext = createContext({
	actionLoaded: "",
	dispatchNewsAction: () => {},
	info: {},
	loading: false,
	newsState: {},
	setActionLoaded: () => {},
	setInfo: () => {},
	setLoading: () => {},
	setAddNews: () => {},
	saveAddedNews: () => {},
	setEditNews: () => {},
	saveEditedNews: () => {},
	deleteNews: () => {},
	resetUI: () => {},
	allUsers: [],
});

export function NewsContextProvider({
	children,
	allNews,
	allUsers,
	info,
	setInfo,
}) {
	const [newsState, dispatchNewsAction] = useReducer(
		newsReducer,
		initialNewsState
	);
	const [loading, setLoading] = useState(false);
	const [actionLoaded, setActionLoaded] = useState(null);

	const router = useRouter();

	function resetUI() {
		setActionLoaded(null);
		dispatchNewsAction({ type: "resetAll" });
	}

	function setAddNews(e, item) {
		setActionLoaded("addNews");
		dispatchNewsAction({ type: "setAddNewsFields", user: item });
	}
	async function saveAddedNews() {
		setLoading(true);
		fetch("/api/users/news", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newsState),
		});
		setLoading(false);
	}
	function setEditNews(e, item) {
		setActionLoaded("editItem");
		dispatchNewsAction({ type: "setFieldsForEdit", itemToEdit: item });
	}

	async function saveEditedNews() {}

	async function deleteNews(e, item) {
		setLoading(true);
		const res = await fetch("/api/users/news", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ toDelete: item }),
		});

		if (res.ok) {
			const data = await res.json();
			console.log(data);
			setInfo(data);
			setTimeout(() => setInfo(null), 3000);
			setTimeout(() => router.reload(), 3200);
		}

		setLoading(false);
	}

	const newsContext = {
		actionLoaded,
		dispatchNewsAction,
		info,
		loading,
		newsState,
		setActionLoaded,
		setInfo,
		setLoading,
		setAddNews,
		saveAddedNews,
		setEditNews,
		saveEditedNews,
		resetUI,
		deleteNews,
		allNews,
		allUsers,
	};
	return (
		<NewsContext.Provider value={newsContext}>{children}</NewsContext.Provider>
	);
}

export default NewsContext;
