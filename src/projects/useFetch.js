import { useEffect, useState } from "react";
import { Project } from "./Project";

export const useFetch = (url, limit) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [aborted, setAborted] = useState(false);

	useEffect(() => {
		const controller = new AbortController();
		async function loadData() {
			try {
				setLoading(true);
				const response = await fetch(
					`${url}?_limit=${limit}`,
					{
						signal: controller.signal,
					}
				);
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				const parseResponse = await response.json();
				setData(() =>
					parseResponse.map(
						(project) => new Project(project)
					)
				);
			} catch (err) {
				if (err.name === "AbortError") {
					setAborted(true);
				} else {
					setError(err);
				}
			} finally {
				setLoading(false);
				setAborted(false);
			}
		}

		loadData();

		return () => controller.abort();
	}, [limit, url]);

	return { data, error, loading, aborted, setData };
};
