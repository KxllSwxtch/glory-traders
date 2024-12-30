import LOGO_SRC from '../assets/logo.png'

const Header = () => {
	return (
		<header className='bg-white shadow-md py-2 fixed top-0 left-0 w-full z-50'>
			<div className='container mx-auto flex items-center justify-between px-4'>
				{/* Логотип */}
				<div className='flex items-center space-x-4'>
					<img src={LOGO_SRC} alt='Mike Auto Logo' className='h-24' />
				</div>

				{/* Навигация */}
				<nav className='flex items-center space-x-8'>
					<a
						href='#'
						className='text-gray-700 hover:text-gray-900 font-medium transition'
					>
						Главная
					</a>
					<a
						href='#'
						className='text-gray-700 hover:text-gray-900 font-medium transition'
					>
						Каталог авто из Кореи
					</a>
					<a
						href='#'
						className='text-gray-700 hover:text-gray-900 font-medium transition'
					>
						Контакты
					</a>
				</nav>

				{/* Контакты и кнопка */}
				<div className='flex items-center space-x-6'>
					{/* Иконки */}
					<div className='flex items-center space-x-4'>
						<a
							href='https://t.me/+HMBi9tn_wKw1OGVl'
							target='__blank'
							rel='noopener noreferrer'
							className='text-gray-600 hover:text-gray-800 transition'
						>
							<img
								src='https://cdn-icons-png.flaticon.com/512/2111/2111646.png' // Telegram
								alt='Telegram'
								className='h-6 w-6'
							/>
						</a>
						<a
							href='https://wa.me/821023297807'
							className='text-gray-600 hover:text-gray-800 transition'
							target='__blank'
							rel='noopener noreferrer'
						>
							<img
								src='https://cdn-icons-png.flaticon.com/512/733/733585.png' // WhatsApp
								alt='WhatsApp'
								className='h-6 w-6'
							/>
						</a>
						<a
							href='#'
							className='text-gray-600 hover:text-gray-800 transition'
							target='__blank'
							rel='noopener noreferrer'
						>
							<img
								src='https://cdn-icons-png.flaticon.com/512/597/597177.png' // Phone
								alt='Phone'
								className='h-6 w-6'
							/>
						</a>
					</div>

					{/* Телефон */}
					<div className='text-gray-700 font-medium'>+7 (993) 600-91-12</div>

					{/* Кнопка */}
					<a
						href='#'
						className='bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition'
					>
						Оставить заявку
					</a>
				</div>
			</div>
		</header>
	)
}

export default Header
