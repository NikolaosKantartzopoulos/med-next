import React, { useContext } from "react";

import EcoUITopLine from "./EcoUITopLine.js";
import EcoFilters from "./EcoFilters.js";
import EcoTable from "./EcoTable.js";

import Textarea from "../../../../UI/Textarea.js";
import LoadingSpinner from "../../../../UI/LoadingSpinner";

import EcoContext from "../../../../../helper/store/contexts/eco-context.js";
import LanguageContext from "../../../../../helper/store/contexts/language-context.js";

import styles from "./ManageEco.module.css";

function ManageEco() {
	const { dispatchEcoReducerAction, inputsState, actionLoaded, isLoading } =
		useContext(EcoContext);
	const { lng } = useContext(LanguageContext);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div id="ManageEcoComponent" className={styles.manageEcoComponent}>
			<EcoUITopLine />
			{actionLoaded && (
				<Textarea
					id="ecoDetails"
					label={lng("Details")}
					value={inputsState.details}
					rows={10}
					columns={40}
					onChange={(e) => {
						setInfo(null);
						dispatchEcoReducerAction({
							type: "setDetails",
							newDetails: e.target.value,
						});
					}}
					customStyles={{ margin: "auto", width: "100%", marginBottom: "1rem" }}
				/>
			)}

			<EcoFilters />
			<EcoTable />
		</div>
	);
}

export default ManageEco;
