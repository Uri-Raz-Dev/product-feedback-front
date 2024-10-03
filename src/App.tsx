import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AppHeader from './cmps/AppHeader'
import { store } from './store/store'
import Suggestions from './pages/Suggestions'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className='main-layout'>
          <AppHeader />
          <main className='app-layout main-layout full '>
            <Routes>
              <Route element={<Suggestions />} path='/'></Route>
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>
  )
}
