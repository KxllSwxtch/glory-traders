import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header, Footer } from './components'
import { Home, Catalog, Contacts, CarDetails } from './pages'

function App() {
	return (
		<Router>
			<div className='flex flex-col min-h-screen'>
				<Header />
				<main className='pt-32 flex-grow'>
					<div className='mx-auto'>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/catalog' element={<Catalog />} />
							<Route path='/contacts' element={<Contacts />} />
							<Route path='/car/:id' element={<CarDetails />} />
						</Routes>
					</div>
				</main>
				<Footer />
			</div>
		</Router>
	)
}

export default App
