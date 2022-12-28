import React, { useState } from "react";
import { useRouter } from "next/router";

import SingleInputForm from "../../../UI/SingleInputForm.js";

import useControlAsset from "../../../../helper/fn/useControlAsset";

import styles from "./ManageAssetsComponent.module.css";
import ListExistingAssets from "./ListExistingAssets.js";
import Button from "../../../UI/Button.js";

function ManageAssetsComponent({ props }) {
	const router = useRouter();
	const { allUsers, allBuildings, allDepartments } = props;
	const [info, setInfo] = useState("");

	return (
		<>
			<ManageBuildings />
			<ManageExam />
			<ManageDoctors />
			<ManageUsers />
		</>
	);
}

export default ManageAssetsComponent;
