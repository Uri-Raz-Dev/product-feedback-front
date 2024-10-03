function AppHeader(): JSX.Element {
  return (
    <header className='header-layout full main-layout'>
      <div className='app-header'>
        <div className='logo'>
          <h1>Frontend Mentor</h1>
          <h2>Feedback Board</h2>
        </div>
        <div className='header-menu'>
          <svg width='20' height='17' xmlns='http://www.w3.org/2000/svg'>
            <g fill='#FFF' fillRule='evenodd'>
              <path d='M0 0h20v3H0zM0 7h20v3H0zM0 14h20v3H0z' />
            </g>
          </svg>
        </div>
      </div>
    </header>
  )
}

export default AppHeader
