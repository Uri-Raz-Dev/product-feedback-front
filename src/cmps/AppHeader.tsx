import { useState } from 'react'
import { SvgIcon } from './Svgicon'
import { setSideBar } from '../store/actions/suggestions.action'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

function AppHeader(): JSX.Element {
  const sidebar = useSelector(
    (state: RootState) => state.suggestionsModule.sidebar
  )
  return (
    <header className='header-layout full main-layout'>
      <div className='app-header'>
        <div className='logo'>
          <h1>Frontend Mentor</h1>
          <h2>Feedback Board</h2>
        </div>
        <div onClick={() => setSideBar(!sidebar)} className='header-menu'>
          <SvgIcon iconName='hamburger' />
        </div>
      </div>
    </header>
  )
}

export default AppHeader
