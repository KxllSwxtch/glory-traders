import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCarsAsync, setFilters } from '../redux/slices/carsSlice'
import CarListItem from './CarListItem'
import Pagination from './Pagination'
import Loader from './Loader'

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

	const [filters, setFiltersState] = useState({
		manufacturerId: '',
		modelId: '',
		generationId: '',
		colorId: '',
		fuelId: '',
		transmissionId: '',
		mountOneId: '',
		mountTwoId: '',
		yearOneId: '',
		yearTwoId: '',
		mileageOneId: '',
		mileageTwoId: '',
	})

	const [availableModels, setAvailableModels] = useState([])
	const [availableGenerations, setAvailableGenerations] = useState([])
	const [isFiltersOpen, setIsFiltersOpen] = useState(false)

	useEffect(() => {
		if (filters.manufacturerId) {
			// Fetch models dynamically based on manufacturerId
			// Example:
			setAvailableModels([
				{ id: '1', name: 'Model 1' },
				{ id: '2', name: 'Model 2' },
			])
		} else {
			setAvailableModels([])
		}
	}, [filters.manufacturerId])

	useEffect(() => {
		if (filters.modelId) {
			// Fetch generations dynamically based on modelId
			setAvailableGenerations([
				{ id: '1', name: 'Generation 1' },
				{ id: '2', name: 'Generation 2' },
			])
		} else {
			setAvailableGenerations([])
		}
	}, [filters.modelId])

	useEffect(() => {
		const queryParams = {
			page: currentPage,
			filters: {
				...Object.fromEntries(
					Object.entries(filters).filter(([_, value]) => value !== ''),
				),
			},
		}

		dispatch(fetchCarsAsync(queryParams))
	}, [filters, currentPage, dispatch])

	const handleFilterChange = (e) => {
		const { name, value } = e.target
		const updatedFilters = {
			...filters,
			[name]: value,
		}
		setFiltersState(updatedFilters)
		dispatch(setFilters(updatedFilters))
	}

	const resetFilters = () => {
		const initialFilters = {
			manufacturerId: '',
			modelId: '',
			generationId: '',
			colorId: '',
			fuelId: '',
			transmissionId: '',
			mountOneId: '',
			mountTwoId: '',
			yearOneId: '',
			yearTwoId: '',
			mileageOneId: '',
			mileageTwoId: '',
		}
		setFiltersState(initialFilters)
		setAvailableModels([])
		setAvailableGenerations([])
		dispatch(setFilters(initialFilters))
	}

	return (
		<div className='container mx-auto flex flex-col lg:flex-row'>
			{/* Кнопка для мобильных устройств */}
			<div className='lg:hidden mb-4'>
				<button
					className='bg-red-500 text-white p-2 rounded'
					onClick={() => setIsFiltersOpen(!isFiltersOpen)}
				>
					{isFiltersOpen ? 'Скрыть фильтры' : 'Показать фильтры'}
				</button>
			</div>

			{/* Фильтры */}
			<div
				className={`transition-all duration-300 lg:w-1/4 lg:block ${
					isFiltersOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'
				} lg:max-h-none lg:border-r lg:pr-4`}
			>
				<div className='p-4 border rounded-lg bg-gray-100 lg:bg-white lg:border-0'>
					<h2 className='text-lg font-bold mb-4'>Фильтры</h2>
					<div className='grid grid-cols-1 gap-4'>
						<select
							name='manufacturerId'
							value={filters.manufacturerId}
							onChange={handleFilterChange}
							className='p-2 border rounded'
						>
							<option value=''>Выберите марку</option>
							{brands.map((brand) => (
								<option key={brand.id} value={brand.id}>
									{brand.name}
								</option>
							))}
						</select>

						<select
							name='modelId'
							value={filters.modelId}
							onChange={handleFilterChange}
							className='p-2 border rounded'
							disabled={!filters.manufacturerId}
						>
							<option value=''>Выберите модель</option>
							{availableModels.map((model) => (
								<option key={model.id} value={model.id}>
									{model.name}
								</option>
							))}
						</select>

						<select
							name='generationId'
							value={filters.generationId}
							onChange={handleFilterChange}
							className='p-2 border rounded'
							disabled={!filters.modelId}
						>
							<option value=''>Выберите поколение</option>
							{availableGenerations.map((generation) => (
								<option key={generation.id} value={generation.id}>
									{generation.name}
								</option>
							))}
						</select>

						<input
							type='text'
							name='colorId'
							placeholder='Цвет'
							value={filters.colorId}
							onChange={handleFilterChange}
							className='p-2 border rounded'
						/>

						<select
							name='fuelId'
							value={filters.fuelId}
							onChange={handleFilterChange}
							className='p-2 border rounded'
						>
							<option value=''>Тип топлива</option>
							<option value='1'>Бензин</option>
							<option value='2'>Дизель</option>
							<option value='3'>Электрический</option>
						</select>

						<select
							name='transmissionId'
							value={filters.transmissionId}
							onChange={handleFilterChange}
							className='p-2 border rounded'
						>
							<option value=''>Тип трансмиссии</option>
							<option value='1'>Автоматическая</option>
							<option value='2'>Механическая</option>
						</select>

						<input
							type='number'
							name='mountOneId'
							placeholder='Месяц от'
							value={filters.mountOneId}
							onChange={handleFilterChange}
							className='p-2 border rounded'
						/>
						<input
							type='number'
							name='mountTwoId'
							placeholder='Месяц до'
							value={filters.mountTwoId}
							onChange={handleFilterChange}
							className='p-2 border rounded'
						/>

						<input
							type='number'
							name='yearOneId'
							placeholder='Год от'
							value={filters.yearOneId}
							onChange={handleFilterChange}
							className='p-2 border rounded'
						/>
						<input
							type='number'
							name='yearTwoId'
							placeholder='Год до'
							value={filters.yearTwoId}
							onChange={handleFilterChange}
							className='p-2 border rounded'
						/>

						<input
							type='number'
							name='mileageOneId'
							placeholder='Пробег от'
							value={filters.mileageOneId}
							onChange={handleFilterChange}
							className='p-2 border rounded'
						/>
						<input
							type='number'
							name='mileageTwoId'
							placeholder='Пробег до'
							value={filters.mileageTwoId}
							onChange={handleFilterChange}
							className='p-2 border rounded'
						/>

						<button
							onClick={resetFilters}
							className='bg-red-500 text-white p-2 rounded hover:bg-red-600'
						>
							Сбросить фильтры
						</button>
					</div>
				</div>
			</div>

			{/* Список автомобилей */}
			<div className='lg:w-3/4 lg:pl-4'>
				{error && <p className='text-red-500'>Ошибка: {error}</p>}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{cars.map((car, index) => (
						<CarListItem key={index} car={car} />
					))}
				</div>
				{loading && <Loader />}
				{!loading && cars.length === 0 && (
					<p className='text-center text-gray-500'>
						Нет подходящих автомобилей.
					</p>
				)}
				{totalPages > 1 && (
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={(page) =>
							dispatch({ type: 'cars/setCurrentPage', payload: page })
						}
					/>
				)}
			</div>
		</div>
	)
}

export default CarList
