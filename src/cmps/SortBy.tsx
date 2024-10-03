import { SvgIcon } from './Svgicon'

function SortBy(): JSX.Element {
  return (
    <span className='sort-dropdown'>
      <span className='sort-menu'>
        <span>
          Sort by :<span> Most Upvotes</span>
        </span>
      </span>
      <span>
        <SvgIcon iconName='arrowDown' />
      </span>
    </span>
  )
}

export default SortBy
