import React from 'react'

import {Typography} from '@material-ui/core'
import clsx from 'clsx'

import {TranslationKey} from '@constants/translations/translation-key'
import {zipCodeGroups} from '@constants/zip-code-groups'

import {Text} from '@components/text'
import {UserLink} from '@components/user-link'

import {calcFinalWeightForBox} from '@utils/calculation'
import {findTariffInStorekeepersData} from '@utils/checks'
import {toFixedWithDollarSign, toFixedWithKg} from '@utils/text'
import {t} from '@utils/translations'

import {RequestToSendBatchBox} from '../request-to-send-batch-box'
import {useClassNames} from './request-to-send-batch-group-boxes.style'

export const RequestToSendBatchesGroupBoxes = ({
  storekeepersData,
  volumeWeightCoefficient,
  selectedGroup,
  boxesMy,
  boxesDeliveryCosts,
  onClickRemoveBoxFromBatch,
}) => {
  const classNames = useClassNames()

  const totalPrice = selectedGroup.boxes.reduce(
    (acc, cur) => (acc += boxesDeliveryCosts.find(priceObj => priceObj.guid === cur._id)?.deliveryCost),
    0,
  )

  const totalWeight = selectedGroup.boxes.reduce(
    (acc, cur) => acc + calcFinalWeightForBox(cur, volumeWeightCoefficient),
    0,
  )

  const firstNumOfCode = selectedGroup.destination?.zipCode?.[0] || null
  console.log(boxesDeliveryCosts)
  const regionOfDeliveryName =
    firstNumOfCode === null ? null : zipCodeGroups.find(el => el.codes.includes(Number(firstNumOfCode)))?.name

  const tariffIsInvalid = !findTariffInStorekeepersData(
    storekeepersData,
    selectedGroup.storekeeper?._id,
    selectedGroup.logicsTariff?._id,
  )

  const currentTariff = selectedGroup.logicsTariff?.conditionsByRegion?.[regionOfDeliveryName]?.rate

  return (
    <div className={clsx(classNames.tableWrapper, {[classNames.tableAlertWrapper]: tariffIsInvalid})}>
      {selectedGroup.price !== 0 && (
        <div className={classNames.headerWrapper}>
          <div className={classNames.headerSubWrapper}>
            <Typography className={classNames.headerTitle}>{t(TranslationKey.Destination)}</Typography>

            <Typography className={[classNames.headerSpanText, classNames.textEllipsis]}>
              {selectedGroup.destination?.name + 'DSFSDFSDFSDFSDKJFHLSDKJFHLSDKJFHLKSDJHFKLSDJHFLKSDHFKHSDFH'}
            </Typography>
          </div>

          <div className={classNames.headerSubWrapper}>
            <Typography className={classNames.headerTitle}>{t(TranslationKey['Int warehouse'])}</Typography>

            <div className={classNames.userLinkWrapper}>
              <UserLink blackText name={selectedGroup.storekeeper?.name} userId={selectedGroup.storekeeper?._id} />
            </div>
          </div>

          <div className={classNames.headerSubWrapper}>
            <Typography className={classNames.headerTitle}>{t(TranslationKey.Tariff)}</Typography>

            <Typography className={classNames.headerSpanText}>{selectedGroup.logicsTariff?.name}</Typography>
          </div>

          <div className={classNames.headerSubWrapper}>
            <Typography className={classNames.headerTitle}>{`${t(
              TranslationKey['Rate, $'],
            )} (US ${regionOfDeliveryName})`}</Typography>

            <Typography className={classNames.headerSpanText}>{toFixedWithDollarSign(currentTariff, 2)}</Typography>
          </div>
        </div>
      )}

      <table border="1" className={classNames.table}>
        {selectedGroup.boxes.map((boxId, index) => {
          const findBox = boxesMy.find(box => box._id === boxId._id)
          const findRequestToSendBatchPriceForCurBox = boxesDeliveryCosts.find(
            priceObj => priceObj.guid === findBox._id,
          )

          return (
            <div key={`requestToSendBatchModalBox_${findBox._id}_${index}`} className={classNames.boxWrapper}>
              <RequestToSendBatchBox
                volumeWeightCoefficient={volumeWeightCoefficient}
                box={findBox}
                index={index}
                price={findRequestToSendBatchPriceForCurBox?.deliveryCost}
                currentTariff={currentTariff}
                onClickRemoveBoxFromBatch={() => onClickRemoveBoxFromBatch(boxId._id)}
              />
            </div>
          )
        })}
      </table>
      {selectedGroup.price !== 0 && (
        <div className={classNames.footerWrapper}>
          {tariffIsInvalid ? (
            <Typography className={classNames.footerAlertSpanText}>
              {t(TranslationKey['The tariff is invalid or has been removed!'])}
            </Typography>
          ) : null}

          <div className={classNames.footerSubWrapper}>
            <Text
              tooltipInfoContent={t(TranslationKey['Total weight of the selected boxes'])}
              className={classNames.footerTitle}
            >
              {t(TranslationKey['Total weight'])}
            </Text>

            <Typography className={classNames.footerSpanText}>{toFixedWithKg(totalWeight, 2)}</Typography>
          </div>

          <div className={classNames.footerSubWrapper}>
            <Text
              tooltipInfoContent={t(TranslationKey['The cost depends on the total weight and the rate you choose'])}
              className={classNames.footerTitle}
            >
              {t(TranslationKey['Total cost of shipment'])}
            </Text>

            <Typography className={classNames.footerSpanText}>{toFixedWithDollarSign(totalPrice, 2)}</Typography>
          </div>
        </div>
      )}
    </div>
  )
}
