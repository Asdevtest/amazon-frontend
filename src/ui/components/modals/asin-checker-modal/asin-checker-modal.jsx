import SearchIcon from '@mui/icons-material/Search'
import VisibilityIcon from '@mui/icons-material/Visibility'

import React, {useEffect, useState} from 'react'

import {InputAdornment, Typography} from '@material-ui/core'

import {humanFriendlyStategyStatus, mapProductStrategyStatusEnumToKey} from '@constants/product-strategy-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'

import {t} from '@utils/translations'

import {useClassNames} from './asin-checker-modal.style'
import {TableAsinAndReason} from './table-asin-and-reason/table-asin-and-reason'

export const AsinCheckerModal = ({strategy, onSubmit, onClose}) => {
  const classNames = useClassNames()

  const [asins, setAsins] = useState('')
  const [reasons, setReasons] = useState('')
  const [asinsAndReasonsData, setAsinsAndReasonsData] = useState([])
  const [updatedAsinsAndReasonsData, setUpdatedAsinsAndReasonsData] = useState([])
  const [nameSearchValue, setNameSearchValue] = useState('')

  const onClickPreviewButton = () => {
    const asinsData = asins ? asins.split('\n') : []
    const reasonsData = reasons ? reasons.split('\n') : []
    const data = []
    asinsData.length &&
      reasonsData.length &&
      asinsData.forEach((item, index) => {
        data.push({
          asin: item.trim(),
          reason: reasonsData[index],
          strategy: mapProductStrategyStatusEnumToKey[strategy],
        })
      })
    if (data.length) {
      setAsinsAndReasonsData(data)
      setUpdatedAsinsAndReasonsData(data)
      setAsins('')
      setReasons('')
    }
  }

  useEffect(() => {
    const filteredData = asinsAndReasonsData.filter(
      item =>
        item.asin.toString().toLowerCase().includes(nameSearchValue.toLowerCase()) ||
        item.reason.toString().toLowerCase().includes(nameSearchValue.toLowerCase()),
    )
    setUpdatedAsinsAndReasonsData(filteredData)
  }, [nameSearchValue])

  const onClickRemoveCell = asin => {
    const filteredData = updatedAsinsAndReasonsData.filter(item => item.asin !== asin)
    setUpdatedAsinsAndReasonsData(filteredData)
  }

  return (
    <div className={classNames.modalMessageWrapper}>
      <div className={classNames.modalTitle}>
        <Typography variant="h5" className={classNames.modalMessageTitle}>
          {t(TranslationKey['ASIN list'])}
        </Typography>
        <Typography>{humanFriendlyStategyStatus(strategy).toUpperCase()}</Typography>
      </div>
      <div className={classNames.modalFieldsWrapper}>
        <Field
          multiline
          className={classNames.heightFieldAuto}
          rows={7}
          rowsMax={7}
          inputProps={{maxLength: 35000}}
          labelClasses={classNames.commentLabelText}
          containerClasses={classNames.commentContainer}
          label={t(TranslationKey['Add a list of ASIN'])}
          value={asins}
          onChange={e => setAsins(e.target.value)}
        />
        <Field
          multiline
          className={classNames.heightFieldAuto}
          rows={7}
          rowsMax={7}
          inputProps={{maxLength: 95000}}
          containerClasses={classNames.commentContainer}
          labelClasses={classNames.commentLabelText}
          label={t(TranslationKey['Add a list of reasons'])}
          value={reasons}
          onChange={e => setReasons(e.target.value)}
        />
      </div>
      {updatedAsinsAndReasonsData.length ? (
        <div className={classNames.tableWrapper}>
          <div className={classNames.tableSearchWrapper}>
            <Typography className={classNames.tableSearchTitle}>
              {t(TranslationKey['To be added to the list'])}
            </Typography>
            <Field
              containerClasses={classNames.searchContainer}
              inputClasses={classNames.searchInput}
              value={nameSearchValue}
              placeholder={t(TranslationKey['Search by ASIN, Reason'])}
              endAdornment={
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              }
              onChange={e => setNameSearchValue(e.target.value)}
            />
          </div>
          <TableAsinAndReason data={updatedAsinsAndReasonsData} onClickRemoveCell={onClickRemoveCell} />
        </div>
      ) : null}
      <div className={classNames.buttonsWrapper}>
        <div>
          <Button variant="contained" className={classNames.buttonPreview} onClick={() => onClickPreviewButton()}>
            <VisibilityIcon className={classNames.icon} />
          </Button>
        </div>
        <div>
          <Button
            success
            disabled={!updatedAsinsAndReasonsData.length}
            variant="contained"
            className={classNames.buttonOk}
            onClick={() => onSubmit(asinsAndReasonsData, strategy)}
          >
            {t(TranslationKey.Save)}
          </Button>

          <Button
            // disabled={submitIsClicked}
            color="primary"
            variant="contained"
            className={classNames.buttonCancel}
            onClick={onClose}
          >
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>
    </div>
  )
}
