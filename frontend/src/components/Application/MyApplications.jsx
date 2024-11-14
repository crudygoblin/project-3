import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import "./applicationstyles.css";

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized) {
      const endpoint =
        user?.role === "Employer"
          ? "http://localhost:4000/api/v1/application/employer/getall"
          : "http://localhost:4000/api/v1/application/jobseeker/getall";

      axios
        .get(endpoint, { withCredentials: true })
        .then((res) => setApplications(res.data.applications))
        .catch((error) => toast.error(error.response?.data?.message || "Error loading applications"));
    } else {
      navigate("/");
    }
  }, [isAuthorized, user?.role, navigate]);

  const deleteApplication = (id) => {
    axios
      .delete(`http://localhost:4000/api/v1/application/delete/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        setApplications((prev) => prev.filter((application) => application._id !== id));
      })
      .catch((error) => toast.error(error.response?.data?.message || "Failed to delete application"));
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <section className="my-applications page">
      <div className="application-container">
        <h1>{user?.role === "Job Seeker" ? "My Applications" : "Applications From Job Seekers"}</h1>
        {applications.length === 0 ? (
          <h4>No Applications Found</h4>
        ) : (
          applications.map((application) =>
            user?.role === "Job Seeker" ? (
              <JobSeekerCard
                key={application._id}
                application={application}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            ) : (
              <EmployerCard
                key={application._id}
                application={application}
                openModal={openModal}
              />
            )
          )
        )}
      </div>
      {modalOpen && <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />}
    </section>
  );
};

const JobSeekerCard = ({ application, deleteApplication, openModal }) => (
  <div className="my-applications-card">
    <div className="my-applications-detail">
      <p><span>Name:</span> {application.name}</p>
      <p><span>Email:</span> {application.email}</p>
      <p><span>Phone:</span> {application.phone}</p>
      <p><span>Address:</span> {application.address}</p>
      <p><span>Cover Letter:</span> {application.coverLetter}</p>
    </div>
    <div className="my-applications-resume">
      <img
        src={application.resume.url}
        alt="Resume"
        onClick={() => openModal(application.resume.url)}
        className="resume-thumbnail"
      />
    </div>
    <div className="my-applications-btn-area">
      <button onClick={() => deleteApplication(application._id)} className="delete-btn">
        Delete Application
      </button>
    </div>
  </div>
);

const EmployerCard = ({ application, openModal }) => (
  <div className="my-applications-card">
    <div className="my-applications-detail">
      <p><span>Name:</span> {application.name}</p>
      <p><span>Email:</span> {application.email}</p>
      <p><span>Phone:</span> {application.phone}</p>
      <p><span>Address:</span> {application.address}</p>
      <p><span>Cover Letter:</span> {application.coverLetter}</p>
    </div>
    <div className="my-applications-resume">
      <img
        src={application.resume.url}
        alt="Resume"
        onClick={() => openModal(application.resume.url)}
        className="resume-thumbnail"
      />
    </div>
  </div>
);

export default MyApplications;
