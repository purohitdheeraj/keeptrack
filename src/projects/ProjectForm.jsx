import React, { useState } from "react";
import PropTypes from "prop-types";
import { Project } from "./Project";

function ProjectForm(props) {
	const { onCancel, onSave, project } = props;
	const [projectData, setProjectData] = useState(project);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSave(projectData);
		onCancel();
	};

	const handleInputs = (event) => {
		const { type, value, name, checked } = event.target;
		let updatedValue =
			type === "checkbox" ? checked : value;
		if (type === "Number") {
			updatedValue = Number(value);
		}

		setProjectData((prevData) => {
			return new Project({
				...prevData,
				[name]: updatedValue,
			});
		});
	};

	return (
		<form
			className="input-group vertical"
			onSubmit={handleSubmit}
		>
			<label htmlFor="name">Project Name</label>
			<input
				type="text"
				name="name"
				placeholder="enter name"
				onChange={handleInputs}
				value={projectData.name}
			/>
			<label htmlFor="description">
				Project Description
			</label>
			<textarea
				name="description"
				placeholder="enter description"
				onChange={handleInputs}
				value={projectData.description}
			></textarea>

			<label htmlFor="budget">Project Budget</label>
			<input
				type="number"
				name="budget"
				placeholder="enter budget"
				onChange={handleInputs}
				value={projectData.budget}
			/>

			<label htmlFor="isActive">Active?</label>
			<input
				type="checkbox"
				name="isActive"
				onChange={handleInputs}
				checked={projectData.isActive}
			/>

			<div className="input-group">
				<button className="primary bordered medium">
					Save
				</button>
				<span />
				<button
					onClick={onCancel}
					type="button"
					className="bordered medium"
				>
					cancel
				</button>
			</div>
		</form>
	);
}

ProjectForm.propTypes = {
	onSave: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	project: PropTypes.instanceOf(Project),
};

export default ProjectForm;
