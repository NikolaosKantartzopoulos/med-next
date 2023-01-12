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
});

export function NewsContextProvider({ children }) {
	const [newsState, dispatchNewsAction] = useReducer(
		newsReducer,
		initialNewsState
	);
	const [loading, setLoading] = useState(false);
	const [actionLoaded, setActionLoaded] = useState("");
	const [info, setInfo] = useState(null);

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
	function setEditNews() {}
	function saveEditedNews() {}
	function deleteNews() {}

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
		deleteNews,
	};
	return (
		<NewsContext.Provider value={newsContext}>{children}</NewsContext.Provider>
	);
}

export default NewsContext;
