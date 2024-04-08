import Header from '../Common/Header.js';
import { scroller } from 'react-scroll';

const MainLayout = ({ children }) => {

  const scrollToSection = (sectionId) => {
    scroller.scrollTo(sectionId, {
      duration: 100,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <>
    <Header scrollToSection={scrollToSection}/>
      <div className="lg:w-12/12 w-full h-screen">
        {children}
      </div>
      {/* <Footer /> */}
    </>

  );
};

export default MainLayout;
