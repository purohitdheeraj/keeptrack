import React from "react";
import { MOCK_PROJECTS } from "./MockProjects.js";
import ProjectList from "./ProjectList.jsx";

function ProjectsPage() {
	return (
		<div>
			ProjectsPage
			<h2>Mock Projects: </h2>
			<ProjectList projects={MOCK_PROJECTS} />
		</div>
	);
}

export default ProjectsPage;
