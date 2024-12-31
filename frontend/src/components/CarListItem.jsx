import PropTypes from 'prop-types'

const CarListItem = ({ car }) => {
	const fuelTypes = {
		gasoline: 'Бензин',
		diesel: 'Дизель',
		electric: 'Электрический',
		hybrid: 'Гибрид',
		gas: 'Газ',
		hydrogen: 'Водородный',
	}

	const imageSrc = car.images?.images_original_big?.find((img) =>
		img.includes('_001'),
	)

	return (
		<div className='bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col justify-between w-full'>
			{/* Изображение */}
			{imageSrc ? (
				<img
					src={imageSrc}
					alt={car.title}
					className='w-full h-56 object-cover'
				/>
			) : (
				<div className='w-full h-56 bg-gray-200 flex items-center justify-center text-gray-500 italic'>
					No image available
				</div>
			)}

			{/* Содержимое карточки */}
			<div className='p-6 flex-grow flex flex-col'>
				<h2 className='text-xl font-bold text-gray-800 mb-3 text-center uppercase'>
					{car.title}
				</h2>
				<ul className='text-sm text-gray-600 mb-6 space-y-1'>
					<li>
						<strong>Тип топлива:</strong> {fuelTypes[car.fuel_type] || 'N/A'}
					</li>
					<li>
						<strong>Год выпуска:</strong> {car.year || 'N/A'} г.
					</li>
					<li>
						<strong>Пробег:</strong>{' '}
						{car.lots?.odometer_km.toLocaleString() || 'N/A'} км
					</li>
				</ul>
				<div className='mt-auto text-center'>
					<p className='text-lg font-bold text-red-600'>
						{car.lots?.original_price?.toLocaleString() || 'N/A'} ₩
					</p>
					{/* Кнопка */}
					<button className='mt-4 w-full bg-red-500 text-white py-2 rounded-md font-medium hover:bg-red-600 transition'>
						Подробнее
					</button>
				</div>
			</div>
		</div>
	)
}

// Валидация пропсов
CarListItem.propTypes = {
	car: PropTypes.shape({
		title: PropTypes.string.isRequired,
		year: PropTypes.number,
		fuel_type: PropTypes.string,
		images: PropTypes.shape({
			images_original_big: PropTypes.arrayOf(PropTypes.string),
		}),
		lots: PropTypes.shape({
			odometer_km: PropTypes.number,
			engine_volume: PropTypes.number,
			original_price: PropTypes.number,
		}),
	}),
}

export default CarListItem
