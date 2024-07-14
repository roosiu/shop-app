import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register({ onRegister }) {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [confirmEmail, setConfirmEmail] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()

	const validateEmail = email => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
	}

	const handleSubmit = e => {
		e.preventDefault()
		const users = JSON.parse(localStorage.getItem('users')) || []
		if (users.some(user => user.username === username)) {
			setError('Nazwa użytkownika jest już zajęta.')
			return
		}
		if (users.some(user => user.email === email)) {
			setError('Adres email jest już używany.')
			return
		}
		if (!validateEmail(email)) {
			setError('Nieprawidłowy format adresu email.')
			return
		}
		if (email !== confirmEmail) {
			setError('Adresy email nie są zgodne.')
			return
		}
		if (username.length < 6 || username.length > 16 || !/^[a-zA-Z0-9]+$/.test(username)) {
			setError('Nazwa użytkownika musi mieć od 6 do 16 znaków i może zawierać tylko litery i cyfry.')
			return
		}
		if (password.length < 6) {
			setError('Hasło musi mieć co najmniej 6 znaków.')
			return
		}

		const newUser = { username, password, email }
		users.push(newUser)
		localStorage.setItem('users', JSON.stringify(users))
		onRegister(newUser)
		// Przekierowanie po pomyślnej rejestracji
		navigate('/products')
	}

	return (
		<div className='flex justify-center items-center h-screen'>
			<div className='max-w-md w-full bg-white p-8 rounded-lg shadow-md'>
				<h1 className='text-3xl font-bold mb-4 text-center'>Rejestracja</h1>
				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label className='block text-gray-700'>Nazwa użytkownika</label>
						<input
							type='text'
							value={username}
							onChange={e => setUsername(e.target.value)}
							className='w-full px-3 py-2 border rounded'
							required
						/>
					</div>
					<div className='mb-4'>
						<label className='block text-gray-700'>Email</label>
						<input
							type='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							className='w-full px-3 py-2 border rounded'
							required
						/>
					</div>
					<div className='mb-4'>
						<label className='block text-gray-700'>Potwierdź email</label>
						<input
							type='email'
							value={confirmEmail}
							onChange={e => setConfirmEmail(e.target.value)}
							className='w-full px-3 py-2 border rounded'
							required
						/>
					</div>
					<div className='mb-4'>
						<label className='block text-gray-700'>Hasło</label>
						<input
							type='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							className='w-full px-3 py-2 border rounded'
							required
						/>
					</div>
					{error && <p className='text-red-500 mb-4'>{error}</p>}
					<button type='submit' className='w-full bg-green-600 text-white py-2 rounded hover:bg-green-700'>
						Zarejestruj
					</button>
				</form>
			</div>
		</div>
	)
}

export default Register
