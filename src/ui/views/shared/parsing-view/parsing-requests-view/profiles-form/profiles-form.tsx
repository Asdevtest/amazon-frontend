import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { CustomRadio } from '@components/shared/custom-radio'

import { t } from '@utils/translations'

import { useStyles } from './profile-form.style'

import { getProfilesOptions } from './profiles-form.config'
import { ProfilesFormModel } from './profiles-form.model'

interface ProfilesFormProps {
  onClose: () => void
  onSubmit: (requestId: string, profileId: string) => void
  requestId?: string
  profileId?: string
  shopId?: string
}

export const ProfilesForm: FC<ProfilesFormProps> = observer(props => {
  const { onClose, onSubmit, requestId, profileId, shopId } = props

  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new ProfilesFormModel(profileId, requestId, shopId), [])

  const handleSubmit = () => {
    if (requestId) {
      onSubmit(requestId, viewModel.value)
      onClose()
    }
  }

  return (
    <div className={styles.root}>
      <CustomInputSearch
        enterButton
        allowClear
        wrapperClassName={styles.searchInput}
        placeholder="Search by name, email"
        onSearch={viewModel.onClickSubmitSearch}
      />
      <CustomRadio
        options={getProfilesOptions(viewModel.profiles)}
        value={viewModel.value}
        wrapperClassName={styles.optionsWrapper}
        onChange={viewModel.onChange}
        onScroll={viewModel.onScroll}
      />
      <div className={styles.buttons}>
        <CustomButton onClick={onClose}>{t(TranslationKey.Close)}</CustomButton>

        <CustomButton
          disabled={!requestId && !viewModel.value}
          type="primary"
          confirmText={viewModel.isAlreadyProfile ? 'This profile has already been used! Do you want to continue?' : ''}
          onClick={handleSubmit}
        >
          {t(TranslationKey.Approve)}
        </CustomButton>
      </div>
    </div>
  )
})
