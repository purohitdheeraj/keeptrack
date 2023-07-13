import React, { useState } from "react";
import { MOCK_PROJECTS } from "./MockProjects.js";
import ProjectList from "./ProjectList.jsx";

function ProjectsPage() {
	const [projects, setProjects] = useState(MOCK_PROJECTS);

	const onSave = (newProjectData) => {
		const updatedProjects = projects.map((project) => {
			return project.id === newProjectData.id
				? newProjectData
				: project;
		});
		setProjects(updatedProjects);
	};

	return (
		<div>
			ProjectsPage
			<h2>Mock Projects: </h2>
			<ProjectList onSave={onSave} projects={projects} />
		</div>
	);
}

export default ProjectsPage;
