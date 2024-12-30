import { CarList, Header, Footer } from './components'

function App() {
	return (
		<div className='App'>
			<Header />
			<main className='pt-32'>
				<div className='container mx-auto px-4'>
					<CarList />
				</div>
			</main>
			<Footer />
		</div>
	)
}

export default App
