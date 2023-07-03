import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllJobs } from "./jobSlice";
import { RootState } from "./store";
import { AppDispatch } from "./store";

const ShowJobs = () => {
    // const dispatch = useDispatch();
    const dispatch = useDispatch<AppDispatch>();
    const { jobsArr, status, error } = useSelector(
        (state: RootState) => state.jobs
    );

    useEffect(() => {
        dispatch(fetchAllJobs());
    }, [dispatch]);

    return (
        <div>
            {status === "failed" ? (
                <div>{error}</div>
            ) : status === "loading" ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {jobsArr.map((item) => (
                        <div key={item.id}>
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

};

export default ShowJobs;