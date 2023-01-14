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
	activeNews: [],
	setActiveNews: () => {},
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
	const [activeNews, setActiveNews] = useState(allNews);
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
		const res = await fetch("/api/users/news", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newsState),
		});
		if (res.ok) {
			const data = await res.json();
			setActiveNews([...activeNews, data.item]);
			setInfo(data);
			setTimeout(() => setInfo(null), 3000);
		}

		setLoading(false);
	}
	function setEditNews(e, item) {
		setActionLoaded("editItem");
		dispatchNewsAction({ type: "setFieldsForEdit", itemToEdit: item });
	}

	async function saveEditedNews() {
		setLoading(true);
		const res = await fetch("/api/users/news", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ toPut: newsState }),
		});

		if (res.ok) {
			const data = await res.json();
			const filtered = activeNews.filter((n) => n._id != newsState._id);

			setActiveNews([...filtered, data.editedItem]);
			setInfo(data);
			setTimeout(() => setInfo(null), 3000);
		}
		setActionLoaded(null);
		setLoading(false);
	}

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
			setInfo(data);
			setTimeout(() => setInfo(null), 3000);

			setActiveNews(activeNews.filter((n) => n._id != item._id));
		} else {
			setInfo({ type: "error", text: "Error" });
			setTimeout(() => setInfo(null), 3000);
			router.reload();
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
		activeNews,
		setActiveNews,
	};
	return (
		<NewsContext.Provider value={newsContext}>{children}</NewsContext.Provider>
	);
}

export default NewsContext;
