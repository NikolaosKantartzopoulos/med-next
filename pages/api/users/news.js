export default async function handler(req, res) {
	switch (req.method) {
		case "POST":
			console.log(req.body);
			return;
	}
}
