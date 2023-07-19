import { cx } from '@emotion/css'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { IconButton, Typography } from '@mui/material'

import { useState, useEffect } from 'react'

import { observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'
import { UploadIcon } from '@components/shared/svg-icons'

import { checkValidImageUrl } from '@utils/checks'
import { t } from '@utils/translations'
import { onPostImage, uploadFileByUrl } from '@utils/upload-files'

import { AdminSettingsRedFlagsModel } from './tab-red-flags.model'
import { useClassNames } from './tab-red-flags.style'

export const TabRedFlags = observer(() => {
  const { classes: classNames } = useClassNames()
  const history = useHistory()
  const [viewModel] = useState(() => new AdminSettingsRedFlagsModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const [flag, setFlag] = useState({ title: '', iconImage: '' })
  const [redFlags, setRedFlags] = useState([])
  const [isValidUrl, setIsValidUrl] = useState(false)
  const [currentImageName, setCurrentImageName] = useState('true')

  useEffect(() => {
    if (viewModel.redFlags.length > 0) {
      setRedFlags(viewModel.redFlags)
    }
  }, [viewModel.redFlags])

  const handleSubmitRedFlag = async () => {
    const result =
      typeof flag.iconImage === 'string' ? await uploadFileByUrl(flag.iconImage) : await onPostImage(flag.iconImage)

    const updatedFlag = { ...flag, iconImage: result }

    await viewModel.createRedFlag(updatedFlag)

    setFlag({ title: '', iconImage: '' })
  }

  const handleChangeTitle = event => {
    setFlag(state => ({
      ...state,
      title: event.target.value,
    }))
  }

  const handleChangeIconImage = event => {
    checkValidImageUrl(event.target.value, setIsValidUrl)
    setCurrentImageName(flag.title)
    setFlag(state => ({
      ...state,
      iconImage: event.target.value,
    }))
  }

  const handleRemoveImg = () => {
    setFlag(state => ({
      ...state,
      iconImage: '',
    }))
  }

  const handleImageUpload = event => {
    const file = event.target.files?.[0]
    const reader = new FileReader()
    if (file) {
      reader.onload = e => {
        setCurrentImageName(file.name)
        checkValidImageUrl(e.target.result, setIsValidUrl)
        setFlag(state => ({
          ...state,
          iconImage: {
            data_url: e.target.result,
            file,
          },
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const isDisableButton = isValidUrl && !!flag.title

  return (
    <>
      {SettingsModel.languageTag && (
        <div className={classNames.wrapper}>
          <p className={classNames.title}>{t(TranslationKey['Adding red flags'])}</p>

          <div className={classNames.container}>
            <Field
              label={t(TranslationKey['Add red flag icon']) + '*'}
              labelClasses={classNames.label}
              classes={{ root: classNames.textField }}
              value={flag.iconImage?.data_url ?? flag.iconImage}
              placeholder={t(TranslationKey.Link)}
              onChange={handleChangeIconImage}
            />

            <label htmlFor="image-upload" className={classNames.inputContainer}>
              <input type="file" accept="image/*" className={classNames.input} onChange={handleImageUpload} />
              <span className={classNames.text}>{t(TranslationKey['Add photo'])}</span>
              <UploadIcon className={classNames.icon} />
            </label>
          </div>

          {flag.iconImage && (
            <div className={classNames.container}>
              <div className={cx(classNames.containerImage, { [classNames.error]: !isValidUrl })}>
                <img src={flag.iconImage?.data_url ?? flag.iconImage} alt="red flag" />
                <span className={classNames.redFlagLabel}>{currentImageName}</span>
                <div className={classNames.actionIconWrapper}>
                  <div className={classNames.actionIcon}>
                    <input type="file" accept="image/*" className={classNames.input} onChange={handleImageUpload} />
                    <AutorenewIcon fontSize="small" />
                  </div>

                  <HighlightOffIcon fontSize="small" onClick={handleRemoveImg} />
                </div>
              </div>
            </div>
          )}

          <div className={classNames.container}>
            <Field
              label={t(TranslationKey['Name of the red flag']) + '*'}
              labelClasses={classNames.label}
              classes={{ root: classNames.textField }}
              value={flag.title}
              placeholder={t(TranslationKey.Add)}
              onChange={handleChangeTitle}
            />
          </div>

          <div className={classNames.redFlags}>
            {redFlags.length !== 0 &&
              redFlags.map(flag => (
                <div key={flag._id} className={classNames.redFlagWrapper}>
                  <div className={classNames.iconContainer}>
                    <img src={flag.iconImage} alt={flag.title} className={classNames.iconImage} />
                    <Typography className={classNames.redFlag}>{flag.title}</Typography>
                  </div>

                  <IconButton
                    size="small"
                    classes={{ root: classNames.iconDelete }}
                    onClick={() => viewModel.onClickRemoveRedFlag(flag._id)}
                  >
                    <DeleteOutlineOutlinedIcon className={classNames.deleteIcon} />
                  </IconButton>
                </div>
              ))}
          </div>

          <Button disabled={!isDisableButton} className={classNames.button} onClick={handleSubmitRedFlag}>
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
