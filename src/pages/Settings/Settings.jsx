import {
  useEffect,
  useState,
} from 'react'

import './Settings.css'

function Settings() {
  const [settings, setSettings] = useState(() => {
    const savedSettings =
      localStorage.getItem('settings')

    if (savedSettings) {
      return JSON.parse(savedSettings)
    }

    return {
      name: '',
      email: '',
      language: 'English',
    }
  })

  const [saved, setSaved] = useState(false)

  useEffect(() => {
    localStorage.setItem(
      'settings',
      JSON.stringify(settings)
    )
  }, [settings])

  function handleSubmit(event) {
    event.preventDefault()

    setSaved(true)
  }

  function handleChange(event) {
    setSaved(false)

    setSettings({
      ...settings,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <div className="settings">
      <section className="settings__header">
        <div>
          <h1>Settings</h1>

          <p>
            Manage your application settings
          </p>
        </div>
      </section>

      <section className="settings__card">
        <div className="settings__card-header">
          <h2>Profile</h2>

          <p>
            Update your personal information
          </p>
        </div>

        <form
          className="settings-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="name">
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={settings.name}
              onChange={handleChange}
              placeholder="Your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={settings.email}
              onChange={handleChange}
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="language">
              Language
            </label>

            <select
              id="language"
              name="language"
              value={settings.language}
              onChange={handleChange}
            >
              <option value="English">
                English
              </option>

              <option value="Russian">
                Russian
              </option>
            </select>
          </div>

          <div className="settings-form__footer">
            <button
              type="submit"
              className="button button--primary"
            >
              Save settings
            </button>

            {saved && (
              <p className="settings-success">
                Settings saved successfully.
              </p>
            )}
          </div>
        </form>
      </section>
    </div>
  )
}

export default Settings