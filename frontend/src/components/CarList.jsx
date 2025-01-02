import { useState, useEffect } from 'react'
import { fetchCars } from '../api/carAPI'
import CarListItem from './CarListItem'
import Pagination from './Pagination'

const CarList = () => {
	const [cars, setCars] = useState([]) // Данные автомобилей
	const [currentPage, setCurrentPage] = useState(
		() => Number(localStorage.getItem('currentPage')) || 1, // Получаем страницу из localStorage
	) // Текущая страница
	const [totalPages, setTotalPages] = useState(0) // Общее количество страниц
	const [loading, setLoading] = useState(false) // Индикатор загрузки
	const [error, setError] = useState(null) // Ошибки

	useEffect(() => {
		const loadCars = async () => {
			try {
				setLoading(true)
				setCars([]) // Очистка списка автомобилей перед загрузкой новых данных
				const data = await fetchCars(currentPage)
				setCars(data?.data)
				setTotalPages(data.pageCount)
			} catch (err) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		loadCars()
	}, [currentPage])

	// Сохранение текущей страницы в localStorage
	useEffect(() => {
		localStorage.setItem('currentPage', currentPage)
	}, [currentPage])

	// Переход на страницу
	const handlePageChange = (page) => {
		if (page > 0 && page <= totalPages) {
			setCurrentPage(page)
			window.scrollTo({ top: 0, behavior: 'smooth' }) // Скролл к верху страницы
		}
	}

	return (
		<div className='p-4'>
			{error && <p className='text-red-500'>Ошибка: {error}</p>}

			{/* Список автомобилей */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{cars?.map((car, index) => (
					<CarListItem key={index} car={car} />
				))}
			</div>

			{loading && <p className='text-gray-500 text-center mt-4'>Загрузка...</p>}

			{/* Пагинация */}
			{!loading && totalPages > 1 && (
				<div className='flex justify-center items-center space-x-2 mt-6'>
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</div>
			)}
		</div>
	)
}

export default CarList
