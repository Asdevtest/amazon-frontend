import { cx } from '@emotion/css'
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

import { t } from '@utils/translations'

import { useClassNames } from './tab-red-flags.style'

import { AdminSettingsRedFlagsModel } from './tab-red-flags.model'

export const TabRedFlags = observer(() => {
  const { classes: classNames } = useClassNames()

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
        <div className={classNames.wrapper}>
          <p className={classNames.title}>{t(TranslationKey['Adding a red flag'])}</p>

          <div className={classNames.container}>
            <Field
              label={t(TranslationKey['Add a red flag icon']) + '*'}
              labelClasses={classNames.label}
              classes={{ root: classNames.textField }}
              value={viewModel.flag.iconImage?.data_url ?? viewModel.flag.iconImage}
              placeholder={t(TranslationKey.Link)}
              onChange={viewModel.onChangeIconImage}
            />

            <label htmlFor="image-upload" className={classNames.inputContainer}>
              <input type="file" accept="image/*" className={classNames.input} onChange={viewModel.onImageUpload} />
              <span className={classNames.text}>{t(TranslationKey['Add photo'])}</span>
              <UploadIcon className={classNames.icon} />
            </label>
          </div>

          {viewModel.flag.iconImage && (
            <div className={classNames.container}>
              <div className={cx(classNames.containerImage, { [classNames.error]: !viewModel.isValidUrl })}>
                <img src={viewModel.flag.iconImage?.data_url ?? viewModel.flag.iconImage} alt="red flag" />
                <span className={classNames.redFlagLabel}>{viewModel.currentImageName}</span>
                <div className={classNames.actionIconWrapper}>
                  <div className={classNames.actionIcon}>
                    <input
                      type="file"
                      accept="image/*"
                      className={classNames.input}
                      onChange={viewModel.onImageUpload}
                    />
                    <AutorenewIcon fontSize="small" />
                  </div>

                  <HighlightOffIcon fontSize="small" onClick={viewModel.onRemoveImg} />
                </div>
              </div>
            </div>
          )}

          <div className={classNames.container}>
            <Field
              label={t(TranslationKey['Red flag name']) + '*'}
              labelClasses={classNames.label}
              classes={{ root: classNames.textField }}
              value={viewModel.flag.title}
              placeholder={t(TranslationKey.Add)}
              onChange={viewModel.onChangeTitle}
            />
          </div>

          <div className={classNames.redFlags}>
            {viewModel.redFlags.length !== 0 &&
              viewModel.redFlags.map(flag => (
                <div key={flag._id} className={classNames.redFlagWrapper}>
                  <div className={classNames.iconContainer}>
                    <img src={flag.iconImage} alt={flag.title} className={classNames.iconImage} />
                    <Typography className={classNames.redFlag}>{flag.title}</Typography>
                  </div>

                  <div className={classNames.iconsWrapper}>
                    <CopyValue text={flag.title} />

                    <EditOutlinedIcon
                      className={classNames.iconAction}
                      onClick={() => viewModel.onClickEditRedFlag(flag._id)}
                    />

                    <DeleteOutlineOutlinedIcon
                      className={classNames.iconAction}
                      onClick={() => viewModel.onClickRemoveRedFlag(flag._id)}
                    />
                  </div>
                </div>
              ))}
          </div>

          <Button disabled={!isDisableButton} className={classNames.button} onClick={viewModel.onSubmitRedFlag}>
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
        isWarning={viewModel.confirmModalSettings.isWarning}
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
