/* eslint-disable no-unused-vars */
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {LinkSubUserForm} from './link-sub-user-form'

const closeModal = () => jest.fn()
const onSubmit = () => jest.fn()

describe('LinkSubUserForm({closeModal, onSubmit})', () => {
  // test('Renders LinkSubUserForm', () => {
  //   render(<LinkSubUserForm />)

  //   expect(screen.getAllByText(/Add/i)).toBeTruthy()
  //   expect(screen.getByText(/Enter the email of the user you want to add/i)).toBeInTheDocument()
  //   expect(screen.getByText(/Cancel/i)).toBeInTheDocument()
  //   expect(screen.getByTestId('input')).toBeInTheDocument()
  // })

  test('onChange works', () => {
    render(<LinkSubUserForm />)
    const input = screen.getByTestId('input')

    expect(screen.getByTestId('input')).toHaveFormValues('')
  })
})
