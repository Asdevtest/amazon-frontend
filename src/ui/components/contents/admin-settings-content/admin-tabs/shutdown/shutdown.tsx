import { observer } from 'mobx-react'
import { FC, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useStyles } from './shutdown.style'

import { ShutdownModel } from './shutdown.model'

interface ShutdownProps {}

export const Shutdown: FC<ShutdownProps> = observer(() => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new ShutdownModel())

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.flexRowContainer}>
          <p>{t(TranslationKey['Access for users'])}</p>
          <p>{t(TranslationKey['Notify users before disconnecting']) + '!'}</p>
        </div>

        <div></div>
      </div>

      <div>
        <div>
          <div></div>

          <div></div>
        </div>
        <div>
          <p></p>

          <div>
            <p></p>
            <p></p>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  )
})
