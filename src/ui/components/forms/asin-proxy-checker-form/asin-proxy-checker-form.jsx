import { useEffect, useState } from 'react'

import VisibilityIcon from '@mui/icons-material/Visibility'
import { Typography } from '@mui/material'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import {
  humanFriendlyStategyStatus,
  mapProductStrategyStatusEnumToKey,
} from '@constants/product/product-strategy-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'
import { SearchInput } from '@components/shared/search-input'

import { checkIsAdmin } from '@utils/checks'
import { t } from '@utils/translations'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'

import { useStyles } from './asin-proxy-checker-form.style'

import { TableAsinAndReason } from './table-asin-and-reason/table-asin-and-reason'

export const AsinProxyCheckerForm = ({ user, strategy, onSubmit, onClose }) => {
  const { classes: styles } = useStyles()

  const userRole = UserRoleCodeMap[user.role]

  const [submitIsClicked, setSubmitIsClicked] = useState(false)
  const [error, setError] = useState(false)

  const [asins, setAsins] = useState('')
  const [reasons, setReasons] = useState('')
  const [asinsAndReasonsData, setAsinsAndReasonsData] = useState([])
  const [updatedAsinsAndReasonsData, setUpdatedAsinsAndReasonsData] = useState([])
  const [nameSearchValue, setNameSearchValue] = useState('')

  const regExp =
    /\b[a-zA-Z0-9]+:[a-zA-Z0-9]+@(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?):\d{1,5}\b/

  const onClickPreviewButton = () => {
    const asinsData = asins ? asins.split('\n') : []
    const reasonsData = reasons ? reasons.split('\n') : []

    const data = []

    if (checkIsAdmin(userRole)) {
      asinsData.length &&
        asinsData.forEach(item => {
          data.push(item.trim())
        })
    } else {
      asinsData.length &&
        asinsData.forEach((item, index) => {
          data.push({
            asin: item.trim(),
            reason: reasonsData[index] || '',
            strategy: mapProductStrategyStatusEnumToKey[strategy],
          })
        })
    }

    if (data.length) {
      setAsinsAndReasonsData(data)
      setUpdatedAsinsAndReasonsData(data)
      setAsins('')
      setReasons('')
    }
  }

  useEffect(() => {
    if (checkIsAdmin(userRole)) {
      if (asins?.length && !asins.match(regExp)) {
        setError(true)
      } else {
        setError(false)
      }
    }
  }, [asins])

  useEffect(() => {
    const filteredData = asinsAndReasonsData.filter(
      item =>
        item.asin.toString().toLowerCase().includes(nameSearchValue.toLowerCase()) ||
        item.reason.toString().toLowerCase().includes(nameSearchValue.toLowerCase()),
    )
    setUpdatedAsinsAndReasonsData(filteredData)
  }, [nameSearchValue])

  const onClickRemoveCell = asin => {
    if (checkIsAdmin(userRole)) {
      const filteredData = updatedAsinsAndReasonsData.filter(item => item !== asin)
      setUpdatedAsinsAndReasonsData(filteredData)
    } else {
      const filteredData = updatedAsinsAndReasonsData.filter(item => item.asin !== asin)
      setUpdatedAsinsAndReasonsData(filteredData)
    }
  }

  return (
    <div className={styles.modalMessageWrapper}>
      <div className={styles.modalTitle}>
        {checkIsAdmin(userRole) ? (
          <Typography variant="h5" className={styles.modalMessageTitle}>
            {t(TranslationKey['Proxy servers for parsing'])}
          </Typography>
        ) : (
          <Typography variant="h5" className={styles.modalMessageTitle}>
            {t(TranslationKey['ASIN list'])}
          </Typography>
        )}

        {checkIsAdmin(userRole) ? null : (
          <Typography className={styles.standartText}>{humanFriendlyStategyStatus(strategy)?.toUpperCase()}</Typography>
        )}
      </div>
      <div className={styles.modalFieldsWrapper}>
        <Field
          multiline
          className={styles.heightFieldAuto}
          error={error && t(TranslationKey['Invalid proxy'])}
          minRows={7}
          maxRows={7}
          inputProps={{ maxLength: 35000 }}
          labelClasses={styles.commentLabelText}
          containerClasses={styles.commentContainer}
          label={
            checkIsAdmin(userRole)
              ? `${t(TranslationKey['Add a list of proxy'])}*`
              : `${t(TranslationKey['Add a list of ASIN'])}*`
          }
          value={asins}
          onChange={e => setAsins(e.target.value)}
        />

        {!checkIsAdmin(userRole) && (
          <Field
            multiline
            className={styles.heightFieldAuto}
            minRows={7}
            maxRows={7}
            inputProps={{ maxLength: 95000 }}
            containerClasses={styles.commentContainer}
            labelClasses={styles.commentLabelText}
            label={t(TranslationKey['Add a list of reasons'])}
            value={reasons}
            onChange={e => setReasons(e.target.value)}
          />
        )}
      </div>

      <div className={styles.tableWrapper}>
        <div className={styles.tableSearchWrapper}>
          <Typography className={styles.tableSearchTitle}>{t(TranslationKey['To be added to the list'])}</Typography>
          <SearchInput
            inputClasses={styles.searchInput}
            value={nameSearchValue}
            placeholder={
              checkIsAdmin(userRole)
                ? t(TranslationKey['Search by Proxy'])
                : t(TranslationKey['Search by ASIN, Reason'])
            }
            onChange={e => setNameSearchValue(e.target.value)}
          />
        </div>
        {updatedAsinsAndReasonsData.length ? (
          <>
            <TableAsinAndReason
              userRole={userRole}
              data={updatedAsinsAndReasonsData}
              onClickRemoveCell={onClickRemoveCell}
            />
            {updatedAsinsAndReasonsData.some(item => item.asin === '') ? (
              <span className={styles.error}>{t(TranslationKey['ASIN cannot contain empty values'])}</span>
            ) : null}
          </>
        ) : null}
      </div>

      <div className={styles.buttonsWrapper}>
        <Button disabled={error} className={styles.button} onClick={() => onClickPreviewButton()}>
          <VisibilityIcon className={styles.icon} />
        </Button>

        <div className={styles.actionsButtonsContainer}>
          <Button
            styleType={ButtonStyle.SUCCESS}
            disabled={
              !updatedAsinsAndReasonsData.length ||
              updatedAsinsAndReasonsData.some(item => item.asin === '') ||
              submitIsClicked ||
              error
            }
            className={styles.button}
            onClick={() => {
              if (checkIsAdmin(userRole)) {
                onSubmit(prev => [...new Set([...prev, ...asinsAndReasonsData])])
                onClose()
              } else {
                onSubmit(asinsAndReasonsData, strategy)
              }

              setSubmitIsClicked(true)
            }}
          >
            {t(TranslationKey.Save)}
          </Button>

          <Button variant={ButtonVariant.OUTLINED} className={styles.buttonCancel} onClick={onClose}>
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>
    </div>
  )
}
