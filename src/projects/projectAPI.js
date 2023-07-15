import { Project } from "./Project";

const baseUrl = `http://localhost:4000`;
const url = `${baseUrl}/projects`;

const translateStatusToErrorMessage = (status) => {
	switch (status) {
		case 401:
			return "please login again";
		case 403:
			return "You do not have Permission";
		default:
			return "there was an error getting the project please try again";
	}
};

const checkStatus = (response) => {
	if (response.ok) {
		return response;
	} else {
		const httpErrorInfo = {
			status: response.status,
			statusText: response.statusText,
			url: response.url,
		};
		console.log(
			`log server error ${JSON.stringify(httpErrorInfo)}`
		);
		const errorMessage = translateStatusToErrorMessage(
			response.status
		);
		throw new Error(errorMessage);
	}
};

const parseJSON = (response) => response.json();

const delay = (ms) => {
	return function (x) {
		return new Promise((resolve) =>
			setTimeout(() => resolve(x), ms)
		);
	};
};

const projectAPI = {
	get(page = 1, limit = 20) {
		return fetch(
			`${url}?_page=${page}&_limit=${limit}&_sort=name`
		)
			.then(delay(600))
			.then(checkStatus)
			.then(parseJSON)
			.then((projects) => {
				return projects.map((project) => {
					return new Project(project);
				});
			})
			.catch((error) => {
				console.log("log client error", error);
				throw new Error(
					"there was an error retrieving the projects.please try again"
				);
			});
	},
	put(project) {
		return fetch(`${url}/${project.id}`, {
			method: "PUT",
			body: JSON.stringify(project),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(checkStatus)
			.then(parseJSON)
			.catch((error) => {
				console.log("log client error " + error);
				throw new Error(`
        There was an error updating the project. Please Try again`);
			});
	},
	find(id) {
		return fetch(`${url}/${id}`)
			.then(checkStatus)
			.then(parseJSON);
	},
};

export { projectAPI };
