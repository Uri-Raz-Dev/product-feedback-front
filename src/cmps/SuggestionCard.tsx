import { utilService } from '../services/util.service'
import { SvgIcon } from './Svgicon'

export type suggestion = {
  suggestion: {
    title: string
    description: string
    category: string
    upvotes: number
    comments: any[]
  }
}

function SuggestionCard({ suggestion }: suggestion): JSX.Element {
  return (
    <div className='suggestion-card'>
      <div>{suggestion.title}</div>
      <p>{suggestion.description}</p>
      <div>{utilService.toUpperCase(suggestion.category)}</div>
      <section className='upvote-and-comment'>
        <div>
          <SvgIcon iconName='arrowUp' />
          <span> {suggestion.upvotes}</span>
        </div>
        <div>
          <SvgIcon iconName='comments' />
          <span> {suggestion.comments?.length ?? 0}</span>
        </div>
      </section>
    </div>
  )
}

export default SuggestionCard
