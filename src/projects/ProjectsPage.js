import React from "react";
import { MOCK_PROJECTS } from "./MockProjects.js";

function ProjectsPage() {
	return (
		<div>
			ProjectsPage
			<h2>Mock Projects: </h2>
			<section>
				<pre>
					{JSON.stringify(MOCK_PROJECTS, null, " ")}
				</pre>
			</section>
		</div>
	);
}

export default ProjectsPage;
