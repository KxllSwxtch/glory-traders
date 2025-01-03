import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'
import HEROVIDEO_SRC from '../assets/herovideo.mp4'

const HeroSection = () => {
	return (
		<section className='relative h-[75vh]'>
			{/* Видео на заднем плане */}
			<video
				className='absolute inset-0 w-full h-full object-cover'
				src={HEROVIDEO_SRC}
				autoPlay
				playsInline
				loop
				muted
			></video>

			{/* Затемнение поверх видео */}
			<div className='absolute inset-0 bg-black bg-opacity-50'></div>

			{/* Контент поверх видео */}
			<div className='relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4'>
				<h1 className='text-4xl font-bold mb-4'>Автомобили и техника</h1>
				<p className='text-lg mb-6'>
					в наличии и под заказ с дилерских стоянок и аукционов Южной Кореи
				</p>
				<div className='flex space-x-4'>
					<a
						href='https://t.me/+HMBi9tn_wKw1OGVl'
						target='_blank'
						rel='noopener noreferrer'
						className='flex items-center bg-orange-600 text-white px-6 py-2 rounded shadow hover:bg-red-700 transition space-x-2'
					>
						<FaTelegramPlane className='text-lg' />
						<span>Telegram</span>
					</a>
					<a
						href='https://wa.me/821023297807'
						target='_blank'
						rel='noopener noreferrer'
						className='flex items-center bg-orange-700 text-white px-6 py-2 rounded shadow hover:bg-red-700 transition space-x-2'
					>
						<FaWhatsapp className='text-lg' />
						<span>WhatsApp</span>
					</a>
				</div>
			</div>
		</section>
	)
}

export default HeroSection
