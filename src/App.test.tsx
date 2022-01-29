import { cleanup, fireEvent, prettyDOM, screen } from '@testing-library/react'
import { render } from './test-utils'
import { App } from './App'
import { useTabList } from '@chakra-ui/react'

afterEach(cleanup)


const setup = () => {
  const utils = render(<App />)
  const inputCartValue = screen.getByLabelText(/Cart Value/i)
  const inputDistance = screen.getByLabelText(/Delivery Distance/i)
  const inputItems = screen.getByLabelText(/Amount of Items/i)
  const finalPrice = screen.findByText(/12.00/i)
  
  return {
    inputCartValue,
    inputDistance,
    inputItems,
    finalPrice,
    utils,
  }
}

beforeEach(() => {
  render(<App />)
})


test('should add cart value', () => {
  const { inputCartValue, utils } = setup()
  console.log(prettyDOM(inputCartValue))
  expect(inputCartValue).toBe(0)
  fireEvent.change(inputCartValue, { target: { value: 10 } })
  expect(inputCartValue.innerText).toBe(10)

})

test('should add distance in meters', () => {
  const { inputDistance } = setup()
  expect(inputDistance).toBe(0)
  fireEvent.change(inputDistance, { target: { value: 1000 } })
  expect(inputDistance.innerText).toBe(1000)
})

test('should add amount of items', () => {
  const { inputItems } = setup()
  expect(inputItems).toBe(0)
  fireEvent.change(inputItems, { target: { value: 4 } })
  expect(inputItems.innerText).toBe(4)
})

test('renders final price of calculation', () => {
  const { finalPrice, inputCartValue, inputDistance, inputItems } = setup()
  expect(finalPrice).toBe(0)
  fireEvent.change(inputCartValue, { target: { value: 10 } })
  fireEvent.change(inputDistance, { target: { value: 1000 } })
  fireEvent.change(inputItems, { target: { value: 4 } })
  expect(finalPrice).toBe(12)
})

test('renders portfolio link', () => {
  const linkElement = screen.getByText(/Alejandro De León/i)
  expect(linkElement).toBeInTheDocument()
})

