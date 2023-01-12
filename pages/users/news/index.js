import React, { useContext } from "react";
import { NewsContextProvider } from "../../../helper/store/contexts/news-context";
import ToolsContext from "../../../helper/store/contexts/tools-context";

import NewsUI from "../../../components/main/users/news/NewsUI";
import FeaturedNews from "../../../components/main/users/news/FeaturedNews";
import NewsHistory from "../../../components/main/users/news/NewsHistory";

function NewsIndexRoute() {
	const { theme } = useContext(ToolsContext);
	return (
		<NewsContextProvider>
			<div style={{ color: theme === "dark" ? "white" : null }}>
				<NewsUI />
				<FeaturedNews />
				<NewsHistory />
			</div>
		</NewsContextProvider>
	);
}

export default NewsIndexRoute;
