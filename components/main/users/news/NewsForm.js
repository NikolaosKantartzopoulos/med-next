import React, { useContext, useState } from "react";

import Checkbox from "../../../UI/Checkbox.js";
import LoadingSpinner from "../../../UI/LoadingSpinner.js";
import Input from "../../../UI/Input";
import NewsTextarea from "./NewsTextarea";

import Image from "next/image.js";
import deleteIcon from "../../../../public/images/delete.svg";

import NewsContext from "../../../../helper/store/contexts/news-context";
import ButtonAdd from "../../../UI/ButtonAdd.js";
import ButtonSave from "../../../UI/ButtonSave.js";
import ToolsContext from "../../../../helper/store/contexts/tools-context.js";
import LanguageContext from "../../../../helper/store/contexts/language-context.js";

import styles from "./NewsForm.module.css";

function NewsForm() {
	const { info, setInfo, infoMessage } = useContext(ToolsContext);
	const newsContext = useContext(NewsContext);
	const { lng } = useContext(LanguageContext);
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
		<div className={styles.newsFormSection}>
			<div className={styles.firstPart}>
				<Input
					id="title"
					label={lng("Title")}
					value={newsContext.newsState.title}
					onChange={(e) =>
						newsContext.dispatchNewsAction({
							type: "setTitle",
							newTitle: e.target.value,
						})
					}
				/>
				<Checkbox
					value={newsContext.newsState.featured}
					onChange={handleCheckboxClick}
					checkedIf={newsContext.newsState.featured}
					label={lng("Featured")}
				/>
				<div>
					<h4>Tags</h4>
					<div className={styles.editTagsDiv}>
						<div className={styles.addTagDiv}>
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
							<Input
								id="addTag"
								label={null}
								value={tagInput}
								onChange={(e) => setTagInput(e.target.value)}
								customStyle={{ flexBasis: "100%" }}
							/>
						</div>
					</div>
					{newsContext.newsState.tags.length > 0 && (
						<div className={styles.existingTagsDiv}>
							{newsContext.newsState.tags.map((t) => (
								<div className={styles.existingTag} key={t}>
									<span>{t}</span>
									<Image
										src={deleteIcon}
										alt="Delete Tag"
										onClick={() =>
											newsContext.dispatchNewsAction({
												type: "deleteTag",
												tagToDelete: t,
											})
										}
									/>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
			<NewsTextarea
				id="text"
				label={lng("Details")}
				value={newsContext.newsState.text}
				rows={14}
				columns={20}
				onChange={(e) =>
					newsContext.dispatchNewsAction({
						type: "setText",
						newText: e.target.value,
					})
				}
			/>
		</div>
	);
}

export default NewsForm;
