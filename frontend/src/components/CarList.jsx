import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCarsAsync } from '../redux/slices/carsSlice'
import CarListItem from './CarListItem'
import Pagination from './Pagination'

const brands = [
	{ id: 8, name: 'Aston Martin' },
	{ id: 9, name: 'Audi' },
	{ id: 12, name: 'BAIC' },
	{ id: 13, name: 'Bentley' },
	{ id: 16, name: 'BMW' },
	{ id: 21, name: 'Cadillac' },
	{ id: 26, name: 'Chevrolet' },
	{ id: 27, name: 'Chrysler' },
	{ id: 28, name: 'Citroen' },
	{ id: 33, name: 'Daewoo' },
	{ id: 35, name: 'Daihatsu' },
	{ id: 41, name: 'Dodge' },
	{ id: 46, name: 'Ferrari' },
	{ id: 47, name: 'Fiat' },
	{ id: 48, name: 'Ford' },
	{ id: 52, name: 'GMC' },
	{ id: 56, name: 'Honda' },
	{ id: 57, name: 'Hummer' },
	{ id: 58, name: 'Hyundai' },
	{ id: 60, name: 'Infiniti' },
	{ id: 64, name: 'Isuzu' },
	{ id: 67, name: 'Jaguar' },
	{ id: 68, name: 'Jeep' },
	{ id: 70, name: 'Kia' },
	{ id: 72, name: 'Lamborghini' },
	{ id: 74, name: 'Land Rover' },
	{ id: 76, name: 'Lexus' },
	{ id: 77, name: 'Lincoln' },
	{ id: 78, name: 'Lotus' },
	{ id: 83, name: 'Maserati' },
	{ id: 84, name: 'Maybach' },
	{ id: 85, name: 'Mazda' },
	{ id: 86, name: 'McLaren' },
	{ id: 88, name: 'Mercedes-Benz' },
	{ id: 89, name: 'Mercury' },
	{ id: 94, name: 'MINI' },
	{ id: 95, name: 'Mitsubishi' },
	{ id: 96, name: 'Mitsuoka' },
	{ id: 99, name: 'Nissan' },
	{ id: 107, name: 'Peugeot' },
	{ id: 109, name: 'Pontiac' },
	{ id: 110, name: 'Porsche' },
	{ id: 118, name: 'Rolls-Royce' },
	{ id: 121, name: 'Saab' },
	{ id: 123, name: 'Renault Samsung' },
	{ id: 128, name: 'Smart' },
	{ id: 131, name: 'SsangYong' },
	{ id: 132, name: 'Subaru' },
	{ id: 133, name: 'Suzuki' },
	{ id: 140, name: 'Toyota' },
	{ id: 147, name: 'Volkswagen' },
	{ id: 148, name: 'Volvo' },
	{ id: 168, name: 'Foton' },
	{ id: 169, name: 'DongFeng' },
	{ id: 187, name: 'Tesla' },
	{ id: 232, name: 'Genesis' },
	{ id: 275, name: 'RAM' },
	{ id: 279, name: 'Polestar' },
	{ id: 500003, name: 'Joylong' },
	{ id: 500004, name: 'Scania' },
	{ id: 500005, name: 'SS Motors' },
]

const CarList = () => {
	const dispatch = useDispatch()
	const { cars, loading, error, currentPage, totalPages } = useSelector(
		(state) => state.cars,
	)

	const [filters, setFilters] = useState({
		brandId: '', // ID марки
		model: '',
		color: '',
		fuelType: '',
		minYear: '',
		maxYear: '',
		minMileage: '',
		maxMileage: '',
	})

	const [brandSearch, setBrandSearch] = useState('') // Для поиска по названию марки
	const [showBrands, setShowBrands] = useState(false) // Контроль отображения списка марок
	const dropdownRef = useRef(null) // Ссылка на выпадающий список

	// Загрузка автомобилей
	useEffect(() => {
		dispatch(fetchCarsAsync(currentPage))
	}, [dispatch, currentPage])

	// Закрытие списка марок по клавише ESC
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') {
				setShowBrands(false)
			}
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [])

	// Закрытие списка марок при клике вне области
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setShowBrands(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	// Фильтрация автомобилей
	const filteredCars = cars.filter((car) => {
		return (
			(!filters.brandId || car.brand_id === parseInt(filters.brandId)) &&
			(!filters.model ||
				car.model?.toLowerCase().includes(filters.model.toLowerCase())) &&
			(!filters.color ||
				car.color?.toLowerCase().includes(filters.color.toLowerCase())) &&
			(!filters.fuelType || car.fuel_type === filters.fuelType) &&
			(!filters.minYear || car.year >= parseInt(filters.minYear)) &&
			(!filters.maxYear || car.year <= parseInt(filters.maxYear)) &&
			(!filters.minMileage ||
				car.lots?.odometer_km >= parseInt(filters.minMileage)) &&
			(!filters.maxMileage ||
				car.lots?.odometer_km <= parseInt(filters.maxMileage))
		)
	})

	// Обработчик изменения фильтров
	const handleFilterChange = (e) => {
		const { name, value } = e.target
		setFilters((prevFilters) => ({
			...prevFilters,
			[name]: value,
		}))
	}

	return (
		<div className='container mx-auto flex'>
			{/* Фильтры */}
			<div className='w-1/4 p-4 border-r'>
				<h2 className='text-lg font-bold mb-4 text-red-500'>Фильтры</h2>
				<div className='grid grid-cols-1 gap-4'>
					<div className='relative' ref={dropdownRef}>
						<input
							type='text'
							name='brand'
							placeholder='Марка'
							value={brandSearch}
							onChange={(e) => setBrandSearch(e.target.value)}
							onFocus={() => setShowBrands(true)}
							className='p-2 border border-gray-300 rounded w-full'
						/>
						{showBrands && (
							<div className='absolute bg-white border border-gray-300 rounded w-full max-h-40 overflow-y-auto'>
								{brands
									.filter((brand) =>
										brand.name
											.toLowerCase()
											.includes(brandSearch.toLowerCase()),
									)
									.map((brand) => (
										<div
											key={brand.id}
											className='p-2 hover:bg-gray-200 cursor-pointer'
											onClick={() => {
												setFilters((prevFilters) => ({
													...prevFilters,
													brandId: brand.id,
												}))
												setBrandSearch(brand.name)
												setShowBrands(false)
											}}
										>
											{brand.name}
										</div>
									))}
							</div>
						)}
					</div>
					<input
						type='text'
						name='model'
						placeholder='Модель'
						value={filters.model}
						onChange={handleFilterChange}
						className='p-2 border border-gray-300 rounded'
					/>
					<input
						type='text'
						name='color'
						placeholder='Цвет'
						value={filters.color}
						onChange={handleFilterChange}
						className='p-2 border border-gray-300 rounded'
					/>
					<select
						name='fuelType'
						value={filters.fuelType}
						onChange={handleFilterChange}
						className='p-2 border border-gray-300 rounded'
					>
						<option value=''>Тип топлива</option>
						<option value='gasoline'>Бензин</option>
						<option value='diesel'>Дизель</option>
						<option value='electric'>Электрический</option>
						<option value='hybrid'>Гибрид</option>
					</select>
					<input
						type='number'
						name='minYear'
						placeholder='Год от'
						value={filters.minYear}
						onChange={handleFilterChange}
						className='p-2 border border-gray-300 rounded'
					/>
					<input
						type='number'
						name='maxYear'
						placeholder='Год до'
						value={filters.maxYear}
						onChange={handleFilterChange}
						className='p-2 border border-gray-300 rounded'
					/>
					<input
						type='number'
						name='minMileage'
						placeholder='Пробег от'
						value={filters.minMileage}
						onChange={handleFilterChange}
						className='p-2 border border-gray-300 rounded'
					/>
					<input
						type='number'
						name='maxMileage'
						placeholder='Пробег до'
						value={filters.maxMileage}
						onChange={handleFilterChange}
						className='p-2 border border-gray-300 rounded'
					/>
					<button
						onClick={() => setFilters({})}
						className='p-2 bg-red-500 text-white rounded hover:bg-red-600 transition'
					>
						Сбросить фильтры
					</button>
				</div>
			</div>

			{/* Список автомобилей */}
			<div className='w-3/4 p-4'>
				{error && <p className='text-red-500'>Ошибка: {error}</p>}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{filteredCars.map((car, index) => (
						<CarListItem key={index} car={car} />
					))}
				</div>
				{loading && <p className='text-center text-gray-500'>Загрузка...</p>}
				{!loading && filteredCars.length === 0 && (
					<p className='text-center text-gray-500'>
						Нет подходящих автомобилей.
					</p>
				)}
				{/* Пагинация */}
				{!loading && totalPages > 1 && (
					<div className='mt-6'>
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={(page) =>
								dispatch({ type: 'cars/setCurrentPage', payload: page })
							}
						/>
					</div>
				)}
			</div>
		</div>
	)
}

export default CarList
