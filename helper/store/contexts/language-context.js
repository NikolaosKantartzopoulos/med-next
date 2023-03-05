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
		News: {
			"el-GR": "Νέα",
			"en-US": "News",
		},
		Exams: {
			"el-GR": "Εξετάσεις",
			"en-US": "Exams",
		},
		Schedule: {
			"el-GR": "Προγράμματα",
			"en-US": "Schedule",
		},
		Doctors: {
			"el-GR": "Ιατροί",
			"en-US": "Doctors",
		},

		Duration: {
			"el-GR": "Διάρκεια",
			"en-US": "Duration",
		},
		Results: {
			"el-GR": "Αποτελέσματα",
			"en-US": "Results",
		},
		Featured: {
			"el-GR": "Αστέρι",
			"en-US": "Featured",
		},
		Rest: {
			"el-GR": "Άλλα",
			"en-US": "Rest",
		},
		Months: {
			"el-GR": "Μήνες",
			"en-US": "Months",
		},
		Month: {
			"el-GR": "Μήνας",
			"en-US": "Month",
		},
		CommonPaymentAndDetails: {
			"el-GR": "Κοινή προετοιμασία & λεπτομέριες",
			"en-US": "Common Payment & Details",
		},
		Common: {
			"el-GR": "Κοινές",
			"en-US": "Common",
		},
		Unique: {
			"el-GR": "Ιδιαίτερες",
			"en-US": "Unique",
		},
		Monday: {
			"el-GR": "Δευτέρα",
			"en-US": "Monday",
		},
		Tuesday: {
			"el-GR": "Τρίτη",
			"en-US": "Tuesday",
		},
		Wednesday: {
			"el-GR": "Τετάρτη",
			"en-US": "Wednesday",
		},

		Doctor: {
			"el-GR": "Ιατρός",
			"en-US": "Doctor",
		},
		Secretary: {
			"el-GR": "Γραμματέας",
			"en-US": "Secretary",
		},
		Position: {
			"el-GR": "Ως",
			"en-US": "As",
		},
		Position2: {
			"el-GR": "σε",
			"en-US": "In",
		},
		FrontDesk: {
			"el-GR": "Υποδοχή",
			"en-US": "Front Desk",
		},
		Transcriptionist: {
			"el-GR": "Δακτυλογράφηση",
			"en-US": "Transcriptionist",
		},
		PhoneCenter: {
			"el-GR": "Τηλεφωνικό",
			"en-US": "Phone Center",
		},

		Thursday: {
			"el-GR": "Πέμπτη",
			"en-US": "Thursday",
		},
		Friday: {
			"el-GR": "Παρασκευή",
			"en-US": "Friday",
		},
		Saturday: {
			"el-GR": "Σάββατο",
			"en-US": "Saturday",
		},
		Sunday: {
			"el-GR": "Κυριακή",
			"en-US": "Sunday",
		},

		FillFrom: {
			"el-GR": "Όλα",
			"en-US": "Set all",
		},
		Details: {
			"el-GR": "Λεπτομέρειες",
			"en-US": "Details",
		},

		Unique: {
			"el-GR": "Ειδική",
			"en-US": "Unique",
		},
		General: {
			"el-GR": "Γενική",
			"en-US": "General",
		},
		NHSTitle: {
			"el-GR": "Αναλυτικά",
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
			"el-GR": "Νέο",
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
			"en-US": "Exams",
		},
		ManageAssets: {
			"el-GR": "Διαχείρηση",
			"en-US": "Assets",
		},
		SignOut: {
			"el-GR": "Έξοδος",
			"en-US": "Sign out",
		},
		SignIn: {
			"el-GR": "Είσοδος",
			"en-US": "Sign in",
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
			"el-GR": "Οδηγίες",
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
