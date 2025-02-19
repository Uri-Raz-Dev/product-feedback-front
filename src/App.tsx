import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AppHeader from './cmps/AppHeader'
import { store } from './store/store'
import Suggestions from './pages/Suggestions'
import FeedbackDetail from './pages/FeedbackDetail'
import NewFeedback from './pages/NewFeedback'
import EditFeedback from './pages/EditFeedback'
import Roadmap from './pages/Roadmap'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className='main-layout'>
          <main className='app-layout main-layout full '>
            <Routes>
              <Route
                element={
                  <>
                    <AppHeader />
                    <Suggestions />
                  </>
                }
                path='/'
              ></Route>
              <Route element={<FeedbackDetail />} path='/feedback/:id'></Route>
              <Route element={<NewFeedback />} path='/create_feedback/'></Route>
              <Route
                element={<NewFeedback />}
                path='/create_feedback/:id'
              ></Route>
              <Route
                element={<EditFeedback />}
                path='/edit_feedback/:id'
              ></Route>
              <Route element={<Roadmap />} path='/roadmap'></Route>
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>
  )
}
