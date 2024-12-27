import { useSelector } from 'react-redux'
import RoadmapHeader from '../cmps/RoadmapHeader'
import RoadmapMenu from '../cmps/RoadmapMenu'
import { useEffect, useState } from 'react'
import { RootState } from '../store/store'
import { loadSuggestions } from '../store/actions/suggestions.action'
import SuggestionsList from '../cmps/SuggestionsList'

export type index = {
  activeIndex: number
  setActiveIndex: (value: number) => void
}

export interface menu {
  menuItems: { label: string; index: number }[]
}

export type roadmapMenuProps = index & menu
function Roadmap() {
  const [activeIndex, setActiveIndex] = useState(1)
  const menuItems = [
    { label: 'Planned (2)', index: 0 },
    { label: 'In-Progress (3)', index: 1 },
    { label: 'Live (1)', index: 2 },
  ]
  const suggestions = useSelector(
    (state: RootState) => state.suggestionsModule.suggestions
  )
  useEffect(() => {
    loadSuggestions()
  }, [])
  return (
    <div className='roadmap-layout full'>
      <RoadmapHeader />
      <RoadmapMenu
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        menuItems={menuItems}
      />
      <div className='roadmap-subheader'>{menuItems[activeIndex].label}</div>
      <SuggestionsList suggestions={suggestions} />
    </div>
  )
}

export default Roadmap
