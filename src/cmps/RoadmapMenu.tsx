import { roadmapMenuProps } from '../pages/Roadmap'

function RoadmapMenu({
  activeIndex,
  setActiveIndex,
  menuItems,
}: roadmapMenuProps) {
  return (
    <section className='roadmap-menu'>
      {menuItems.map((item) => (
        <span
          key={item.index}
          onClick={() => setActiveIndex(item.index)}
          className={activeIndex === item.index ? 'menu-active' : ''}
        >
          {item.label}
        </span>
      ))}
    </section>
  )
}

export default RoadmapMenu
