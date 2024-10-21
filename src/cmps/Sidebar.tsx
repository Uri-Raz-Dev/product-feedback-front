import { Link } from 'react-router-dom'

type Categories = {
  categories: string[]
  sidebar: boolean
}
function Sidebar({ categories, sidebar }: Categories): JSX.Element {
  return (
    <>
      <div className='layout'></div>
      <aside className={sidebar ? 'sidebar open' : 'sidebar'}>
        <section className='categories'>
          <ul className='category-list'>
            {categories.map((category, idx) => {
              return <li key={idx}>{category}</li>
            })}
          </ul>
        </section>
        <section className='roadmap'>
          <section className='roadmap-header'>
            <span>Roadmap</span>
            <Link to='/'>View</Link>
          </section>
          <ul className='roadmap-links'>
            <li>
              <span>c</span>
              <span>Planned</span>
              <span>1</span>
            </li>
            <li>
              <span>c</span>
              <span>In-Progress</span>
              <span>1</span>
            </li>
            <li>
              <span>c</span>
              <span>Live</span>
              <span>1</span>
            </li>
          </ul>
        </section>
      </aside>
    </>
  )
}

export default Sidebar
