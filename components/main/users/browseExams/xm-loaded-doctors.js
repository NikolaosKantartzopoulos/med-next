import React, { useContext } from "react";
import LanguageContext from "../../../../helper/store/contexts/language-context";

import FoldUnfold from "../../../UI/fold-unfold";

import styles from "./xm-loaded-doctors.module.css";

function ExamLoadedDoctors({ xm }) {
	const { lng } = useContext(LanguageContext);

	return (
		<FoldUnfold headerText={lng("Doctors")}>
			<div className={styles.doctorsTab}>
				{xm.doctors && xm.doctors.map((d) => <div key={d}>{d}</div>)}
			</div>
		</FoldUnfold>
	);
}

export default ExamLoadedDoctors;
