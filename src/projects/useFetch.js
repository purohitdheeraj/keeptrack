import { useCallback, useEffect, useState } from "react";
import { projectAPI } from "./projectAPI";

export const useFetch = (page = 1) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(undefined);

	const loadData = useCallback(async () => {
		setLoading(true);
		try {
			const projectData = await projectAPI.get(page);
			setError(null);
			if (page === 1) {
				setData(projectData);
			} else {
				setData((prev) => [...prev, ...projectData]);
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	}, [page]);

	useEffect(() => {
		loadData();
	}, [loadData]);

	return { data, error, loading, setData, setError };
};
