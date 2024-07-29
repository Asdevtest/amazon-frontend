import { observer } from 'mobx-react'
import { FC, useState } from 'react'

import { useStyles } from './parsing-profile-view.style'

import { ParsingProdileViewModel } from './parsing-profile-view.model'

export const ParsingProdileView: FC = observer(() => {
  const { classes: styles, cx } = useStyles()
  const [viewModel] = useState(() => new ParsingProdileViewModel())

  return <>PROFILES</>
})
