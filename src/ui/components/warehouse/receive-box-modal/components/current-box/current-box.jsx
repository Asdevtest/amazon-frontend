import { memo, useEffect, useState } from 'react'

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { Tooltip } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getShortenStringIfLongerThanCount, toFixed, toFixedWithKg } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './current-box.style'

export const CurrentBox = memo(({ boxesBefore, volumeWeightCoefficient, totalProductsAmount, actuallyAssembled }) => {
  const { classes: styles, cx } = useStyles()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentBox, setCurrentBox] = useState(boxesBefore?.[currentIndex])

  useEffect(() => {
    setCurrentBox(boxesBefore?.[currentIndex])
  }, [currentIndex])

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? boxesBefore?.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex === boxesBefore?.length - 1 ? 0 : prevIndex + 1))
  }

  const quantity = boxesBefore.reduce((ac, cur) => (ac += cur.items[0].amount * cur.amount), 0)
  const productTooltip =
    boxesBefore[0]?.items[0]?.product.amazonTitle.length > 225 ? boxesBefore[0]?.items[0]?.product.amazonTitle : ''
  const volumeWeight = toFixedWithKg(
    ((parseFloat(currentBox?.lengthCmSupplier) || 0) *
      (parseFloat(currentBox?.heightCmSupplier) || 0) *
      (parseFloat(currentBox?.widthCmSupplier) || 0)) /
      volumeWeightCoefficient,
    2,
  )
  const finalWeight = toFixedWithKg(
    currentBox?.weighGrossKgSupplier >
      ((parseFloat(currentBox?.lengthCmSupplier) || 0) *
        (parseFloat(currentBox?.heightCmSupplier) || 0) *
        (parseFloat(currentBox?.widthCmSupplier) || 0)) /
        volumeWeightCoefficient
      ? currentBox?.weighGrossKgSupplier
      : ((parseFloat(currentBox?.lengthCmSupplier) || 0) *
          (parseFloat(currentBox?.heightCmSupplier) || 0) *
          (parseFloat(currentBox?.widthCmSupplier) || 0)) /
          volumeWeightCoefficient,
    2,
  )
  const isDisableArrow = boxesBefore?.length <= 1
  const isDisableArrowLeft = currentIndex === 0
  const isDisableArrowRight = currentIndex === boxesBefore.length - 1

  return (
    <div className={styles.currentBox}>
      <div className={styles.order}>
        <img className={styles.img} src={getAmazonImageUrl(boxesBefore[0]?.items[0]?.product.images[0])} />
        <Tooltip title={productTooltip}>
          <p className={styles.titleOfCurBox}>
            {getShortenStringIfLongerThanCount(boxesBefore[0].items[0].product.amazonTitle, 225)}
          </p>
        </Tooltip>
      </div>

      <div className={styles.currentBoxInfo}>
        <div className={styles.qtyWrapper}>
          <p className={styles.qtyTitle}>{t(TranslationKey.Quantity)}</p>
          <p className={styles.qtySubTitle}>{quantity}</p>
        </div>
        <div className={styles.qtyWrapper}>
          <p className={styles.qtyTitle}>{t(TranslationKey['Left to redistribute'])}</p>
          <p className={styles.qtySubTitle}>{totalProductsAmount}</p>
        </div>
        <div className={styles.qtyWrapper}>
          <p className={styles.qtyTitle}>{t(TranslationKey['Actually assembled'])}</p>
          <p className={styles.qtySubTitle}>{actuallyAssembled}</p>
        </div>
      </div>

      <div className={styles.currentBoxesWrapper}>
        <div className={styles.demensionsWrapper}>
          <p className={styles.categoryTitle}>{t(TranslationKey['Sizes from buyer']) + ':'}</p>

          <p className={styles.footerTitle}>{`${t(TranslationKey.Length)}: ${toFixed(
            currentBox?.lengthCmSupplier,
            2,
          )} ${t(TranslationKey.cm)}`}</p>
          <p className={styles.footerTitle}>{`${t(TranslationKey.Width)}: ${toFixed(
            currentBox?.widthCmSupplier,
            2,
          )} ${t(TranslationKey.cm)}`}</p>
          <p className={styles.footerTitle}>{`${t(TranslationKey.Height)}: ${toFixed(
            currentBox?.heightCmSupplier,
            2,
          )} ${t(TranslationKey.cm)}`}</p>
          <p className={styles.footerTitle}>{`${t(TranslationKey.Weight)}: ${toFixedWithKg(
            currentBox?.weighGrossKgSupplier,
            2,
          )} `}</p>
          <p className={styles.footerTitle}>{`${t(TranslationKey['Volume weight'])}: ${volumeWeight} `}</p>
          <p className={styles.footerTitle}>{`${t(TranslationKey['Final weight'])}: ${finalWeight}`}</p>
        </div>

        <div className={styles.arrowButtons}>
          <button disabled={isDisableArrow || isDisableArrowLeft} onClick={handlePrev}>
            <ArrowLeftIcon className={cx(styles.arrowIcon, isDisableArrowLeft && styles.arrowIconDisable)} />
          </button>
          <p className={styles.footerTitle}>{`${currentIndex + 1} / ${boxesBefore.length}`}</p>
          <button disabled={isDisableArrow || isDisableArrowRight} onClick={handleNext}>
            <ArrowRightIcon className={cx(styles.arrowIcon, isDisableArrowRight && styles.arrowIconDisable)} />
          </button>
        </div>
      </div>
    </div>
  )
})
