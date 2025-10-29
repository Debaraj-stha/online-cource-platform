interface Props{
    onClick?:()=>void
    disabled?:boolean
}
const LoadMoreButton = ({onClick,disabled}:Props) => {
  return (
  <button className="primary-button" onClick={onClick} disabled={disabled}
  title='Load More'
  aria-disabled={disabled}
  >Load More</button>
  )
}

export default LoadMoreButton
