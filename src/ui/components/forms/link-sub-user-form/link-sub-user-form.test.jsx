/* eslint-disable no-unused-vars */
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { LinkSubUserForm } from './link-sub-user-form'

const user = userEvent.setup()

const closeModal = () => jest.fn()
const onSubmit = () => jest.fn()

const myFn = {
  sum: jest.fn(),
}

describe('LinkSubUserForm({closeModal, onSubmit})', () => {
  test('Renders LinkSubUserForm', () => {
    render(<LinkSubUserForm />)

    expect(screen.getByTestId('mainWrapper')).toBeInTheDocument()
    expect(screen.getByTestId('input')).toBeInTheDocument()
    expect(screen.getByTestId('add')).toBeInTheDocument()
    expect(screen.getByTestId('cancel')).toBeInTheDocument()
  })

  test('Field onChange works', async () => {
    render(<LinkSubUserForm />)
    const input = screen.getByTestId('input')
    const inputValue = 'String'

    await user.type(input, inputValue)
    expect(input).toHaveValue(inputValue)
    await user.clear(input)
    expect(input).toHaveValue('')
  })

  test('onSubmit works', async () => {
    render(<LinkSubUserForm closeModal={closeModal} onSubmit={myFn.sum} />)
    const input = screen.getByTestId('input')
    const submitButton = screen.getByTestId('add')
    const inputValue = '123'

    expect(submitButton).toBeDisabled()
    await user.type(input, inputValue)
    expect(submitButton).not.toBeDisabled()
    await user.click(submitButton)
    expect(submitButton).not.toBeDisabled()
    expect(myFn.sum).toHaveBeenCalled()
  })
})
