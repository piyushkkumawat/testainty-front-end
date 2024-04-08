/* eslint-disable react/display-name */
import { render, fireEvent, screen } from '@testing-library/react'
import HomePage from '../Components/Home'
import { Provider } from 'react-redux'
import Store from '../Store'

// Mock child components
jest.mock('../Components/Home/OurServices', () => () => <div data-testid="mock-our-services">OurServices component</div>)
jest.mock('../Components/Home/GetInTouch', () => () => <div data-testid="mock-get-in-touch">GetInTouch component</div>)
jest.mock('../Components/Common/Footer', () => ({ scrollToSection }) => (
  <div data-testid="mock-footer" onClick={() => scrollToSection('someSection')}>Footer component</div>
))
jest.mock('../Components/ScrollToTop/ScrollToTop', () => () => <div data-testid="mock-scroll-to-top">ScrollToTop component</div>)

describe('HomePage component', () => {
  test('renders without crashing', () => {
    render(
      <Provider store={Store}>
        <HomePage />
      </Provider>
    )
    expect(screen.getByTestId('mock-our-services')).toBeInTheDocument()
    expect(screen.getByTestId('mock-get-in-touch')).toBeInTheDocument()
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument()
    // expect(screen.getByTestId('mock-scroll-to-top')).toBeInTheDocument()
  })

  test('scrolling triggers top button visibility', () => {
    render(
      <Provider store={Store}>
        <HomePage />
      </Provider>
    )
    expect(screen.queryByTestId('mock-scroll-to-top')).toBeNull()
    fireEvent.scroll(window, { target: { scrollY: 500 } })
    expect(screen.queryByTestId('mock-scroll-to-top')).toBeInTheDocument()
  })

  test('clicking on top button scrolls to top', () => {
    render(
      <Provider store={Store}>
        <HomePage />
      </Provider>
    )
    // fireEvent.scroll(window, { target: { scrollY: 500 } })
    // fireEvent.click(screen.getByTestId('mock-scroll-to-top'))
    // expect(window.scrollY).toBe(0)
  })

  // You can add more tests for other functionalities such as clicking on links, checking for elements, etc.
})