import { Link, useLocation } from 'react-router-dom'
import { Suggestions } from '../services/feedback.service.local'
import { utilService } from '../services/util.service'
import { SvgIcon } from './Svgicon'
import { roadmapMenuProps } from '../pages/Roadmap'

export interface SuggestionsListProps {
  suggestions: Suggestions[]
}
function SuggestionsList({ suggestions }: SuggestionsListProps): JSX.Element {
  let { pathname } = useLocation()
  return (
    <section className='suggestions-list-layout full main-layout'>
      <ul className='suggestions-list '>
        {suggestions.map((suggestion) =>
          suggestion.productRequests.map((s) => {
            return (
              <li key={s._id}>
                {/* {pathname === '/roadmap' && (
                  <div>
                    <span></span>
                    <span>hi</span>
                  </div>
                )} */}
                <div className='suggestion-title'>{s.title}</div>
                <p>{s.description}</p>

                <div>{utilService.toUpperCase(s.category)}</div>
                <section className='upvote-and-comment'>
                  <div>
                    <SvgIcon iconName='arrowUp' />
                    <span> {s.upvotes}</span>
                  </div>
                  <Link to={`feedback/${s._id}`}>
                    <SvgIcon iconName='comments' />
                    <span> {s.comments?.length ?? 0}</span>
                  </Link>
                </section>
              </li>
            )
          })
        )}
      </ul>
    </section>
  )
}

export default SuggestionsList
