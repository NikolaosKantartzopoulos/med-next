import React, { useContext } from "react";

import EcoContext from "../../../../../helper/store/eco-context.js";

import EcoUITopLine from "./EcoUITopLine.js";
import InfoPanel from "../../../../UI/InfoPanel";
import Textarea from "../../../../UI/Textarea.js";
import EcoTable from "./EcoTable.js";

import styles from "./ManageEco.module.css";
import Button from "../../../../UI/Button.js";

function ManageEco() {
	const {
		dispatchEcoReducerAction,
		info,
		inputsState,
		setInfo,
		loadedAction,
		handleSubmit,
	} = useContext(EcoContext);

	return (
		<div id="ManageEcoComponent" className={styles.manageEcoComponent}>
			<EcoUITopLine />
			{loadedAction && (
				<Textarea
					id="ecoDetails"
					label="Details"
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
					customStyles={{ margin: "auto", width: "100%" }}
				/>
			)}
			<InfoPanel info={info} />
			<Button onClick={handleSubmit}>Submit</Button>

			<EcoTable />
		</div>
	);
}

export default ManageEco;
