import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import AutorenewIcon from '@mui/icons-material/Autorenew'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value'
import { Field } from '@components/shared/field/field'
import { UploadIcon } from '@components/shared/svg-icons'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { useStyles } from './tab-red-flags.style'

import { AdminSettingsRedFlagsModel } from './tab-red-flags.model'

export const TabRedFlags = observer(() => {
  const { classes: styles, cx } = useStyles()

  const [viewModel] = useState(() => new AdminSettingsRedFlagsModel())

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const [isDisableButton, setIsDisableButton] = useState(true)

  useEffect(() => {
    setIsDisableButton(viewModel.isValidUrl && !!viewModel.flag.title)
  }, [viewModel.isValidUrl, viewModel.flag.title])

  return (
    <>
      {SettingsModel.languageTag && (
        <div className={styles.wrapper}>
          <p className={styles.title}>{t(TranslationKey['Adding a red flag'])}</p>

          <div className={styles.container}>
            <Field
              label={t(TranslationKey['Add a red flag icon']) + '*'}
              labelClasses={styles.label}
              classes={{ root: styles.textField }}
              value={viewModel.flag.iconImage?.data_url ?? viewModel.flag.iconImage}
              placeholder={t(TranslationKey.Link)}
              onChange={viewModel.onChangeIconImage}
            />

            <label htmlFor="image-upload" className={styles.inputContainer}>
              <input type="file" accept="image/*" className={styles.input} onChange={viewModel.onImageUpload} />
              <span className={styles.text}>{t(TranslationKey['Add photo'])}</span>
              <UploadIcon className={styles.icon} />
            </label>
          </div>

          {viewModel.flag.iconImage && (
            <div className={styles.container}>
              <div className={cx(styles.containerImage, { [styles.error]: !viewModel.isValidUrl })}>
                <img src={viewModel.flag.iconImage?.data_url ?? viewModel.flag.iconImage} alt="red flag" />
                <span className={styles.redFlagLabel}>{viewModel.currentImageName}</span>
                <div className={styles.actionIconWrapper}>
                  <div className={styles.actionIcon}>
                    <input type="file" accept="image/*" className={styles.input} onChange={viewModel.onImageUpload} />
                    <AutorenewIcon fontSize="small" />
                  </div>

                  <HighlightOffIcon fontSize="small" onClick={viewModel.onRemoveImg} />
                </div>
              </div>
            </div>
          )}

          <div className={styles.container}>
            <Field
              label={t(TranslationKey['Red flag name']) + '*'}
              labelClasses={styles.label}
              classes={{ root: styles.textField }}
              value={viewModel.flag.title}
              placeholder={t(TranslationKey.Add)}
              onChange={viewModel.onChangeTitle}
            />
          </div>

          <div className={styles.redFlags}>
            {viewModel.redFlags.length !== 0 &&
              viewModel.redFlags.map(flag => (
                <div key={flag._id} className={styles.redFlagWrapper}>
                  <div className={styles.iconContainer}>
                    <img src={getAmazonImageUrl(flag.iconImage)} alt={flag.title} className={styles.iconImage} />
                    <Typography className={styles.redFlag}>{flag.title}</Typography>
                  </div>

                  <div className={styles.iconsWrapper}>
                    <CopyValue text={flag.title} />

                    <EditOutlinedIcon
                      className={styles.iconAction}
                      onClick={() => viewModel.onClickEditRedFlag(flag._id)}
                    />

                    <DeleteOutlineOutlinedIcon
                      className={styles.iconAction}
                      onClick={() => viewModel.onClickRemoveRedFlag(flag._id)}
                    />
                  </div>
                </div>
              ))}
          </div>

          <Button disabled={!isDisableButton} onClick={viewModel.onSubmitRedFlag}>
            {t(TranslationKey.Save)}
          </Button>
        </div>
      )}

      <WarningInfoModal
        openModal={viewModel.showInfoModal}
        setOpenModal={viewModel.onClickToggleInfoModal}
        title={viewModel.infoModalText}
        btnText={t(TranslationKey.Close)}
        onClickBtn={viewModel.onClickToggleInfoModal}
      />

      <ConfirmationModal
        isWarning={viewModel.confirmModalSettings?.isWarning}
        openModal={viewModel.showConfirmModal}
        setOpenModal={viewModel.onClickToggleConfirmModal}
        title={t(TranslationKey.Attention)}
        message={viewModel.confirmModalSettings.message}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={viewModel.confirmModalSettings.onClickSuccess}
        onClickCancelBtn={viewModel.onClickToggleConfirmModal}
      />
    </>
  )
})
