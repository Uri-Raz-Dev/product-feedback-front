import { Suggestions } from '../services/feedback.service.local'

interface SuggestionsListProps {
  suggestions: Suggestions[] // suggestions is an array of Suggestions
}

function SuggestionsList({ suggestions }: SuggestionsListProps): JSX.Element {
  return (
    <section className='suggestions-list-layout'>
      <ul className='suggestions-list'>
        {suggestions.map((suggestion) =>
          suggestion.productRequests.map((s) => {
            return (
              <li key={s._id}>
                <p>{s.title}</p>
                <p>{s.category}</p>
                <p>{s.upvotes}</p>
                <p>{s.description}</p>
                <div>{s.comments?.length ?? 0}</div>
              </li>
            )
          })
        )}
      </ul>
    </section>
  )
}

export default SuggestionsList
