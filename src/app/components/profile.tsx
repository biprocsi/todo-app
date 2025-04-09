// components/Profile.tsx
import { useState, useEffect } from 'react'

const Profile = () => {
  const [user, setUser] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token')

      if (!token) {
        throw new Error('No token found. Please log in.')
      }

      const response = await fetch('/api/auth/login', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in Authorization header
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch profile')
      }

      const data = await response.json()
      setUser(data.user)
      setError(null) // Clear any errors
    } catch (error) {
      console.error('Error fetching profile:', error)
      setError('Failed to fetch user profile')
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  if (!user) {
    return <p>Loading...</p>
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h1 className="text-xl font-semibold mb-4">User Profile</h1>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  )
}

export default Profile
