import React, { useContext, useState } from "react";

import Checkbox from "../../../UI/Checkbox.js";
import LoadingSpinner from "../../../UI/LoadingSpinner.js";
import Input from "../../../UI/Input";
import Textarea from "../../../UI/Textarea";

import NewsContext from "../../../../helper/store/contexts/news-context";
import ButtonAdd from "../../../UI/ButtonAdd.js";
import ToolsContext from "../../../../helper/store/contexts/tools-context.js";

function NewsForm() {
	const { info, setInfo, infoMessage } = useContext(ToolsContext);
	const newsContext = useContext(NewsContext);
	const [tagInput, setTagInput] = useState("");

	function handleCheckboxClick() {
		newsContext.dispatchNewsAction({
			type: "toggleFeatured",
			newFeaturedValue: !newsContext.newsState.featured,
		});
	}

	if (newsContext.newsState.loading) {
		return <LoadingSpinner />;
	}

	return (
		<div>
			<button onClick={() => console.log(newsContext.newsState)}>
				Check state
			</button>
			{newsContext.actionLoaded === "addNews" && (
				<button onClick={newsContext.saveAddedNews}>Add news</button>
			)}
			<Input
				id="title"
				label="title"
				value={newsContext.newsState.title}
				onChange={(e) =>
					newsContext.dispatchNewsAction({
						type: "setTitle",
						newTitle: e.target.value,
					})
				}
			/>
			<Textarea
				id="text"
				label="text"
				value={newsContext.newsState.text}
				rows={5}
				colums={50}
				onChange={(e) =>
					newsContext.dispatchNewsAction({
						type: "setText",
						newText: e.target.value,
					})
				}
			/>
			<Checkbox
				value={newsContext.newsState.featured}
				onChange={handleCheckboxClick}
				checkedIf={newsContext.newsState.featured}
				label="Featured"
			/>
			<div>
				<h4>Tags</h4>
				<Input
					id="addTag"
					label="Add"
					value={tagInput}
					onChange={(e) => setTagInput(e.target.value)}
				/>
				<ButtonAdd
					onClick={() => {
						if (tagInput.trim() === "") {
							infoMessage("error", "Tag field is empty");
							return;
						}
						newsContext.dispatchNewsAction({
							type: "addTag",
							newTag: tagInput,
						});
					}}
				/>
			</div>
		</div>
	);
}

export default NewsForm;
