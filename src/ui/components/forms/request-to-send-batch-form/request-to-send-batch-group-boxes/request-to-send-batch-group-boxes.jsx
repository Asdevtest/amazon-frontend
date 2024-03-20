import { Typography } from '@mui/material'

import { zipCodeGroups } from '@constants/configs/zip-code-groups'
import { TranslationKey } from '@constants/translations/translation-key'

import { Text } from '@components/shared/text'
import { UserLink } from '@components/user/user-link'

import { calcFinalWeightForBox } from '@utils/calculation'
import { findTariffInStorekeepersData } from '@utils/checks'
import { toFixed, toFixedWithDollarSign, toFixedWithKg } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './request-to-send-batch-group-boxes.style'

import { RequestToSendBatchBox } from '../request-to-send-batch-box'

export const RequestToSendBatchesGroupBoxes = ({
  storekeepersData,
  volumeWeightCoefficient,
  selectedGroup,
  boxesMy,
  boxesDeliveryCosts,
  onClickRemoveBoxFromBatch,
  setCurrentOpenedBox,
}) => {
  const { classes: styles, cx } = useStyles()

  const totalPrice = selectedGroup.boxes.reduce(
    (acc, cur) => (acc += boxesDeliveryCosts.find(priceObj => priceObj.guid === cur._id)?.deliveryCost),
    0,
  )

  const totalWeight = selectedGroup.boxes.reduce(
    (acc, cur) => (acc += calcFinalWeightForBox(cur, volumeWeightCoefficient) * cur.amount),
    0,
  )

  const totalVolumeWeight = selectedGroup.boxes.reduce(
    (acc, cur) =>
      (acc += boxesDeliveryCosts.find(priceObj => priceObj.guid === cur._id)?.volumeWeightKgWarehouse * cur.amount),
    0,
  )

  const totalCubicMeters = selectedGroup.boxes.reduce(
    (acc, cur) => (acc += boxesDeliveryCosts.find(priceObj => priceObj.guid === cur._id)?.cubicMeters),
    0,
  )

  const firstNumOfCode = selectedGroup.destination?.zipCode?.[0] || null

  const regionOfDeliveryName =
    firstNumOfCode === null ? null : zipCodeGroups.find(el => el.codes.includes(Number(firstNumOfCode)))?.name

  const tariffIsInvalid = !findTariffInStorekeepersData(
    storekeepersData,
    selectedGroup.storekeeper?._id,
    selectedGroup.logicsTariff?._id,
  )

  const currentTariff =
    selectedGroup.logicsTariff?.conditionsByRegion?.[regionOfDeliveryName]?.rate ||
    selectedGroup?.variationTariff?.pricePerKgUsd

  return (
    <div className={cx(styles.tableWrapper, { [styles.tableAlertWrapper]: tariffIsInvalid })}>
      {selectedGroup.price !== 0 && (
        <div className={styles.headerWrapper}>
          <div className={styles.headerSubWrapper}>
            <Typography className={styles.headerTitle}>{t(TranslationKey.Destination)}</Typography>

            <Typography className={cx(styles.headerSpanText, styles.textEllipsis)}>
              {selectedGroup.destination?.name}
            </Typography>
          </div>

          <div className={styles.headerSubWrapper}>
            <Typography className={styles.headerTitle}>{t(TranslationKey['Int warehouse'])}</Typography>

            <div className={styles.userLinkWrapper}>
              <UserLink blackText name={selectedGroup.storekeeper?.name} userId={selectedGroup.storekeeper?._id} />
            </div>
          </div>

          <div className={styles.headerSubWrapper}>
            <Typography className={styles.headerTitle}>{t(TranslationKey.Tariff)}</Typography>

            <Typography className={styles.headerSpanText}>{selectedGroup.logicsTariff?.name}</Typography>
          </div>

          <div className={styles.headerSubWrapper}>
            <Typography className={styles.headerTitle}>{t(TranslationKey.Rate) + ', $'}</Typography>

            <Typography className={styles.headerSpanText}>{toFixedWithDollarSign(currentTariff, 2)}</Typography>
          </div>
        </div>
      )}

      <table className={styles.table}>
        {selectedGroup.boxes.map((boxId, index) => {
          const findBox = boxesMy.find(box => box._id === boxId._id)
          const findRequestToSendBatchPriceForCurBox = boxesDeliveryCosts.find(
            priceObj => priceObj.guid === findBox._id,
          )

          return (
            <tbody key={`requestToSendBatchModalBox_${findBox._id}_${index}`} className={styles.boxWrapper}>
              <RequestToSendBatchBox
                volumeWeightCoefficient={volumeWeightCoefficient}
                box={findBox}
                index={index}
                price={findRequestToSendBatchPriceForCurBox?.deliveryCost}
                setCurrentOpenedBox={setCurrentOpenedBox}
                onClickRemoveBoxFromBatch={() => onClickRemoveBoxFromBatch(boxId._id)}
              />
            </tbody>
          )
        })}
      </table>
      {selectedGroup.price !== 0 && (
        <div className={styles.footerWrapper}>
          <div>
            <div className={styles.footerSubWrapper}>
              <div className={styles.footerSubWrapper}>
                <Text className={styles.footerTitle}>{t(TranslationKey['Total volume weight'])}</Text>

                <Typography className={styles.footerSpanText}>{toFixedWithKg(totalVolumeWeight, 2)}</Typography>
              </div>

              <div className={styles.footerSubWrapper}>
                <Text className={styles.footerTitle}>{t(TranslationKey['Total CBM'])}</Text>

                <Typography className={styles.footerSpanText}>{toFixed(totalCubicMeters, 6)}</Typography>
              </div>
            </div>

            {tariffIsInvalid ? (
              <Typography className={styles.footerAlertSpanText}>
                {t(TranslationKey['The tariff is invalid or has been removed!'])}
              </Typography>
            ) : null}
          </div>

          <div className={styles.footerSubWrapper}>
            <Text
              tooltipInfoContent={t(TranslationKey['Total weight of the selected boxes'])}
              className={styles.footerTitle}
            >
              {t(TranslationKey['Total weight'])}
            </Text>

            <Typography className={styles.footerSpanText}>{toFixedWithKg(totalWeight, 2)}</Typography>
          </div>

          <div className={styles.footerSubWrapper}>
            <Text
              tooltipInfoContent={t(TranslationKey['The cost depends on the total weight and the rate you choose'])}
              className={styles.footerTitle}
            >
              {t(TranslationKey['Total cost of shipment'])}
            </Text>

            <Typography className={styles.footerSpanText}>{toFixedWithDollarSign(totalPrice, 2)}</Typography>
          </div>
        </div>
      )}
    </div>
  )
}
