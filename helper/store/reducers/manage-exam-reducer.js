export const initialObject = {
	name: "Sample Name",
	nhsDescription: "Sampe NHS description",
	department: "MR",
	subdepartment: "MRI",
	tags: [],
	buildingsSchedule: [],
	doctors: [],
	generalPreparation: "",
	uniquePreparation: "",
	eco: [],
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
					},
				],
			};
			return { ...toRetADD };
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
			const filteredBuildingsSchedule = state.buildingsSchedule.filter(
				(bld) => bld.buildingName != action.buildingName
			);

			const toRet = {
				...state,
				buildingsSchedule: [
					...filteredBuildingsSchedule,
					{
						buildingName: action.buildingName,
						schedule: action.newBuildingSchedule,
					},
				],
			};
			return { ...toRet };
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

// export const initialObject = {
// 	name: "Sample Name",
// 	nhsDescription: "Sampe NHS description",
// 	department: "Classic",
// 	subdepartment: "Panoramic",
// 	tags: ["Tag 1", "Tag 2", "Tag 3"],
// 	buildingsSchedule: [
// 		{
// 			buildingName: "Building 1",
// 			schedule: [
// 				{ day: "Monday", value: "08:00 - 15:00" },
// 				{ day: "Tuesday", value: "08:00 - 15:00" },
// 				{ day: "Wednesday", value: "08:00 - 15:00" },
// 				{ day: "Thursday", value: "08:00 - 15:00" },
// 				{ day: "Friday", value: "08:00 - 15:00" },
// 				{ day: "Saturday", value: "08:00 - 15:00" },
// 				{ day: "Sunday", value: "" },
// 			],
// 		},
// 		{
// 			buildingName: "Building 2",
// 			schedule: [
// 				{ day: "Monday", value: "08:00 - 15:00" },
// 				{ day: "Tuesday", value: "08:00 - 15:00" },
// 				{ day: "Wednesday", value: "08:00 - 15:00" },
// 				{ day: "Thursday", value: "08:00 - 15:00" },
// 				{ day: "Friday", value: "08:00 - 15:00" },
// 				{ day: "Saturday", value: "08:00 - 15:00" },
// 				{ day: "Sunday", value: "" },
// 			],
// 		},
// 		{
// 			buildingName: "Building 3",
// 			schedule: [
// 				{ day: "Monday", value: "08:00 - 15:00" },
// 				{ day: "Tuesday", value: "08:00 - 15:00" },
// 				{ day: "Wednesday", value: "08:00 - 15:00" },
// 				{ day: "Thursday", value: "08:00 - 15:00" },
// 				{ day: "Friday", value: "08:00 - 15:00" },
// 				{ day: "Saturday", value: "08:00 - 15:00" },
// 				{ day: "Sunday", value: "" },
// 			],
// 		},
// 	],
// 	doctors: ["Doc 1", "Doc 2", "Doc 3"],
// 	generalPreparation: "Sample General Preparation",
// 	uniquePreparation: "Sample Unique Preparation",
// 	eco: [
// 		{ ecoTitle: "Free", price: "35", details: "Free details", order: 1 },
// 		{ ecoTitle: "NHS", price: "150", details: "NHS details", order: 2 },
// 		{ ecoTitle: "Bank 1", price: "-", details: "Bank 1 details", order: 3 },
// 		{ ecoTitle: "Bank 2", price: "5", details: "Bank 2 details", order: 4 },
// 		{ ecoTitle: "Other", price: "123", details: "Other details", order: 5 },
// 	],
// };
