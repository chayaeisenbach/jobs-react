import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Job {
  id: number;
  title: string;
  description: string;
  // other properties go here
}

export interface JobState {
  jobsArr: Job[];
  // jobsArr: [];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: JobState = {
  jobsArr: [],
  status: "idle",
  error: null,
};

export const fetchAllJobs = createAsyncThunk("jobs/fetchAll", async () => {
  const response = await axios.get<Job[]>("http://localhost:4545/jobs");
  // const response = await axios.get("http://localhost:4545/jobs");
  return response.data;
});

export const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobsArr = action.payload;
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong.";
      });
  },
});

export default jobSlice.reducer;