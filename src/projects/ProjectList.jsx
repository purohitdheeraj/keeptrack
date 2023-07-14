import React, { useState } from "react";
import { Project } from "./Project";
import PropTypes from "prop-types";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

function ProjectList(props) {
	const { projects, onSave } = props;
	const [projectBeingEdited, setProjectBeingEdited] =
		useState({});

	const handleEdit = (project) => {
		setProjectBeingEdited(project);
	};

	const cancelEditing = () => {
		setProjectBeingEdited({});
	};

	const projectsEl = projects.map((project) => (
		<div key={project.id} className="cols-sm">
			{project === projectBeingEdited ? (
				<ProjectForm
					onCancel={cancelEditing}
					onSave={onSave}
					project={project}
				/>
			) : (
				<ProjectCard
					project={project}
					onEdit={handleEdit}
				/>
			)}
		</div>
	));

	return (
		<section>
			<div className="row">{projectsEl}</div>
		</section>
	);
}

ProjectList.propTypes = {
	projects: PropTypes.arrayOf(PropTypes.instanceOf(Project))
		.isRequired,
	onSave: PropTypes.func.isRequired,
};

export default ProjectList;
