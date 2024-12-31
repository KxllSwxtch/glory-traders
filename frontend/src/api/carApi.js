const BASE_URL = 'http://127.0.0.1:8000/api/proxy/filter/page'

export const fetchCars = async (page) => {
	try {
		const response = await fetch(`${BASE_URL}?page=${page}`)
		const data = await response.json()

		return data?.data || []
	} catch (error) {
		console.error('Error fetching cars:', error)
		throw error
	}
}

export const fetchCarDetails = async (id) => {
	try {
		const response = await fetch(`http://127.0.0.1:8000/api/cars/${id}`)
		if (!response.ok) {
			throw new Error('Failed to fetch car details')
		}
		return await response.json()
	} catch (error) {
		console.error(error)
		throw error
	}
}
