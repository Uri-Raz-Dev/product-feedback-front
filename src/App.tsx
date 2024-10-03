import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes } from 'react-router-dom'
import AppHeader from './cmps/AppHeader'
import { store } from './store/store'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className='main-layout'>
          <AppHeader />
          <main className='app-layout'>
            <Routes>{/* <Route element={<Home />} path='/'></Route> */}</Routes>
          </main>
        </section>
      </Router>
    </Provider>
  )
}
