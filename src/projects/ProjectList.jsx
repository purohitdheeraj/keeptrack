import React from "react";
import { Project } from "./Project";
import PropTypes from "prop-types";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

function ProjectList(props) {
	const { projects } = props;

	const projectsEl = projects.map((project) => (
		<div key={project.id} className="cols-sm">
			<ProjectCard project={project} />
			<ProjectForm />
		</div>
	));

	return (
		<section>
			ProjectList
			<div className="row">{projectsEl}</div>
		</section>
	);
}

ProjectList.propTypes = {
	projects: PropTypes.arrayOf(PropTypes.instanceOf(Project))
		.isRequired,
};

export default ProjectList;
