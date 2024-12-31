import { useState, useEffect } from 'react'
import { fetchCars } from '../api/carAPI.js' // API для получения данных
import CarListItem from './CarListItem' // Компонент для отображения одной машины
import Loader from './Loader.jsx'

const CarList = () => {
	const [cars, setCars] = useState([]) // Список машин
	const [page, setPage] = useState(1) // Текущая страница
	const [loading, setLoading] = useState(false) // Статус загрузки
	const [error, setError] = useState(null) // Ошибки
	const [hasMore, setHasMore] = useState(true) // Проверка, есть ли ещё данные

	// Загрузка данных
	useEffect(() => {
		const loadCars = async () => {
			try {
				setLoading(true)
				const data = await fetchCars(page) // Получение данных с текущей страницы
				if (data.length === 0) {
					// Если данных больше нет, отключаем пагинацию
					setHasMore(false)
				} else {
					setCars((prevCars) => [...prevCars, ...data]) // Добавляем новые машины
				}
			} catch (err) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		loadCars()
	}, [page]) // Вызывается при изменении страницы

	// Функция для загрузки следующей страницы
	const loadMore = () => {
		if (!loading && hasMore) {
			setPage((prevPage) => prevPage + 1)
		}
	}

	return (
		<>
			{error && <p className='text-red-500'>Error: {error}</p>}

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
				{/* Сортировка и отображение машин */}
				{cars
					.sort((a, b) => (a.year > b.year ? -1 : 1)) // Сортировка по году (от нового к старому)
					.map((car, index) => (
						<CarListItem key={index} car={car} />
					))}
			</div>

			{/* Загрузка */}
			{loading && <Loader />}

			{/* Кнопка "Load More" */}
			{!loading && hasMore && (
				<button
					onClick={loadMore}
					className='bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700'
				>
					Load More
				</button>
			)}

			{/* Сообщение, если данные закончились */}
			{!hasMore && <p className='text-gray-500 mt-4'>No more cars to load.</p>}
		</>
	)
}

export default CarList
