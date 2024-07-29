import { observer } from 'mobx-react'
import { FC, useState } from 'react'

import { useStyles } from './parsing-requests-view.style'

import { ParsingRequestsViewModel } from './parsing-requests-view.model'

export const ParsingRequestsView: FC = observer(() => {
  const { classes: styles, cx } = useStyles()
  const [viewModel] = useState(() => new ParsingRequestsViewModel())

  return <>REQUESTS</>
})
