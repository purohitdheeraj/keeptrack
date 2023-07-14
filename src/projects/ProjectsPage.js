import React from "react";
// import { MOCK_PROJECTS } from "./MockProjects.js";
import ProjectList from "./ProjectList.jsx";
import { useFetch } from "./useFetch.js";

function ProjectsPage() {
	// const [projects, setProjects] = useState(MOCK_PROJECTS);
	const URL = `http://localhost:4000/projects`;
	const limit = 20;

	const {
		error,
		loading,
		data: projectsData,
		aborted,
		setData,
	} = useFetch(URL, limit);

	const onSave = (newProjectData) => {
		const updatedProjects = projectsData.map((project) => {
			return project.id === newProjectData.id
				? newProjectData
				: project;
		});
		setData(updatedProjects);
	};

	return (
		<div>
			<h2>Projects: </h2>
			{aborted && <h1>user aborted the page</h1>}
			{error && <h2>{error.message}</h2>}
			{loading && <h1>Loading Projects...</h1>}
			{projectsData && (
				<ProjectList
					onSave={onSave}
					projects={projectsData}
				/>
			)}
		</div>
	);
}

export default ProjectsPage;
