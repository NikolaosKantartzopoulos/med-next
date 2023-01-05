import React, { useState } from "react";
import ExamsTable from "./ExamsTable";
import FilterUI from "./ExamFilterUI.js";

function BrowseExams({ allExams, allDepartments }) {
	const [visibleExams, setVisibleExams] = useState(allExams);

	return (
		<div>
			<FilterUI
				allDepartments={allDepartments}
				allExams={allExams}
				visibleExams={visibleExams}
				setVisibleExams={setVisibleExams}
			/>
			<ExamsTable allActiveExams={visibleExams} />
		</div>
	);
}

export default BrowseExams;
