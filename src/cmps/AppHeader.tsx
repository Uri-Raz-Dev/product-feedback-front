import { SvgIcon } from './Svgicon'

function AppHeader(): JSX.Element {
  return (
    <header className='header-layout full main-layout'>
      <div className='app-header'>
        <div className='logo'>
          <h1>Frontend Mentor</h1>
          <h2>Feedback Board</h2>
        </div>
        <div className='header-menu'>
          <SvgIcon iconName='hamburger' />
        </div>
      </div>
    </header>
  )
}

export default AppHeader
