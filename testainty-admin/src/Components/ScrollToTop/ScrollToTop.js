import { FaAngleUp } from 'react-icons/fa'
import '../../App.css'

const ScrollToTop = () => {
  const goToTop = () => {
    console.log('working scroll')
    window.scrollTo({
      top: 0,
      behavior:'smooth',

    })
  }
  return (
    <div className="top-to-btm">
      <FaAngleUp className="icon-position icon-style" onClick={goToTop} />
    </div>
  )
}
export default ScrollToTop
