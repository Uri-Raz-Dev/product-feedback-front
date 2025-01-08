import { Link } from 'react-router-dom'
import { setSideBar } from '../store/actions/suggestions.action'
import { useState } from 'react'
import { Suggestions } from '../services/feedback.service.local'
import { SuggestionsListProps } from './SuggestionsList'

type Categories = {
  categories: string[]
  sidebar: boolean
}

interface FilterByCategories {
  handlecategorychange: (categoryType: string) => void
}
function Sidebar({
  categories,
  sidebar,
  handlecategorychange,
  suggestions,
}: Categories & FilterByCategories & SuggestionsListProps): JSX.Element {
  const [selected, setSelected] = useState('ALL')

  function handleCategoryClick(option: string) {
    setSelected(option)
    handlecategorychange(option)
  }

  function countSuggestionStatus(status: string): number {
    let totalCount = 0
    suggestions.forEach((suggestion) => {
      suggestion.productRequests.forEach((item) => {
        if (item.status === status) totalCount++
      })
    })
    return totalCount
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
              <span>{countSuggestionStatus('planned')}</span>
            </li>
            <li>
              <span></span>
              <span>In-Progress</span>
              <span>{countSuggestionStatus('in-progress')}</span>
            </li>
            <li>
              <span></span>
              <span>Live</span>
              <span>{countSuggestionStatus('suggestion')}</span>
            </li>
          </ul>
        </section>
      </aside>
    </>
  )
}

export default Sidebar
