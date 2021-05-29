import {Button, Divider, InputBase, Paper, Typography} from '@material-ui/core'
import clsx from 'clsx'

import {texts} from '@constants/texts'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './private-label-card.style'

const textConsts = getLocalizedTexts(texts, 'en').privateLabelCard

export const PrivateLabelCard = ({item}) => {
  const classNames = useClassNames()

  const InfoRow = ({label, value}) => (
    <div className={classNames.textWrapper}>
      <Typography className={clsx(classNames.text, classNames.label)}>{label}</Typography>
      <Typography className={clsx(classNames.text, classNames.value)}>{value}</Typography>
    </div>
  )

  return (
    <Paper className={classNames.root}>
      <img alt="item" className={classNames.img} src={item.categoryImg} />
      <div className={classNames.wrapper}>
        <Typography className={classNames.title}>{item.category}</Typography>

        <InfoRow label={textConsts.price} value={'$ ' + item.price + ' + $ ' + item.price * 13} />
        <div className={classNames.textWrapper}>
          <Typography className={clsx(classNames.text, classNames.label)}>{'Кол-во'}</Typography>
          <InputBase classes={{root: classNames.inputWrapper, input: classNames.input}} defaultValue={100} />
        </div>

        <Divider className={classNames.divider} />

        <InfoRow label={textConsts.avgPrice} value={'$ ' + item.avgPrice} />
        <InfoRow label={textConsts.recConsignmentQty} value={item.recConsignmentQty + ' шт.'} />
        <InfoRow label={textConsts.recConsignmentWeight} value={item.recConsignmentWeight + ' кг.'} />

        <Divider className={classNames.divider} />

        <InfoRow label={textConsts.avgBSR} value={item.avgBSR} />
        <InfoRow label={textConsts.avgReviews} value={item.avgReviews} />
        <InfoRow label={textConsts.avgRevenue} value={item.avgRevenue} />

        <div className={classNames.buttonsWrapper}>
          <Button disableElevation color="primary" className={classNames.privateLabelButton} variant="contained">
            {'Private Label'}
          </Button>
          <Button disableElevation color="primary" className={classNames.priceButton} variant="contained">
            {'$ ' + item.price}
          </Button>
        </div>
      </div>
    </Paper>
  )
}
