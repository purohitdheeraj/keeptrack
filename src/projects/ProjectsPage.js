import React, { useState } from "react";
// import { MOCK_PROJECTS } from "./MockProjects.js";
import ProjectList from "./ProjectList.jsx";
import { useFetch } from "./useFetch.js";
import { projectAPI } from "./projectAPI.js";
import { Project } from "./Project.js";

function ProjectsPage() {
	// const [projects, setProjects] = useState(MOCK_PROJECTS);
	const [currentPage, setCurrentPage] = useState(1);
	const {
		error,
		loading,
		data: projectsData,
		setData,
		setError,
	} = useFetch(currentPage);

	const onSave = (newProjectData) => {
		projectAPI
			.put(newProjectData)
			.then((updatedProject) => {
				let updatedProjects = projectsData.map(
					(project) => {
						return project.id === updatedProject.id
							? new Project(updatedProject)
							: project;
					}
				);
				setData(updatedProjects);
			})
			.catch((error) => {
				setError(error.message);
			});
	};

	const handleMoreClick = () => {
		setCurrentPage((prev) => prev + 1);
	};

	return (
		<div>
			<h2>Projects: </h2>

			{error && (
				<div className="row">
					<div className="card large error">
						<section>
							<p>
								<span className="icon-alert inverse "></span>
								{error}
							</p>
						</section>
					</div>
				</div>
			)}
			{loading && (
				<div className="center-page">
					<span className="spinner primary"></span>
					<p>Loading...</p>
				</div>
			)}
			{projectsData && (
				<ProjectList
					onSave={onSave}
					projects={projectsData}
				/>
			)}
			{!loading && !error && (
				<div className="row">
					<div className="col-sm-12">
						<div className="button-group fluid">
							<button
								onClick={handleMoreClick}
								className="button default"
							>
								More...
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ProjectsPage;
