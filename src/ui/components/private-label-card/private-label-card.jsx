import {Button, Divider, InputBase, Paper, Typography} from '@material-ui/core'
import clsx from 'clsx'

import {texts} from '@constants/texts'

import {SuccessButton} from '@components/buttons/success-button'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithDollarSign, withAmount, withKg} from '@utils/text'

import {useClassNames} from './private-label-card.style'

const textConsts = getLocalizedTexts(texts, 'en').privateLabelCard

export const PrivateLabelCard = ({item, onClickBuyProductBtn, setProductToPay, onTriggerOpenModal}) => {
  const classNames = useClassNames()

  const InfoRow = ({label, value}) => (
    <div className={classNames.textWrapper}>
      <Typography className={clsx(classNames.text, classNames.label)}>{label}</Typography>
      <Typography className={clsx(classNames.text, classNames.value)}>{value}</Typography>
    </div>
  )

  return (
    <Paper className={classNames.root}>
      <div className={classNames.imgWrapper}>
        <img
          alt="item image"
          className={classNames.img}
          src={item.images && item.images[0] && getAmazonImageUrl(item.images[0])}
        />
      </div>
      <div className={classNames.wrapper}>
        <Typography className={classNames.title}>{item.category}</Typography>

        <InfoRow label={textConsts.price} value={toFixedWithDollarSign(item.amazon)} />
        <div className={classNames.textWrapper}>
          <Typography className={clsx(classNames.text, classNames.label)}>{'Кол-во'}</Typography>
          <InputBase classes={{root: classNames.inputWrapper, input: classNames.input}} defaultValue={100} />
        </div>

        <Divider className={classNames.divider} />

        <InfoRow label={textConsts.avgPrice} value={toFixedWithDollarSign(item.avgPrice)} />

        <InfoRow label={textConsts.recConsignmentQty} value={withAmount(item.fbaamount)} />
        <InfoRow label={textConsts.recConsignmentWeight} value={withKg(item.weight)} />

        <Divider className={classNames.divider} />

        <InfoRow label={textConsts.avgBSR} value={item.bsr} />

        <InfoRow label={textConsts.avgReviews} value={item.avgReviews} />
        <InfoRow label={textConsts.avgRevenue} value={toFixedWithDollarSign(item.profit)} />

        <div className={classNames.buttonsWrapper}>
          <SuccessButton
            disableElevation
            variant="contained"
            onClick={() => {
              setProductToPay(item)
              onTriggerOpenModal('showConfirmPayModal')
            }}
          >
            {textConsts.launchBtn}
          </SuccessButton>
          <Button
            disableElevation
            color="primary"
            className={classNames.priceButton}
            variant="contained"
            onClick={onClickBuyProductBtn}
          >
            {`${textConsts.addBtnPrefix} ${toFixedWithDollarSign(item.amazon)}`}
          </Button>
        </div>
      </div>
    </Paper>
  )
}
