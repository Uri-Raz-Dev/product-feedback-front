import { useEffect, useRef, useState } from 'react'
import { SvgIcon } from './Svgicon'
interface SortByProps {
  handlesortchange: (sortType: string) => void
  someArr: any[]
  selectCategory?: string
}

function SortByDropdown({
  handlesortchange,
  someArr,
  selectCategory,
}: SortByProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('Most Upvotes')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const handleOptionClick = (option: string) => {
    setSelected(option)
    handlesortchange(option)
    setIsOpen(false)
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
            {someArr.map((option) => (
              <a
                key={option}
                href='#'
                onClick={(e) => {
                  e.preventDefault()
                  handleOptionClick(option)
                }}
              >
                <span>{option}</span>
                {option === selected ||
                  (option === selectCategory && (
                    <span className='check'>
                      <SvgIcon iconName='check' />
                    </span>
                  ))}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SortByDropdown
