import { useEffect, useRef, useState } from 'react'
import { SvgIcon } from './Svgicon'
interface SortByProps {
  handlesortchange: (sortType: string) => void
}
function SortBy({ handlesortchange }: SortByProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false) // State to toggle dropdown visibility
  const [selected, setSelected] = useState('Most Upvotes') // State to track selected option
  const dropdownRef = useRef<HTMLDivElement>(null)
  const handleOptionClick = (option: string) => {
    setSelected(option) // Update selected option
    handlesortchange(option) // Call parent handler with selected option
    setIsOpen(false) // Close dropdown
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='sort-dropdown' ref={dropdownRef}>
      <div className='sort-menu'>
        <button className='dropdown-button' onClick={() => setIsOpen(!isOpen)}>
          <div>
            Sort by : <span className='selected-option'>{selected}</span>{' '}
          </div>
          <div className={isOpen ? 'dropdown-arrow-open' : 'dropdown-arrow'}>
            <SvgIcon iconName='arrowDown' />
          </div>
        </button>
        {isOpen && (
          <div className='dropdown-content'>
            {[
              'Most Upvotes',
              'Least Upvotes',
              'Most Comments',
              'Least Comments',
            ].map((option) => (
              <a
                key={option}
                href='#'
                onClick={(e) => {
                  e.preventDefault()
                  handleOptionClick(option)
                }}
              >
                <span>{option}</span>
                {option === selected && (
                  <span className='check'>
                    <SvgIcon iconName='check' />
                  </span>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SortBy
