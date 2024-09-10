import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { HistoryType } from '@typings/types/history'

import { useStyles } from './parsing-view.style'

interface ParsingViewProps {
  history: HistoryType
}

const paths = {
  profiles: '/admin/parsing/profiles',
  requests: '/admin/parsing/requests',
}

export const ParsingView: FC<ParsingViewProps> = memo(({ history }) => {
  const { classes: styles } = useStyles()

  const handleClickProfiles = () => history?.push({ pathname: paths.profiles })
  const handleClickRequests = () => history?.push({ pathname: paths.requests })

  return (
    <>
      <p className={styles.title}>{t(TranslationKey['Choose a section in Parsing'])}</p>
      <div className={styles.buttons}>
        <CustomButton block type="primary" onClick={handleClickProfiles}>
          {t(TranslationKey.Parsing)}
        </CustomButton>

        <CustomButton block type="primary" onClick={handleClickRequests}>
          {t(TranslationKey.Requests)}
        </CustomButton>
      </div>
    </>
  )
})
