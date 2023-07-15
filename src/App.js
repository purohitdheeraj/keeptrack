import { Home } from "./components";
import "./App.css";

import ProjectsPage from "./projects/ProjectsPage";
import {
	Routes,
	Route,
	BrowserRouter as Router,
	NavLink,
} from "react-router-dom";
import ProjectDetail from "./projects/ProjectDetail";
import ProjectPage from "./projects/ProjectPage";

function App() {
	return (
		<Router>
			<header className="sticky">
				<span className="logo">
					<img
						src="/assets/logo-3.svg"
						alt="logo"
						width="49"
						height="99"
					/>
				</span>
				<NavLink to="/" className="button rounded">
					<span className="icon-home"></span>
					Home
				</NavLink>
				<NavLink to="/projects" className="button rounded">
					Projects
				</NavLink>
			</header>
			;
			<div className="container">
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route
						path="/projects"
						element={<ProjectsPage />}
					></Route>
					<Route
						path="/projects/:id"
						element={<ProjectPage />}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
