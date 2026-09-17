import { useJobs } from '../../context/useJobs'
import StatCard from '../../components/StatCard/StatCard'
import JobCard from '../../components/JobCard/JobCard'

import './Dashboard.css'

function Dashboard({ onEditJob }) {
  const {
    jobs,
    loading,
    error,
    actionError,
    deleteJob,
  } = useJobs()

  const interviews = jobs.filter(
    (job) => job.status === 'Interview'
  ).length

  const offers = jobs.filter(
    (job) => job.status === 'Offer'
  ).length

  const rejected = jobs.filter(
    (job) => job.status === 'Rejected'
  ).length

  const recentJobs = [...jobs]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5)

  if (loading) {
    return (
      <div className="dashboard-state">
        <div className="dashboard-spinner"></div>
        <p>Loading applications...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard-state dashboard-state--error">
        <h2>Something went wrong</h2>
        <p>
          We couldn't load your job applications.
        </p>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <section className="dashboard__header">
        <div>
          <h1>Dashboard</h1>

          <p>
            Overview of your job applications
          </p>
        </div>
      </section>

      {actionError && (
        <div className="dashboard-alert">
          {actionError}
        </div>
      )}

      <section className="stats-grid">
        <StatCard
          title="Applications"
          value={jobs.length}
        />

        <StatCard
          title="Interviews"
          value={interviews}
        />

        <StatCard
          title="Offers"
          value={offers}
        />

        <StatCard
          title="Rejected"
          value={rejected}
        />
      </section>

      <section className="jobs-section">
        <div className="jobs-section__header">
          <div>
            <h2>Recent applications</h2>

            <p>
              Your latest job applications
            </p>
          </div>
        </div>

        {recentJobs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">
              +
            </div>

            <h3>No applications yet</h3>

            <p>
              Start tracking your job applications
              by adding your first vacancy.
            </p>
          </div>
        ) : (
          <div className="jobs-list">
            {recentJobs.map((job) => (
              <JobCard
                key={job.id}
                company={job.company}
                position={job.position}
                status={job.status}
                onEdit={() => onEditJob(job)}
                onDelete={() => deleteJob(job.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Dashboard