import { TranslationKey } from '@constants/translations/translation-key'

import { UserLink } from '@components/user/user-link'

import { t } from '@utils/translations'

import { useClassNames } from './idea-request-card.styles'

export const IdeaRequestCard = () => {
  const { classes: classNames } = useClassNames()

  return (
    <div>
      <p className={classNames.categoryTitle}>
        {`${t(TranslationKey['Request type'])}:`} <span className={classNames.categoryText}>{12122}</span>
      </p>

      <p className={classNames.categoryTitle}>
        {`${t(TranslationKey.ID)}:`} <span className={classNames.categoryText}>{12122}</span>
      </p>

      <p className={classNames.categoryTitle}>
        {`${t(TranslationKey.Status)}:`} <span className={classNames.categoryText}>{12122}</span>
      </p>

      <UserLink
        name={undefined}
        userId={undefined}
        blackText={undefined}
        withAvatar={undefined}
        maxNameWidth={undefined}
        customStyles={undefined}
        customClassNames={undefined}
      />
    </div>
  )
}
