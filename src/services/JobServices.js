// services/jobService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/jobs";

export const getJobs = () => axios.get(API_URL);
export const addJob = (job) => axios.post(API_URL, job);
export const updateJob = (id, job) =>
  axios.put(`${API_URL}/${id}`, job);
export const deleteJob = (id) =>
  axios.delete(`${API_URL}/${id}`);
