import { Home } from "./components";
import "./App.css";
import {
	CSSTransition,
	TransitionGroup,
} from "react-transition-group";

import ProjectsPage from "./projects/ProjectsPage";
import {
	Routes,
	Route,
	BrowserRouter as Router,
	NavLink,
	useLocation,
} from "react-router-dom";

import ProjectPage from "./projects/ProjectPage";

function App() {
	let location = useLocation();
	return (
		<>
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
			<div className="container">
				<TransitionGroup>
					<CSSTransition
						key={location.key}
						classNames="fade"
						timeout={{ enter: 400, exit: 200 }}
					>
						<Routes location={location}>
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
					</CSSTransition>
				</TransitionGroup>
			</div>
		</>
	);
}

export default App;
