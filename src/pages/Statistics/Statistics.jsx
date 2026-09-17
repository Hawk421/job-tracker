import { useJobs } from '../../context/JobContext'
import StatCard from '../../components/StatCard/StatCard'

import './Statistics.css'

function Statistics() {
  const {
    jobs,
    loading,
    error,
  } = useJobs()

  if (loading) {
    return (
      <div className="statistics-state">
        <div className="statistics-spinner"></div>

        <p>
          Loading statistics...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="statistics-state statistics-state--error">
        <h2>
          Something went wrong
        </h2>

        <p>
          We couldn't load your statistics.
        </p>
      </div>
    )
  }

  const applications = jobs.length

  const applied = jobs.filter(
    (job) => job.status === 'Applied'
  ).length

  const interviews = jobs.filter(
    (job) => job.status === 'Interview'
  ).length

  const offers = jobs.filter(
    (job) => job.status === 'Offer'
  ).length

  const rejected = jobs.filter(
    (job) => job.status === 'Rejected'
  ).length

  const interviewRate =
    applications > 0
      ? Math.round(
          (interviews / applications) * 100
        )
      : 0

  const offerRate =
    interviews > 0
      ? Math.round(
          (offers / interviews) * 100
        )
      : 0

  const statistics = [
    {
      title: 'Applications',
      value: applications,
    },
    {
      title: 'Applied',
      value: applied,
    },
    {
      title: 'Interviews',
      value: interviews,
    },
    {
      title: 'Offers',
      value: offers,
    },
  ]

  return (
    <div className="statistics">
      <section className="statistics__header">
        <div>
          <h1>Statistics</h1>

          <p>
            Analyze your job search
          </p>
        </div>
      </section>

      <section className="statistics__overview">
        <div className="statistics__section-header">
          <div>
            <h2>Overview</h2>

            <p>
              Your application pipeline
            </p>
          </div>
        </div>

        <div className="stats-grid">
          {statistics.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
            />
          ))}
        </div>
      </section>

      <section className="statistics__conversion">
        <div className="statistics__section-header">
          <div>
            <h2>Conversion</h2>

            <p>
              How applications move through your pipeline
            </p>
          </div>
        </div>

        <div className="conversion-grid">
          <div className="conversion-card">
            <div className="conversion-card__content">
              <p className="conversion-card__label">
                Application → Interview
              </p>

              <p className="conversion-card__value">
                {interviewRate}%
              </p>

              <p className="conversion-card__description">
                Percentage of applications that reached
                the interview stage.
              </p>
            </div>

            <div className="conversion-card__bar">
              <div
                className="conversion-card__progress"
                style={{
                  width: `${interviewRate}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="conversion-card">
            <div className="conversion-card__content">
              <p className="conversion-card__label">
                Interview → Offer
              </p>

              <p className="conversion-card__value">
                {offerRate}%
              </p>

              <p className="conversion-card__description">
                Percentage of interviews that resulted
                in an offer.
              </p>
            </div>

            <div className="conversion-card__bar">
              <div
                className="conversion-card__progress"
                style={{
                  width: `${offerRate}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      <section className="statistics__summary">
        <div className="statistics__section-header">
          <div>
            <h2>Summary</h2>

            <p>
              Current status of your job search
            </p>
          </div>
        </div>

        <div className="statistics-summary">
          <div className="statistics-summary__item">
            <span>Rejected applications</span>
            <strong>{rejected}</strong>
          </div>

          <div className="statistics-summary__item">
            <span>Total applications</span>
            <strong>{applications}</strong>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Statistics