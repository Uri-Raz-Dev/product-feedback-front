import { useEffect, useRef, useState } from 'react'
import { SvgIcon } from './Svgicon'
import { log } from 'console'
import { useLocation } from 'react-router-dom'
interface SortByProps {
  handlesortchange: (sortType: string) => void
  someArr: any[]
  selectCategory?: string
  sug?: {
    category: string
  }
  id?: any
}

function SortByDropdown({
  handlesortchange,
  someArr,
  selectCategory,
  sug,
  id,
}: SortByProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('Most Upvotes')
  const [selectedCategory, setSelectedCategory] = useState('Feature')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const handleOptionClick = (option: string) => {
    setSelected(option)
    setSelectedCategory(option)
    handlesortchange(option)
    setIsOpen(false)
  }
  const location = useLocation()
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

  console.log('Arr', someArr)
  return (
    <div
      className='sort-dropdown category-dropdown-container'
      ref={dropdownRef}
    >
      <div className='sort-menu'>
        <button className='dropdown-button' onClick={() => setIsOpen(!isOpen)}>
          {location.pathname === '/create_feedback' ? (
            <div>
              <span className='selected-option'>{selectedCategory}</span>{' '}
            </div>
          ) : (
            <div>
              Sort by : <span className='selected-option'>{selected}</span>{' '}
            </div>
          )}

          <div className={isOpen ? 'dropdown-arrow-open' : 'dropdown-arrow'}>
            <SvgIcon iconName='arrowDown' />
          </div>
        </button>
        {isOpen && (
          <div className='dropdown-content'>
            {location.pathname === '/create_feedback'
              ? someArr.map((option) => (
                  <a
                    key={option}
                    href='#'
                    onClick={(e) => {
                      e.preventDefault()
                      handleOptionClick(option)
                    }}
                  >
                    <span>{option}</span>
                    {option === selectedCategory ||
                      (id
                        ? option === sug?.category
                        : option === selectCategory && (
                            <span className='check'>
                              <SvgIcon iconName='check' />
                            </span>
                          ))}
                  </a>
                ))
              : [
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

export default SortByDropdown
