import { ChangeEvent } from 'react'

import { SelectChangeEvent } from '@mui/material'

export type EventType = ChangeEvent<HTMLInputElement> | SelectChangeEvent<HTMLInputElement>
