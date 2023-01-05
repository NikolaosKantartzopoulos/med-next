import React, { useEffect, useState } from "react";
import CheckFilter from "../../../UI/CheckFilter";
import { uniq } from "lodash";

function FilterUI({ allExams, visibleExams, setVisibleExams, allDepartments }) {
	const distinctDepartments = uniq(allDepartments.map((a) => a.department));
	const distinctSubepartments = uniq(allExams.map((a) => a.subdepartment));
	const [checkedDepartments, setCheckedDepartments] =
		useState(distinctDepartments);
	const [checkedSubdepartments, setCheckedSubdepartments] = useState(
		distinctSubepartments
	);
	useEffect(() => {
		setVisibleExams(
			allExams.filter((ex) => checkedDepartments.includes(ex.department))
		);
	}, [checkedDepartments]);

	return (
		<div>
			<CheckFilter
				title="Departments"
				arrayToMap={distinctDepartments}
				setCheckedItems={setCheckedDepartments}
				checkedItems={checkedDepartments}
			/>
			<CheckFilter
				title="Subdepartments"
				arrayToMap={distinctSubepartments}
				setCheckedItems={setCheckedSubdepartments}
				checkedItems={checkedSubdepartments}
			/>
		</div>
	);
}

export default FilterUI;
