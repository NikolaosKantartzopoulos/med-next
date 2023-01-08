import React, { useContext } from "react";
import EcoContext from "../../../../../helper/store/eco-context.js";

import EcoUITopLine from "./EcoUITopLine.js";
import InfoPanel from "../../../../UI/InfoPanel";
import Textarea from "../../../../UI/Textarea.js";
import EcoFilters from "./EcoFilters.js";
import EcoTable from "./EcoTable.js";
import LoadingSpinner from "../../../../UI/LoadingSpinner";

import styles from "./ManageEco.module.css";
import LanguageContext from "../../../../../helper/store/language-context.js";

function ManageEco() {
	const {
		dispatchEcoReducerAction,
		info,
		inputsState,
		setInfo,
		actionLoaded,
		isLoading,
	} = useContext(EcoContext);
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
			{info && <InfoPanel info={info} />}
			{/* <Button onClick={handleSubmit} disabled={actionLoaded ? true : false}>
				Submit
			</Button> */}
			<EcoFilters />
			<EcoTable />
		</div>
	);
}

export default ManageEco;
