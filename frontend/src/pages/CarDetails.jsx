import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchCarDetails } from '../api/carAPI'

const CarDetails = () => {
	const { id } = useParams() // Получение динамического параметра :id
	const [car, setCar] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const loadCarDetails = async () => {
			try {
				const carData = await fetchCarDetails(id) // Функция для запроса данных об автомобиле
				setCar(carData)
			} catch (err) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		loadCarDetails()
	}, [id])

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error: {error}</p>

	return (
		<div className='p-4'>
			<h1 className='text-2xl font-bold mb-4'>{car.title}</h1>
			<img
				src={car.image}
				alt={car.title}
				className='w-full h-64 object-cover mb-4'
			/>
			<ul className='text-gray-700'>
				<li>
					<strong>Год выпуска:</strong> {car.year}
				</li>
				<li>
					<strong>Тип топлива:</strong> {car.fuel_type}
				</li>
				<li>
					<strong>Пробег:</strong> {car.odometer_km} км
				</li>
				<li>
					<strong>Объём двигателя:</strong> {car.engine_volume} л
				</li>
				<li>
					<strong>Цена:</strong> {car.original_price.toLocaleString()} ₩
				</li>
			</ul>
		</div>
	)
}

export default CarDetails
