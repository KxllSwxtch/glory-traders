const BASE_URL = 'http://127.0.0.1:8000/api/proxy/filter/filter'

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
