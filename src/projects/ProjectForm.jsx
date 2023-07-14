import React, { useState } from "react";
import PropTypes from "prop-types";
import { Project } from "./Project";

function ProjectForm(props) {
	const { onCancel, onSave, project } = props;
	const [projectData, setProjectData] = useState(project);
	const [errors, setErrors] = useState({
		name: "",
		description: "",
		budget: "",
	});

	const validate = (project) => {
		let errors = { name: "", description: "", budget: "" };

		if (project.name.length === 0) {
			errors.name = "Name is required";
		}
		if (
			project.name.length > 0 &&
			project.name.length < 3
		) {
			errors.name =
				"Name needs to be at least 3 characters long.";
		}
		if (project.description.length === 0) {
			errors.description = "Description is required.";
		}
		if (project.budget <= 0) {
			errors.budget = "Budget must be greater than $0.";
		}
		return errors;
	};

	const isValid = () => {
		const { description, budget, name } = errors;
		return (
			name.length === 0 &&
			description.length === 0 &&
			budget.length === 0
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!isValid()) return;
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

		let updatedProject;
		setProjectData((prevData) => {
			updatedProject = new Project({
				...prevData,
				[name]: updatedValue,
			});

			return updatedProject;
		});
		setErrors(() => validate(updatedProject));
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
			{errors.name.length > 0 && (
				<div className="card error">
					<p>{errors.name}</p>
				</div>
			)}
			<label htmlFor="description">
				Project Description
			</label>
			<textarea
				name="description"
				placeholder="enter description"
				onChange={handleInputs}
				value={projectData.description}
			></textarea>
			{errors.description.length > 0 && (
				<div className="card error">
					<p>{errors.description}</p>
				</div>
			)}
			<label htmlFor="budget">Project Budget</label>
			<input
				type="number"
				name="budget"
				placeholder="enter budget"
				onChange={handleInputs}
				value={projectData.budget}
			/>
			{errors.budget.length > 0 && (
				<div className="card error">
					<p>{errors.budget}</p>
				</div>
			)}
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
