import AddFeedback from '../cmps/AddFeedback'
import SortBy from '../cmps/SortBy'

function Suggestions(): JSX.Element {
  return (
    <div className='suggestions-layout full main-layout   '>
      <section className='feedback-menu-layout full main-layout '>
        <div className='feedback-menu'>
          <SortBy />
          <AddFeedback />
        </div>
      </section>
    </div>
  )
}

export default Suggestions
