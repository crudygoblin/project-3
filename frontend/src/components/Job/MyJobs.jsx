import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaEdit, FaTrashAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import "./jobstyles.css"; // New CSS file

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  const handleEnableEdit = (jobId) => setEditingMode(jobId);
  const handleDisableEdit = () => setEditingMode(null);

  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    try {
      const res = await axios.put(
        `http://localhost:4000/api/v1/job/update/${jobId}`,
        updatedJob,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setEditingMode(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/v1/job/delete/${jobId}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) => (job._id === jobId ? { ...job, [field]: value } : job))
    );
  };

  return (
    <div className="myJobs page">
      <div className="container">
        <h1>Your Posted Jobs</h1>
        {myJobs.length > 0 ? (
          <div className="job-cards-grid">
            {myJobs.map((job) => (
              <div className={`card ${editingMode === job._id ? "editing" : ""}`} key={job._id}>
                <div className="job-content">
                  <div className="job-header">
                    <h3>
                      {editingMode === job._id ? (
                        <input
                          type="text"
                          value={job.title}
                          onChange={(e) =>
                            handleInputChange(job._id, "title", e.target.value)
                          }
                        />
                      ) : (
                        job.title
                      )}
                    </h3>
                    <div className="job-actions">
                      {editingMode === job._id ? (
                        <>
                          <button onClick={() => handleUpdateJob(job._id)}>
                            <FaCheck />
                          </button>
                          <button onClick={handleDisableEdit}>
                            <RxCross2 />
                          </button>
                        </>
                      ) : (
                        <button onClick={() => handleEnableEdit(job._id)}>
                          <FaEdit />
                        </button>
                      )}
                      <button onClick={() => handleDeleteJob(job._id)}>
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                  <div className="job-details">
                    <p>
                      <strong>Category:</strong> {job.category}
                    </p>
                    <p>
                      <strong>Location:</strong> {job.city}, {job.country}
                    </p>
                    <p>
                      <strong>Salary:</strong> {job.fixedSalary || `${job.salaryFrom} - ${job.salaryTo}`}
                    </p>
                    <p>
                      <strong>Status:</strong> {job.expired ? "Expired" : "Active"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No jobs posted yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
