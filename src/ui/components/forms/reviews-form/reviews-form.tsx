import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { UserLink } from '@components/user/user-link'

import { t } from '@utils/translations'

import { ICreatedBy } from '@typings/shared/created-by'

import { useStyles } from './reviews-form.style'

import { Reviews } from './reviews'
import { ReviewsFormModel } from './reviews-form.model'

interface ReviewsFormProps {
  onClose: () => void
  user?: ICreatedBy
  isSupplier?: boolean
}

export const ReviewsForm: FC<ReviewsFormProps> = observer(props => {
  const { onClose, user, isSupplier } = props

  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new ReviewsFormModel(user?._id, isSupplier), [])

  return (
    <div className={styles.root}>
      <div className={styles.flexRow}>
        <p className={styles.title}>{`${t(TranslationKey[isSupplier ? 'Supplier reviews' : 'User reviews'])}:`}</p>
        {isSupplier ? (
          <p className={styles.title}>{user?.name}</p>
        ) : (
          <UserLink customClassNames={styles.title} name={user?.name} userId={user?._id} />
        )}
      </div>

      <Reviews reviews={viewModel.reviews} />

      <div className={styles.footer}>
        <CustomButton size="large" onClick={onClose}>
          {t(TranslationKey.Close)}
        </CustomButton>
      </div>
    </div>
  )
})
