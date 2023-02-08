import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'

import {LinkSubUserForm} from './link-sub-user-form'

const closeModal = () => null
const onSubmit = () => null

describe('LinkSubUserForm({closeModal, onSubmit})', () => {
  test('Renders LinkSubUserForm', () => {
    render(<LinkSubUserForm closeModal={closeModal} onSubmit={onSubmit} />)

    expect(screen.getByText('String')).toBeInTheDocument()
  })
})
