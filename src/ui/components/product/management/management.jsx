// import { useEffect } from 'react'

import { observer } from 'mobx-react'

// import { TranslationKey } from '@constants/translations/translation-key'

// import { t } from '@utils/translations'

// import { ManagementModel } from './management.model'

import { useClassNames } from './management.style'

export const Management = observer(() => {
  const { classes: classNames } = useClassNames()

  return <div className={classNames.wrapper}></div>
})
