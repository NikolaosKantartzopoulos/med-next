export const initialObject = {
	name: "Sample Name",
	nhsDescription: "Sample NHS description",
	department: "MR",
	subdepartment: "MRI",
	tags: [],
	buildingsSchedule: [],
	doctors: [],
	generalPreparation: "",
	uniquePreparation: "",
	eco: [],
	results: "2days",
};

export function examInputReducer(state, action) {
	switch (action.type) {
		case "setExamForEdit":
			return action.exam;
		case "resetAll":
			return initialObject;
		case "setName":
			return { ...state, name: action.newName };
		case "setNhsDescription":
			return { ...state, nhsDescription: action.newNhsDescription };
		case "setResults":
			return { ...state, results: action.newResults };
		case "setGeneralPreparation":
			return { ...state, generalPreparation: action.generalPrepTitle };
		case "setUniquePreparation":
			return { ...state, uniquePreparation: action.newUniquePreparation };
		case "addCommonPayment":
			return {
				...state,
				eco: [
					...state.eco,
					{
						title: action.commonInsTitle,
						subdepartment: action.subdepartmentInsTitle,
						common: true,
					},
				],
			};
		case "removePayment":
			return {
				...state,
				eco: state.eco.filter((ins) => ins.title !== action.commonInsTitle),
			};
		case "resetPaymentToCommon":
			const filteredEcoCaseReset = state.eco.filter(
				(ins) => ins.title != action.insToReset.title
			);
			return {
				...state,
				eco: [
					...filteredEcoCaseReset,
					{
						title: action.insToReset.title,
						common: true,
					},
				],
			};
		case "setEmptyUniquePayment":
			const filteredEcoCasePriceUnique = state.eco.filter(
				(ins) => ins.title != action.emptyIns.title
			);
			const setThisUp = state.eco.find(
				(ins) => ins.title === action.emptyIns.title
			);
			return {
				...state,
				eco: [
					...filteredEcoCasePriceUnique,
					{
						title: setThisUp.title,
						cost: "",
						details: "",
						common: false,
					},
				],
			};
		case "setEcoPrice":
			const filteredEcoCasePrice = state.eco.filter(
				(ins) => ins.title != action.insuranceLogged.title
			);

			const oldItem1 = state.eco.find(
				(ins) => ins.title === action.insuranceLogged.title
			);
			return {
				...state,
				eco: [
					...filteredEcoCasePrice,
					{
						...oldItem1,
						cost: action.newEcoPriceValue,
					},
				],
			};
		case "setEcoDetails":
			const filteredEcoCaseDetails = state.eco.filter(
				(ins) => ins.title != action.insuranceLogged.title
			);
			const oldItem2 = state.eco.find(
				(ins) => ins.title === action.insuranceLogged.title
			);
			return {
				...state,
				eco: [
					...filteredEcoCaseDetails,
					{
						...oldItem2,

						details: action.newEcoDetailsValue,
					},
				],
			};
		case "addBuilding":
			const toRetADD = {
				...state,
				buildingsSchedule: [
					...state.buildingsSchedule,
					{
						buildingName: action.addBuildingName,
						schedule: [
							{ day: "Monday", value: "08:00 - 15:00" },
							{ day: "Tuesday", value: "08:00 - 15:00" },
							{ day: "Wednesday", value: "08:00 - 15:00" },
							{ day: "Thursday", value: "08:00 - 15:00" },
							{ day: "Friday", value: "08:00 - 15:00" },
							{ day: "Saturday", value: "08:00 - 15:00" },
							{ day: "Sunday", value: "" },
						],
						duration: "15 mins",
					},
				],
			};
			return { ...toRetADD };

		case "setDuration":
			const filteredBuildDuration = state.buildingsSchedule.filter(
				(bld) => bld.buildingName != action.buildingToHandle
			);
			const thisBuildingFind = state.buildingsSchedule.find(
				(bld) => bld.buildingName == action.buildingToHandle
			);
			const toRetDuration = {
				...state,
				buildingsSchedule: [
					...filteredBuildDuration,
					{
						...thisBuildingFind,
						duration: action.newDuration,
					},
				],
			};

			return toRetDuration;

		case "fillBuildingSchedule":
			const filteredBuild = state.buildingsSchedule.filter(
				(bld) => bld.buildingName != action.buildingToFillName
			);
			const toRetFill = {
				...state,
				buildingsSchedule: [
					...filteredBuild,
					{
						buildingName: action.buildingToFillName,
						schedule: [
							{ day: "Monday", value: action.fillWith },
							{ day: "Tuesday", value: action.fillWith },
							{ day: "Wednesday", value: action.fillWith },
							{ day: "Thursday", value: action.fillWith },
							{ day: "Friday", value: action.fillWith },
							{ day: "Saturday", value: action.fillWith },
							{ day: "Sunday", value: "1" },
						],
					},
				],
			};
			return toRetFill;
		case "removeBuilding":
			const filteredBuildingsScheduleDEL = state.buildingsSchedule.filter(
				(bld) => bld.buildingName != action.RemoveBuildingName
			);

			const toRetDEL = {
				...state,
				buildingsSchedule: [...filteredBuildingsScheduleDEL],
			};
			return { ...toRetDEL };
		case "setSchedule":
			console.log(action);
			const filteredBuildingsSchedule = state.buildingsSchedule.filter(
				(bld) => bld.buildingName != action.buildingToHandle
			);

			const thisBuildingFindSet = state.buildingsSchedule.find(
				(bld) => bld.buildingName == action.buildingToHandle
			);

			console.log(filteredBuildingsSchedule);

			const toRet = {
				...state,
				buildingsSchedule: [
					...filteredBuildingsSchedule,
					{
						...thisBuildingFindSet,
						schedule: action.newBuildingSchedule,
					},
				],
			};
			return toRet;
		case "setTags":
			return { ...state, tags: action.newTags };
		case "setDepartment":
			return { ...state, department: action.newDepartment };
		case "setSubepartment":
			return { ...state, subdepartment: action.newSubdepartment };
		case "setDoctors":
			return { ...state, doctors: action.newDoctors };
	}
}
