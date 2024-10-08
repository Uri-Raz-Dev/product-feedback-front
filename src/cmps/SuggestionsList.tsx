import { Suggestions } from '../services/feedback.service.local'
import { utilService } from '../services/util.service'
import { SvgIcon } from './Svgicon'

interface SuggestionsListProps {
  suggestions: Suggestions[]
}

function SuggestionsList({ suggestions }: SuggestionsListProps): JSX.Element {
  return (
    <section className='suggestions-list-layout full main-layout'>
      <ul className='suggestions-list '>
        {suggestions.map((suggestion) =>
          suggestion.productRequests.map((s) => {
            return (
              <li key={s._id}>
                <div>{s.title}</div>
                <p>{s.description}</p>

                <div>{utilService.toUpperCase(s.category)}</div>
                <section className='upvote-and-comment'>
                  <div>
                    <SvgIcon iconName='arrowUp' />
                    <span> {s.upvotes}</span>
                  </div>
                  <div>
                    <SvgIcon iconName='comments' />
                    <span> {s.comments?.length ?? 0}</span>
                  </div>
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
