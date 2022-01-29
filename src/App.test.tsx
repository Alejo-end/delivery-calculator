import React from 'react'
import { screen } from '@testing-library/react'
import { render } from './test-utils'
import { App } from './App'

test('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/Alejandro De León/i)
  expect(linkElement).toBeInTheDocument()
  const inputCartValue = screen.getAllByPlaceholderText(/Enter the food price.../i)
  const inputDistance = screen.getAllByPlaceholderText(/How far?/i)
  const inputItems = screen.getAllByPlaceholderText(/Up to 4 items for free!/i)
})
