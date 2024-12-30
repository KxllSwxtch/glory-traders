import LOGO_SRC from '../assets/logo.png'

const Footer = () => {
	return (
		<footer className='bg-black text-white py-8'>
			<div className='container mx-auto px-4'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					{/* Логотип */}
					<div>
						<img
							src={LOGO_SRC} // Замените на реальный путь к логотипу
							alt='Mike Auto Logo'
							className='h-12 mb-4'
						/>
					</div>

					{/* Информация */}
					<div>
						<h4 className='text-lg font-semibold mb-4'>Информация</h4>
						<ul className='space-y-2'>
							<li>
								<a
									href='#'
									className='text-gray-300 hover:text-white transition'
								>
									Каталог авто из Кореи
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-gray-300 hover:text-white transition'
								>
									Контакты
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-gray-300 hover:text-white transition'
								>
									Политика конфиденциальности
								</a>
							</li>
						</ul>
					</div>

					{/* Контакты */}
					<div>
						<h4 className='text-lg font-semibold mb-4'>Контакты</h4>
						<ul className='space-y-2'>
							<li>Телефон: +7 (993) 600-91-12</li>
							<li>
								E-mail:{' '}
								<a
									href='mailto:info@mike-auto.ru'
									className='text-gray-300 hover:text-white transition'
								>
									info@mike-auto.ru
								</a>
							</li>
							<li>
								Адрес: Россия, г. Москва, ул. Земляной Вал 8, 6 этаж (1 кольцо)
							</li>
						</ul>
					</div>
				</div>

				{/* Дополнительная информация */}
				<p className='text-gray-500 text-sm mt-8'>
					Информация на сайте о стоимости автомобилей носит информационный
					характер и не является публичной офертой. Цены могут изменяться в
					зависимости от валютных курсов и условий сторонних организаций. Для
					уточнения информации рекомендуем обращаться к менеджеру.
				</p>

				{/* Copyright */}
				<p className='text-center text-gray-500 text-sm mt-4'>
					© 2024 Glory Traders
				</p>
			</div>
		</footer>
	)
}

export default Footer
