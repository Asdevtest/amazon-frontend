import React, {useEffect, useRef} from 'react'

import {Typography, Link} from '@material-ui/core'
import {observer} from 'mobx-react'
import {useHistory} from 'react-router-dom'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button/success-button'
import {Field} from '@components/field/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {checkAndMakeAbsoluteUrl} from '@utils/text'

import {AppbarSettingsModel} from './appbar-settings-form.model'
import {useClassNames} from './appbar-settings-form.style'

const textConsts = getLocalizedTexts(texts, 'ru').appbarSettingsForm

export const AppbarSettingsForm = observer(({onCloseModal}) => {
  const classNames = useClassNames()
  const history = useHistory()
  const asModel = useRef(new AppbarSettingsModel({history}))

  useEffect(() => {
    asModel.current.loadData()
  }, [])

  const {userSettings, createUserSettings, onChangeField, editUserSettings} = asModel.current

  const onCreateSubmit = () => {
    createUserSettings(userSettings)
    onCloseModal()
  }

  const onEditSubmit = () => {
    editUserSettings(userSettings)
    onCloseModal()
  }

  return (
    <div className={classNames.mainWrapper}>
      <Typography variant="h5">{textConsts.mainTitle}</Typography>

      {!userSettings && (
        <Typography className={classNames.noSettingsWarning}>{textConsts.noSettingsWarning}</Typography>
      )}

      <Field
        label={textConsts.everyDayReport}
        value={userSettings?.sellerBoard_warehouseReportUrlEveryDay || ''}
        placeholder={textConsts.emptyPlaceholder}
        onChange={onChangeField('sellerBoard_warehouseReportUrlEveryDay')}
      />

      {userSettings?.sellerBoard_warehouseReportUrlEveryDay && (
        <Link
          target="_blank"
          rel="noopener"
          href={checkAndMakeAbsoluteUrl(userSettings?.sellerBoard_warehouseReportUrlEveryDay)}
        >
          <Typography className={classNames.link}>{userSettings?.sellerBoard_warehouseReportUrlEveryDay}</Typography>
        </Link>
      )}

      <Field
        label={textConsts.last30DaysReport}
        value={userSettings?.sellerBoard_dashboardUrlLast30Days || ''}
        placeholder={textConsts.emptyPlaceholder}
        onChange={onChangeField('sellerBoard_dashboardUrlLast30Days')}
      />

      {userSettings?.sellerBoard_dashboardUrlLast30Days && (
        <Link
          target="_blank"
          rel="noopener"
          href={checkAndMakeAbsoluteUrl(userSettings?.sellerBoard_dashboardUrlLast30Days)}
        >
          <Typography className={classNames.link}>{userSettings?.sellerBoard_dashboardUrlLast30Days}</Typography>
        </Link>
      )}

      <div className={classNames.placeAddBtnWrapper}>
        <SuccessButton onClick={() => (userSettings ? onEditSubmit() : onCreateSubmit())}>
          {userSettings ? textConsts.editBtn : textConsts.createBtn}
        </SuccessButton>

        <Button color="primary" className={classNames.cancelButton} variant="contained" onClick={onCloseModal}>
          {textConsts.cancelBtn}
        </Button>
      </div>
    </div>
  )
})
