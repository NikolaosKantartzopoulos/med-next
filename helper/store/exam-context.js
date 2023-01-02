import { useState, useReducer, createContext } from "react";

import {
	initialObject,
	examInputReducer,
} from "../store/reducers/manage-exam-reducer";

const ExamContext = createContext({
	examInputState: {},
	dispatchExamInputStateAction: () => {},
	allActiveDepartments: [],
	allActiveDoctors: [],
	allActiveBuildings: [],
});

export function ExamContextProvider({
	allActiveDepartments,
	allActiveDoctors,
	allActiveBuildings,
	children,
}) {
	const [examInputState, dispatchExamInputStateAction] = useReducer(
		examInputReducer,
		initialObject
	);

	const examContext = {
		examInputState,
		dispatchExamInputStateAction,
		allActiveDepartments,
		allActiveDoctors,
		allActiveBuildings,
	};

	return (
		<ExamContext.Provider value={examContext}>{children}</ExamContext.Provider>
	);
}

export default ExamContext;
