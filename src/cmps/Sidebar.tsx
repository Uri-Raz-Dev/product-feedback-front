import { Link } from 'react-router-dom'
import { setSideBar } from '../store/actions/suggestions.action'
import { useState } from 'react'

type Categories = {
  categories: string[]
  sidebar: boolean
}

interface FilterByCategories {
  handlecategorychange: (cateforyType: string) => void
}
function Sidebar({
  categories,
  sidebar,
  handlecategorychange,
}: Categories & FilterByCategories): JSX.Element {
  const [selected, setSelected] = useState('ALL')

  function handleCategoryClick(option: string) {
    setSelected(option)
    handlecategorychange(option)
  }

  return (
    <>
      <div
        onClick={() => setSideBar(false)}
        className={sidebar ? 'layout active' : 'layout'}
      ></div>
      <aside className={sidebar ? 'sidebar open' : 'sidebar'}>
        <section className='categories'>
          <ul className='category-list'>
            {categories.map((option) => {
              return (
                <li onClick={() => handleCategoryClick(option)} key={option}>
                  {option}
                </li>
              )
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
              <span></span>
              <span>Planned</span>
              <span>1</span>
            </li>
            <li>
              <span></span>
              <span>In-Progress</span>
              <span>1</span>
            </li>
            <li>
              <span></span>
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
