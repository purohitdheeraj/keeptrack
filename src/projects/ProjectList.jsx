import React from "react";
import { Project } from "./Project";
import PropTypes from "prop-types";

function ProjectList(props) {
	const { projects } = props;

	const projectsEl = projects.map((project) => {
		return (
			<div key={project.id} className="cols-sm">
				<div className="card">
					<img src={project.imageUrl} alt={project.name} />
					<section className="section dark">
						<h5 className="strong">
							<strong>{project.name}</strong>
						</h5>
						<p>{project.description}</p>
						<p>Budget: {project.budget.toLocaleString()}</p>
					</section>
				</div>
			</div>
		);
	});

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
