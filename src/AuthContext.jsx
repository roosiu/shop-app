import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)

	const login = (username, token) => {
		setUser({ username, token })
		sessionStorage.setItem('user', JSON.stringify({ username, token }))
		sessionStorage.setItem('isAuthenticated', 'true')
	}

	const logout = () => {
		setUser(null)
		sessionStorage.removeItem('user')
		sessionStorage.removeItem('isAuthenticated')
	}

	return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth }
