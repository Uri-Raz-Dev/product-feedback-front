import AddFeedback from './AddFeedback'
import NavBack from './NavBack'

function RoadmapHeader() {
  return (
    <section className='roadmap-header'>
      <div>
        <NavBack />
        <h1>Roadmap</h1>
      </div>
      <AddFeedback />
    </section>
  )
}

export default RoadmapHeader
