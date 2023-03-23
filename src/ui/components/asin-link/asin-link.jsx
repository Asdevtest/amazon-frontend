/* eslint-disable no-unused-vars */
import {Typography} from '@mui/material'

import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {CopyValue} from '@components/copy-value'

import {shortAsin} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './asin-link.style'

export const AsinLink = observer(({asin, withCopyValue}) => {
  const {classes: classNames} = useClassNames()

  return (
    <div className={classNames.copyAsin}>
      {asin ? (
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://www.amazon.com/dp/${asin}`}
          className={classNames.normalizeLink}
        >
          <Typography className={classNames.linkSpan}>{shortAsin(asin)}</Typography>
        </a>
      ) : (
        <Typography className={classNames.missingSpan}>{t(TranslationKey.Missing)}</Typography>
      )}
      {asin && withCopyValue && <CopyValue text={asin} />}
    </div>
  )
})
