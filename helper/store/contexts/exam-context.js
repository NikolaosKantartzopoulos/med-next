import { useState, useReducer, createContext } from "react";

import {
	initialObject,
	examInputReducer,
} from "../../store/reducers/manage-exam-reducer";

const ExamContext = createContext({
	allActiveBuildings: [],
	allActiveDepartments: [],
	allActiveDoctors: [],
	allActivePreparations: [],
	dispatchExamInputStateAction: () => {},
	examInputState: {},
	examLoaded: {},
	isLoading: false,
	setExamLoaded: () => {},
	setIsLoading: () => {},
});

export function ExamContextProvider({
	allActiveDepartments,
	allActiveDoctors,
	allActiveBuildings,
	allActivePreparations,
	allActiveEco,
	children,
}) {
	const [examInputState, dispatchExamInputStateAction] = useReducer(
		examInputReducer,
		initialObject
	);
	const [isLoading, setIsLoading] = useState(false);
	const [examLoaded, setExamLoaded] = useState();

	const examContext = {
		allActiveBuildings,
		allActiveDepartments,
		allActiveDoctors,
		allActiveEco,
		allActivePreparations,
		dispatchExamInputStateAction,
		examInputState,
		examLoaded,
		isLoading,
		setExamLoaded,
		setIsLoading,
	};

	return (
		<ExamContext.Provider value={examContext}>{children}</ExamContext.Provider>
	);
}

export default ExamContext;
