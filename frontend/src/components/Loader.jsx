const Loader = () => {
	return (
		<div className='flex justify-center items-center'>
			<div className='relative w-16 h-16'>
				<div className='absolute inset-0 border-4 border-orange-600 border-t-transparent rounded-full animate-spin'></div>
				<div className='absolute inset-0 border-4 border-orange-300 border-t-transparent rounded-full animate-spin-slow'></div>
			</div>
		</div>
	)
}

export default Loader
