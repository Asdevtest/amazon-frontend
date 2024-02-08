import isEqual from 'lodash.isequal'
import { memo, useState } from 'react'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Field } from '@components/shared/field/field'
import { Input } from '@components/shared/input'
import { TabPanel } from '@components/shared/tab-panel'
import { UserLink } from '@components/user/user-link'

import { checkIsBuyer, checkIsClient, checkIsStorekeeper } from '@utils/checks'
import { formatShortDateTime } from '@utils/date-time'
import { getNewTariffTextForBoxOrOrder } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './box-view-form.style'

import { BoxInfoTab } from './box-info-tab'
import { switcherSettings, tabs } from './box-view-form.constants'
import { OrderInfoTab } from './order-info-tab'

export const BoxViewForm = memo(props => {
  const {
    box,
    setOpenModal,
    volumeWeightCoefficient,
    batchHumanFriendlyId,
    storekeeper,
    userInfo,
    onSubmitChangeFields,
    onClickHsCode,
    calcFinalWeightForBoxFunction,
  } = props
  const { classes: styles, cx } = useStyles()

  const [activeTab, setActiveTab] = useState(tabs.BOX_INFO)
  const [formFields, setFormFields] = useState(box)

  const onChangeField = fieldName => event => {
    setFormFields(prevFormFields => ({ ...prevFormFields, [fieldName]: event.target.value }))
  }

  const isClient = checkIsClient(UserRoleCodeMap[userInfo?.role])
  const isStorekeeper = checkIsStorekeeper(UserRoleCodeMap[userInfo?.role])
  const isBuyer = checkIsBuyer(UserRoleCodeMap[userInfo?.role])
  const isEdit = isClient || isStorekeeper || isBuyer
  const disableSaveButton = isEqual(box, formFields)

  const boxAndPrepIdTitle = `${t(TranslationKey.Box)} № ${formFields?.humanFriendlyId}/ prep id:`

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.boxAndPrepIdContainer}>
            <p className={styles.boxAndPrepIdTitle}>{boxAndPrepIdTitle}</p>

            <Input
              disabled={!(isClient || isStorekeeper)}
              className={styles.boxAndPrepIdInput}
              classes={{ input: styles.input }}
              inputProps={{ maxLength: 20 }}
              value={formFields?.prepId}
              onChange={onChangeField('prepId')}
            />
          </div>

          {formFields?.amount ? (
            <div className={styles.superBoxContainer}>
              <div className={styles.superBoxIconContainer}>
                <img src="/assets/icons/big-box.svg" className={styles.superBoxIcon} alt="super box" />
                <span className={styles.superBoxText}>SB</span>
              </div>
              <p className={styles.superBoxText}>{`x${formFields?.amount}`}</p>
            </div>
          ) : null}

          <div className={styles.updatedContainer}>
            <p className={styles.updatedText}>{`${t(TranslationKey.Updated)}:`}</p>
            <p className={styles.updatedTitle}>{formatShortDateTime(formFields?.updatedAt)}</p>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.information}>
          <div className={styles.informationContainer}>
            <p className={styles.informationTitle}>{t(TranslationKey.Destination)}</p>
            <p className={styles.informationText}>
              {formFields?.destination?.name || t(TranslationKey['Not available'])}
            </p>
          </div>

          <div className={styles.informationContainer}>
            <p className={styles.informationTitle}>{t(TranslationKey.Tariff)}</p>
            <p className={styles.informationText}>
              {getNewTariffTextForBoxOrOrder(formFields) || t(TranslationKey['Not available'])}
            </p>
          </div>

          <div className={cx(styles.informationContainer, styles.informationContainerMinGap)}>
            <p className={styles.informationTitle}>{t(TranslationKey['Int warehouse'])}</p>
            <UserLink
              blackText
              withAvatar
              name={storekeeper ? storekeeper?.name : formFields?.storekeeper?.name}
              userId={storekeeper ? storekeeper?._id : formFields?.storekeeper?._id}
              customClassNames={styles.informationUser}
            />
          </div>

          <div className={styles.informationContainer}>
            <p className={styles.informationTitle}>{t(TranslationKey.Batch)}</p>
            <p className={styles.informationText}>
              {(batchHumanFriendlyId ? batchHumanFriendlyId : formFields?.batch?.humanFriendlyId) ||
                t(TranslationKey['Not available'])}
            </p>
          </div>
        </div>

        <div className={styles.switcherWrapper}>
          <CustomSwitcher
            fullWidth
            switchMode="medium"
            condition={activeTab}
            switcherSettings={switcherSettings}
            changeConditionHandler={value => setActiveTab(value)}
          />

          {activeTab === tabs.ORDER_INFO ? (
            <p className={cx(styles.informationTitle, styles.informationTitleMargin)}>
              {`${t(TranslationKey['Products in a box'])}: `}
              <span className={styles.blueColor}>{formFields?.items?.length}</span>
            </p>
          ) : null}

          <TabPanel value={activeTab} index={tabs.BOX_INFO}>
            <BoxInfoTab
              isEdit={isEdit}
              isBuyer={isBuyer}
              isClient={isClient}
              formFields={formFields}
              volumeWeightCoefficient={volumeWeightCoefficient}
              calcFinalWeightForBoxFunction={calcFinalWeightForBoxFunction}
              onChangeField={onChangeField}
            />
          </TabPanel>
          <TabPanel value={activeTab} index={tabs.ORDER_INFO}>
            <OrderInfoTab formFields={formFields} onClickHsCode={onClickHsCode} />
          </TabPanel>
        </div>

        <div className={styles.commentsWrapper}>
          <Field
            multiline
            disabled={!isClient || !onSubmitChangeFields}
            minRows={3}
            maxRows={3}
            label={t(TranslationKey['Client comment'])}
            placeholder={isClient && onSubmitChangeFields ? t(TranslationKey['Add comment']) : ''}
            className={styles.commentField}
            labelClasses={styles.label}
            containerClasses={styles.fieldContainer}
            value={formFields?.clientComment || ''}
            onChange={onChangeField('clientComment')}
          />

          <Field
            multiline
            disabled={!isStorekeeper || !onSubmitChangeFields}
            minRows={3}
            maxRows={3}
            label={t(TranslationKey['Storekeeper comment'])}
            placeholder={isStorekeeper && onSubmitChangeFields ? t(TranslationKey['Add comment']) : ''}
            className={styles.commentField}
            labelClasses={styles.label}
            value={formFields?.storekeeperComment || ''}
            containerClasses={styles.fieldContainer}
            onChange={onChangeField('storekeeperComment')}
          />
        </div>

        <div className={styles.buttonsWrapper}>
          {isEdit && (
            <Button success disabled={disableSaveButton} onClick={() => onSubmitChangeFields(formFields)}>
              {t(TranslationKey.Save)}
            </Button>
          )}

          <Button variant="text" className={styles.closeBtn} onClick={setOpenModal}>
            {t(TranslationKey.Close)}
          </Button>
        </div>
      </div>
    </>
  )
})
