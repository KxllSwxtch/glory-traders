import React, { useState, useEffect } from 'react'
import { fetchCars } from '../api/carAPI'
import CarListItem from './CarListItem'

const CarList = () => {
	const [cars, setCars] = useState([]) // Список машин
	const [page, setPage] = useState(1) // Текущая страница
	const [loading, setLoading] = useState(false) // Статус загрузки
	const [error, setError] = useState(null) // Ошибки

	// Загрузка данных
	useEffect(() => {
		const loadCars = async () => {
			try {
				setLoading(true)
				const data = await fetchCars(page)
				setCars((prevCars) => [...prevCars, ...data])
			} catch (err) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		loadCars()
	}, [page])

	return (
		<div className='p-4'>
			{error && <p className='text-red-500'>Error: {error}</p>}

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{cars
					.sort((a, b) => (a.year > b.year ? -1 : 1))
					.map((car, index) => (
						<CarListItem key={index} car={car} />
					))}
			</div>

			{loading && <p>Loading...</p>}
		</div>
	)
}

export default CarList
