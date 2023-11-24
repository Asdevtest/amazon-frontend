import { memo } from 'react'

import { Tooltip, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomSlider } from '@components/shared/custom-slider'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getShortenStringIfLongerThanCount, toFixed, toFixedWithKg } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from '../receive-box-modal.style'

export const CurrentBox = memo(({ boxesBefore, volumeWeightCoefficient, totalProductsAmount, actuallyAssembled }) => {
  const { classes: classNames } = useClassNames()

  return (
    <div className={classNames.currentBox}>
      <div className={classNames.order}>
        <img className={classNames.img} src={getAmazonImageUrl(boxesBefore[0]?.items[0]?.product.images[0])} />
        <Tooltip title={boxesBefore[0].items[0].product.amazonTitle}>
          <Typography className={classNames.titleOfCurBox}>
            {getShortenStringIfLongerThanCount(boxesBefore[0].items[0].product.amazonTitle, 225)}
          </Typography>
        </Tooltip>
      </div>

      <div className={classNames.currentBoxFooter}>
        <div className={classNames.qtyWrapper}>
          <Typography className={classNames.qtyTitle}>{t(TranslationKey.Quantity)}</Typography>
          <Typography className={classNames.qtySubTitle}>
            {
              boxesBefore.reduce(
                (ac, cur) => (ac += cur.items[0].amount * cur.amount),
                0,
              ) /* `${box.items[0].amount} x ${box.amount}`*/
            }
          </Typography>
        </div>
        <div className={classNames.qtyWrapper}>
          <Typography className={classNames.qtyTitle}>{t(TranslationKey['Left to redistribute'])}</Typography>
          <Typography className={classNames.qtySubTitle}>{totalProductsAmount}</Typography>
        </div>
        <div className={classNames.qtyWrapper}>
          <Typography className={classNames.qtyTitle}>{t(TranslationKey['Actually assembled'])}</Typography>
          <Typography className={classNames.qtySubTitle}>{actuallyAssembled}</Typography>
        </div>
      </div>

      <div className={classNames.currentBoxesWrapper}>
        <CustomSlider alignButtons="end">
          {boxesBefore.map((box, index) => (
            <div key={index} className={classNames.demensionsWrapper}>
              <Typography className={classNames.categoryTitle}>
                {t(TranslationKey['Sizes from buyer']) + ':'}
              </Typography>
              <Typography className={classNames.footerTitle}>{`${t(TranslationKey.Length)}: ${toFixed(
                box.lengthCmSupplier,
                2,
              )} ${t(TranslationKey.cm)}`}</Typography>
              <Typography className={classNames.footerTitle}>{`${t(TranslationKey.Width)}: ${toFixed(
                box.widthCmSupplier,
                2,
              )} ${t(TranslationKey.cm)}`}</Typography>
              <Typography className={classNames.footerTitle}>{`${t(TranslationKey.Height)}: ${toFixed(
                box.heightCmSupplier,
                2,
              )} ${t(TranslationKey.cm)}`}</Typography>
              <Typography className={classNames.footerTitle}>{`${t(TranslationKey.Weight)}: ${toFixedWithKg(
                box.weighGrossKgSupplier,
                2,
              )} `}</Typography>
              <Typography className={classNames.footerTitle}>{`${t(TranslationKey['Volume weight'])}: ${toFixedWithKg(
                ((parseFloat(box.lengthCmSupplier) || 0) *
                  (parseFloat(box.heightCmSupplier) || 0) *
                  (parseFloat(box.widthCmSupplier) || 0)) /
                  volumeWeightCoefficient,
                2,
              )} `}</Typography>
              <Typography className={classNames.footerTitle}>{`${t(TranslationKey['Final weight'])}: ${toFixedWithKg(
                box.weighGrossKgSupplier >
                  ((parseFloat(box.lengthCmSupplier) || 0) *
                    (parseFloat(box.heightCmSupplier) || 0) *
                    (parseFloat(box.widthCmSupplier) || 0)) /
                    volumeWeightCoefficient
                  ? box.weighGrossKgSupplier
                  : ((parseFloat(box.lengthCmSupplier) || 0) *
                      (parseFloat(box.heightCmSupplier) || 0) *
                      (parseFloat(box.widthCmSupplier) || 0)) /
                      volumeWeightCoefficient,
                2,
              )}`}</Typography>
            </div>
          ))}
        </CustomSlider>
      </div>
    </div>
  )
})
