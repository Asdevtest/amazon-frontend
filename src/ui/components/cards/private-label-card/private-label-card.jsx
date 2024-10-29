import { Divider, InputBase } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { toFixedWithDollarSign, toFixedWithKg, withAmount } from '@utils/text'
import { t } from '@utils/translations'

import '@typings/enums/button-style'

import { useStyles } from './private-label-card.style'

export const PrivateLabelCard = ({ item, setProductToPay, index }) => {
  const { classes: styles, cx } = useStyles()

  const InfoRow = ({ label, value }) => (
    <div className={styles.textWrapper}>
      <p className={cx(styles.text, styles.label)}>{label}</p>
      <p className={cx(styles.text, styles.value)}>{value}</p>
    </div>
  )

  return (
    <div className={styles.root}>
      <div className={styles.imgWrapper}>
        <img alt="item image" className={styles.img} src={getAmazonImageUrl(item.images[0], true)} />
      </div>
      <div className={styles.wrapper}>
        <p className={styles.category}>{item.category}</p>

        <InfoRow label={t(TranslationKey.Price)} value={toFixedWithDollarSign(item.amazon, 2)} />
        <div className={styles.textWrapper}>
          <p className={cx(styles.text, styles.label)}>{t(TranslationKey.Quantity)}</p>
          <InputBase classes={{ root: styles.inputWrapper, input: styles.input }} defaultValue={100} />
        </div>

        <Divider className={styles.divider} />

        <InfoRow label={t(TranslationKey['Average Price'])} value={toFixedWithDollarSign(item.avgPrice, 2)} />

        <InfoRow
          label={t(TranslationKey['Recommended batch to start']) + ' Private Label'}
          value={withAmount(item.fbaamount)}
        />
        <InfoRow
          label={t(TranslationKey['Recommended batch weight'])}
          value={toFixedWithKg(item.weight * item.fbaamount, 2)}
        />

        <Divider className={styles.divider} />

        <InfoRow label={t(TranslationKey['Average BSR'])} value={item.avgBSR || item.bsr} />

        <InfoRow label={t(TranslationKey['Average Review'])} value={item.avgReviews} />
        <InfoRow
          label={t(TranslationKey['Average revenue'])}
          value={item.avgRevenue ? toFixedWithDollarSign(item.avgRevenue, 2) : toFixedWithDollarSign(item.profit, 2)}
        />

        <div className={styles.buttonsWrapper}>
          <CustomButton
            type="primary"
            tooltipInfoContent={index === 0 && t(TranslationKey['Purchase a product card by Private Label strategy'])}
            onClick={() => setProductToPay(item)}
          >
            {t(TranslationKey.Start) + ' Private Label'}
          </CustomButton>
        </div>
      </div>
    </div>
  )
}
