type Categories = {
  categories: string[]
  sidebar: boolean
}
function Sidebar({ categories, sidebar }: Categories): JSX.Element {
  return (
    <>
      <div className='layout'></div>
      <aside className={sidebar ? 'sidebar open' : 'sidebar'}>
        <section className='categories'>
          <ul className='category-list'>
            {categories.map((category, idx) => {
              return <li key={idx}>{category}</li>
            })}
          </ul>
        </section>
      </aside>
    </>
  )
}

export default Sidebar
