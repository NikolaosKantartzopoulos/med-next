import React, { useState } from "react";
import Image from "next/image";

import TinyInput from "./TinyInput";

import searchIcon from "../../public/images/magnify.svg";
import clearAll from "../../public/images/backspace-outline.svg";

import styles from "./SeachField.module.css";

function SeachField({
	searchFn,
	searchFieldValue,
	setSearchFieldValue,
	ctrlElementsFunction,
	allItems,
}) {
	return (
		<div className={styles.searchDivision}>
			<TinyInput
				customStyle={{ width: "10rem" }}
				value={searchFieldValue}
				onChange={(e) => setSearchFieldValue(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						searchFn();
					}
				}}
			>
				<Image
					src={searchIcon}
					alt="searchIcon"
					onClick={searchFn}
					style={{ cursor: "pointer" }}
				/>
				<Image
					src={clearAll}
					alt="Clear all news"
					onClick={() => {
						setSearchFieldValue(""), ctrlElementsFunction(allItems);
					}}
				/>
			</TinyInput>
		</div>
	);
}

export default SeachField;
