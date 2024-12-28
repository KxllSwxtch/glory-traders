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
		<div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden'>
			{/* Изображение */}
			{imageSrc ? (
				<img
					src={imageSrc}
					alt={car.title}
					className='w-3 h-3 block'
					style={{ width: '20%' }}
				/>
			) : (
				<div className='w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 italic'>
					No image available
				</div>
			)}

			{/* Содержимое карточки */}
			<div className='p-4'>
				<h2 className='text-lg font-bold text-gray-800 mb-2'>{car.title}</h2>
				<ul className='text-sm text-gray-600 mb-4'>
					<li>
						<strong>Тип топлива:</strong> {fuelTypes[car.fuel_type] || 'N/A'}
					</li>
					<li>
						<strong>Год выпуска:</strong> {car.year || 'N/A'}
					</li>
					<li>
						<strong>Пробег:</strong> {car.lots?.odometer_km || 'N/A'} км
					</li>
					<li>
						<strong>Объём двигателя:</strong> {car.lots?.engine_volume || 'N/A'}{' '}
						л
					</li>
				</ul>
				<p className='text-md font-semibold text-gray-800'>
					Цена в Корее:{' '}
					<span className='text-blue-500'>
						{car.lots?.original_price?.toLocaleString() || 'N/A'} ₩
					</span>
				</p>
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
