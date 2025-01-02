import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCarsAsync, setCurrentPage } from '../redux/slices/carsSlice'
import CarListItem from './CarListItem'
import Pagination from './Pagination'
import Loader from './Loader'

const CarList = () => {
	const dispatch = useDispatch()
	const { cars, currentPage, totalPages, loading, error } = useSelector(
		(state) => state.cars,
	)

	// Загружаем автомобили при изменении текущей страницы
	useEffect(() => {
		dispatch(fetchCarsAsync(currentPage))
	}, [dispatch, currentPage])

	// Обработчик изменения страницы
	const handlePageChange = (page) => {
		if (page > 0 && page <= totalPages) {
			dispatch(setCurrentPage(page)) // Обновляем текущую страницу в Redux
			window.scrollTo({ top: 0, behavior: 'smooth' }) // Скроллим наверх страницы
		}
	}

	return (
		<div className='p-4'>
			{/* Ошибка */}
			{error && <p className='text-red-500'>Ошибка: {error}</p>}

			{/* Список автомобилей */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
				{cars.map((car) => (
					<CarListItem key={car.id} car={car} />
				))}
			</div>

			{/* Индикатор загрузки */}
			{loading && <Loader />}

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
