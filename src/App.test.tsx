import { fireEvent, screen } from '@testing-library/react'
import { render } from './test-utils'
import { App } from './App'

const setup = () => {
  const utils = render(<App />)
  
  const inputCartValue = screen.getAllByPlaceholderText(/Enter the food price.../i)
  const inputDistance = screen.getAllByPlaceholderText(/Distance in meters.../i)
  const inputItems = screen.getAllByPlaceholderText(/Up to 4 items for free!/i)
  return {
    inputCartValue,
    inputDistance,
    inputItems,
    ...utils,
  }
}

test('Cart Value input test', () => {
  render(<App />)
  const { inputCartValue } = setup()
  expect(inputCartValue).toBe(0)
  fireEvent.change(inputCartValue[0], { target: { value: 10 } })
  expect(inputCartValue.values).toBe(1000)
})

test('Distance input test', () => {
  render(<App />)
  const { inputDistance } = setup()
  expect(inputDistance).toBe(0)
  fireEvent.change(inputDistance[0], { target: { value: 1000 } })
  expect(inputDistance.values).toBe(1000)
})

test('Items input test', () => {
  render(<App />)
  const { inputItems } = setup()
  expect(inputItems).toBe(0)
  fireEvent.change(inputItems[0], { target: { value: 4 } })
  expect(inputItems.values).toBe(1000)
})

test('renders portfolio link', () => {
  render(<App />)
  const linkElement = screen.getByText(/Alejandro De León/i)
  expect(linkElement).toBeInTheDocument()
})

