import { useState } from 'react'
import { useJobs } from '../../context/JobContext'
import JobCard from '../../components/JobCard/JobCard'

import './Applications.css'

function Applications({ onEditJob }) {
  const {
    jobs,
    deleteJob,
    actionError,
  } = useJobs()

  const [statusFilter, setStatusFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  const filteredJobs = jobs.filter((job) => {
    const matchesStatus =
      statusFilter === 'All' ||
      job.status === statusFilter

    const matchesSearch =
      job.company
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      job.position
        .toLowerCase()
        .includes(searchQuery.toLowerCase())

    return matchesStatus && matchesSearch
  })

  const sortedJobs = [...filteredJobs].sort(
    (a, b) => {
      if (sortBy === 'newest') {
        return b.id - a.id
      }

      if (sortBy === 'oldest') {
        return a.id - b.id
      }

      if (sortBy === 'company-asc') {
        return a.company.localeCompare(b.company)
      }

      if (sortBy === 'company-desc') {
        return b.company.localeCompare(a.company)
      }

      return 0
    }
  )

  return (
    <div className="applications">
      <section className="applications__header">
        <div>
          <h1>Applications</h1>

          <p>
            Manage your job applications
          </p>
        </div>
      </section>

      {actionError && (
        <div className="applications-alert">
          {actionError}
        </div>
      )}

      <section className="applications-controls">
        <div className="applications-search">
          <label htmlFor="search">
            Search
          </label>

          <input
            id="search"
            type="text"
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(event.target.value)
            }
            placeholder="Company or position..."
          />
        </div>

        <div className="applications-filter">
          <label htmlFor="status-filter">
            Status
          </label>

          <select
            id="status-filter"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="All">
              All
            </option>

            <option value="Applied">
              Applied
            </option>

            <option value="Interview">
              Interview
            </option>

            <option value="Offer">
              Offer
            </option>

            <option value="Rejected">
              Rejected
            </option>
          </select>
        </div>

        <div className="applications-filter">
          <label htmlFor="sort-by">
            Sort by
          </label>

          <select
            id="sort-by"
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value)
            }
          >
            <option value="newest">
              Newest first
            </option>

            <option value="oldest">
              Oldest first
            </option>

            <option value="company-asc">
              Company A-Z
            </option>

            <option value="company-desc">
              Company Z-A
            </option>
          </select>
        </div>
      </section>

      <section className="applications__list">
        <div className="applications__list-header">
          <div>
            <h2>Your applications</h2>

            <p>
              {sortedJobs.length}{' '}
              {sortedJobs.length === 1
                ? 'application'
                : 'applications'}
            </p>
          </div>
        </div>

        {jobs.length === 0 ? (
          <div className="applications-empty">
            <div className="applications-empty__icon">
              +
            </div>

            <h3>No applications yet</h3>

            <p>
              Add your first job application
              to start tracking your job search.
            </p>
          </div>
        ) : sortedJobs.length === 0 ? (
          <div className="applications-empty">
            <h3>No applications found</h3>

            <p>
              Try changing your search or
              status filter.
            </p>
          </div>
        ) : (
          <div className="applications__jobs">
            {sortedJobs.map((job) => (
              <JobCard
                key={job.id}
                company={job.company}
                position={job.position}
                status={job.status}
                onEdit={() => onEditJob(job)}
                onDelete={() =>
                  deleteJob(job.id)
                }
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Applications