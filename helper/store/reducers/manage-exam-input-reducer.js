export function examInputReducer(state, action) {
	switch (action.type) {
		case "resetAll":
			return;
		case "setName":
			return { ...state, name: action.newName };
		case "setNhsDescription":
			return { ...state, nhsDescription: action.newNhsDescription };
		case "setGeneralPreparation":
			return { ...state, generalPreparation: action.newGeneralPreparation };
		case "setUniquePreparation":
			return { ...state, uniquePreparation: action.newUniquePreparation };
		case "setEcoTitle":
			const selectedInsuranceCaseTitle = state.eco.find(
				(ins) => ins.ecoTitle === action.insuranceTitle
			);
			const filteredEcoCaseTitle = state.eco.filter(
				(ins) => ins.ecoTitle != action.insuranceTitle
			);
			const newEcoTitleValue = {
				...selectedInsuranceCaseTitle,
				ecoTitle: action.newEcoTitleValue,
			};
			return { ...state, eco: [...filteredEcoCaseTitle, newEcoTitleValue] };
		case "setEcoPrice":
			const filteredEcoCasePrice = state.eco.filter(
				(ins) => ins.ecoTitle != action.insuranceLogged.ecoTitle
			);

			return {
				...state,
				eco: [
					...filteredEcoCasePrice,
					{
						ecoTitle: action.insuranceLogged.ecoTitle,
						price: action.newEcoPriceValue,
						details: action.insuranceLogged.details,
						order: action.insuranceLogged.order,
					},
				],
			};
		case "setEcoDetails":
			const filteredEcoCaseDetails = state.eco.filter(
				(ins) => ins.ecoTitle != action.insuranceLogged.ecoTitle
			);

			return {
				...state,
				eco: [
					...filteredEcoCaseDetails,
					{
						ecoTitle: action.insuranceLogged.ecoTitle,
						price: action.insuranceLogged.price,
						details: action.newEcoDetailsValue,
						order: action.insuranceLogged.order,
					},
				],
			};
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
		case "setDepartment":
			return { ...state, department: action.newDepartment };
		case "setSubepartment":
			return { ...state, subdepartment: action.newSubdepartment };
		case "setDoctors":
			return { ...state, doctors: action.newDoctors };
	}
}

export const initialObject = {
	name: "Sample Name",
	nhsDescription: "Sampe NHS description",
	department: "Classic",
	subdepartment: "Panoramic",
	buildingsSchedule: [
		{
			buildingName: "Building 1",
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
		{
			buildingName: "Building 2",
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
		{
			buildingName: "Building 3",
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
	doctors: ["Doc 1", "Doc 2", "Doc 3"],
	generalPreparation: "Sample General Preparation",
	uniquePreparation: "Sample Unique Preparation",
	eco: [
		{ ecoTitle: "Free", price: "35", details: "Free details", order: 1 },
		{ ecoTitle: "NHS", price: "150", details: "NHS details", order: 2 },
		{ ecoTitle: "Bank 1", price: "-", details: "Bank 1 details", order: 3 },
		{ ecoTitle: "Bank 2", price: "5", details: "Bank 2 details", order: 4 },
		{ ecoTitle: "Other", price: "123", details: "Other details", order: 5 },
	],
};
