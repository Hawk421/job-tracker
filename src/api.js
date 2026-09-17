const API_URL = 'http://localhost:3000/api'

export async function apiFetch(
  endpoint,
  options = {}
) {
  const token = localStorage.getItem('token')

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),
      },
    }
  )

  if (response.status === 401) {
    localStorage.removeItem('token')

    window.location.href = '/login'

    throw new Error(
      'Session expired'
    )
  }

  return response
}