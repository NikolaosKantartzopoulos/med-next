import { createContext } from "react";

const LanguageContext = createContext({
	entries: {},
	lng: () => {},
});

export function LanguageContextProvider({ locale, children }) {
	const entries = {
		Greeting: {
			"el-GR": "Γειά",
			"en-US": "Hello",
		},
		FillFrom: {
			"el-GR": "Γέμισε",
			"en-US": "Fill From",
		},
		Details: {
			"el-GR": "Λεπτομέρειες",
			"en-US": "Details",
		},

		Unique: {
			"el-GR": "Ειδικές",
			"en-US": "Unique",
		},
		General: {
			"el-GR": "Γενικές",
			"en-US": "General",
		},
		NHSTitle: {
			"el-GR": "ΕΟΠΥΥ",
			"en-US": "NHS Title",
		},
		Name: {
			"el-GR": "Όνομα",
			"en-US": "Name",
		},
		Save: {
			"el-GR": "Σώσε",
			"en-US": "Save",
		},
		Edit: {
			"el-GR": "Επεξεργασία",
			"en-US": "Edit",
		},
		Update: {
			"el-GR": "Ενημέρωση",
			"en-US": "Update",
		},
		Add: {
			"el-GR": "Προσθήκη",
			"en-US": "Add",
		},
		Delete: {
			"el-GR": "Διαγραφή",
			"en-US": "Delete",
		},
		Close: {
			"el-GR": "Κλείσε",
			"en-US": "Close",
		},
		Insurance: {
			"el-GR": "Ταμείο",
			"en-US": "Insurance",
		},
		Department: {
			"el-GR": "Τμήμα",
			"en-US": "Department",
		},
		Departments: {
			"el-GR": "Τμήματα",
			"en-US": "Departments",
		},
		Subdepartment: {
			"el-GR": "Τομέας",
			"en-US": "Subd.",
		},
		Subdepartments: {
			"el-GR": "Τομείς",
			"en-US": "Subd.",
		},
		Cost: {
			"el-GR": "€€€",
			"en-US": "Cost",
		},
		Actions: {
			"el-GR": "",
			"en-US": "Actions",
		},

		UsersHome: {
			"el-GR": "Χρήστες",
			"en-US": "Users Home",
		},
		BrowseExams: {
			"el-GR": "Εξετάσεις",
			"en-US": "Browse Exams",
		},
		ManageAssets: {
			"el-GR": "Διαχείρηση",
			"en-US": "Manage Assets",
		},
		SignOut: {
			"el-GR": "Έξοδος",
			"en-US": "Sign out",
		},
		SignIn: {
			"el-GR": "Είσοδος",
			"en-US": "Sing in",
		},
		Buildings: {
			"el-GR": "Κτήρια",
			"en-US": "Buildings",
		},

		Eco: {
			"el-GR": "Ταμεία",
			"en-US": "Eco",
		},
		Preparations: {
			"el-GR": "Προετοιμασίες",
			"en-US": "Preparations",
		},
		Users: {
			"el-GR": "Χρήστες",
			"en-US": "Users",
		},
		AddExam: {
			"el-GR": "Νέα Εξέταση",
			"en-US": "Add Exam",
		},
		Title: {
			"el-GR": "Τίτλος",
			"en-US": "Title",
		},
		ExamsTable: {
			"el-GR": "Διαχείρηση Εξετάσεων",
			"en-US": "Exams Table",
		},
		ExistingBuildings: {
			"el-GR": "Υπάρχοντα Κτήρια",
			"en-US": "Existing Buildings",
		},
	};

	function lng(text) {
		return entries[text][locale];
	}

	const languageContext = {
		entries,
		lng,
	};

	return (
		<LanguageContext.Provider value={languageContext}>
			{children}
		</LanguageContext.Provider>
	);
}
export default LanguageContext;
