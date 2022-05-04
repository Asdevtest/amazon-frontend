import {Divider, InputBase, Paper, Typography} from '@material-ui/core'
import clsx from 'clsx'

import {texts} from '@constants/texts'

import {SuccessButton} from '@components/buttons/success-button'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithDollarSign, toFixedWithKg, withAmount} from '@utils/text'

import {useClassNames} from './private-label-card.style'

const textConsts = getLocalizedTexts(texts, 'en').privateLabelCard

export const PrivateLabelCard = ({item, setProductToPay}) => {
  const classNames = useClassNames()

  const InfoRow = ({label, value}) => (
    <div className={classNames.textWrapper}>
      <Typography className={clsx(classNames.text, classNames.label)}>{label}</Typography>
      <Typography className={clsx(classNames.text, classNames.value)}>{value}</Typography>
    </div>
  )

  console.log('item', item)

  return (
    <Paper className={classNames.root}>
      <div className={classNames.imgWrapper}>
        <img alt="item image" className={classNames.img} src={getAmazonImageUrl(item.images[0])} />
      </div>
      <div className={classNames.wrapper}>
        <Typography className={classNames.title}>{item.amazonTitle}</Typography>

        <Typography className={classNames.category}>{item.category}</Typography>

        <InfoRow label={textConsts.price} value={toFixedWithDollarSign(item.amazon, 2)} />
        <div className={classNames.textWrapper}>
          <Typography className={clsx(classNames.text, classNames.label)}>{'Кол-во'}</Typography>
          <InputBase classes={{root: classNames.inputWrapper, input: classNames.input}} defaultValue={100} />
        </div>

        <Divider className={classNames.divider} />

        <InfoRow label={textConsts.avgPrice} value={toFixedWithDollarSign(item.avgPrice, 2)} />

        <InfoRow label={textConsts.recConsignmentQty} value={withAmount(item.fbaamount)} />
        <InfoRow label={textConsts.recConsignmentWeight} value={toFixedWithKg(item.weight * item.fbaamount, 2)} />

        <Divider className={classNames.divider} />

        <InfoRow label={textConsts.avgBSR} value={item.bsr} />

        <InfoRow label={textConsts.avgReviews} value={item.avgReviews} />
        <InfoRow label={textConsts.avgRevenue} value={toFixedWithDollarSign(item.profit, 2)} />

        <div className={classNames.buttonsWrapper}>
          <SuccessButton
            disableElevation
            variant="contained"
            onClick={() => {
              setProductToPay(item)
            }}
          >
            {textConsts.launchBtn}
          </SuccessButton>
          {/* <Button  // может пригодится
            disableElevation
            color="primary"
            className={classNames.priceButton}
            variant="contained"
            onClick={() => {
              setProductToPay(item)
              onTriggerOpenModal('showConfirmPayModal')
            }}
          >
            {`${textConsts.addBtnPrefix} ${toFixedWithDollarSign(item.amazon, 2)}`}
          </Button> */}
        </div>
      </div>
    </Paper>
  )
}
