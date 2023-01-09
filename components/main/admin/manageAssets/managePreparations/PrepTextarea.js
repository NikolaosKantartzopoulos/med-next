import React, { useContext } from "react";
import PreparationsContext from "../../../../../helper/store/contexts/preparations-context";
import Textarea from "../../../../UI/Textarea";

function PrepTextarea() {
	const {
		actionLoaded,
		dispatchPreparationsAction,
		preparationsInputs,
		setInfo,
	} = useContext(PreparationsContext);
	return (
		<>
			{(actionLoaded == "addPreparation" ||
				actionLoaded == "editPreparation") && (
				<>
					<Textarea
						id="prepDetails"
						label="Details"
						value={preparationsInputs.details}
						rows={10}
						columns={40}
						onChange={(e) => {
							setInfo(null);
							dispatchPreparationsAction({
								type: "setDetails",
								newDetailsValue: e.target.value,
							});
						}}
					/>
				</>
			)}
		</>
	);
}

export default PrepTextarea;
