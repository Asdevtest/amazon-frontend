import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Input} from '@components/input'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './box-order.style'

const textConsts = getLocalizedTexts(texts, 'en').clientEditBoxForm

export const BoxOrder = observer(({order, setAmountField}) => {
  const classNames = useClassNames()
  return (
    <div className={classNames.order}>
      <div className={classNames.imgWithTitles}>
        <img
          className={classNames.img}
          src={
            order.product &&
            order.product.images &&
            order.product.images[0] &&
            getAmazonImageUrl(order.product.images[0])
          }
        />
        <div>
          <Typography>{order.product && order.product.amazonTitle}</Typography>
          <Typography color="textSecondary">{order.product && order.product.id}</Typography>
        </div>
      </div>

      <div className={classNames.fields}>
        <div>
          <Typography>{textConsts.amountLabel}</Typography>
          <Input
            className={classNames.inputNumber}
            type="number"
            value={order.amount}
            onChange={e => setAmountField(e)}
          />
        </div>
        <div>
          <Typography>{textConsts.materialLabel}</Typography>
          <Input disabled className={classNames.inputText} value={order.product && order.product.material} />
        </div>
      </div>

      <Typography>{order.barCode}</Typography>
    </div>
  )
})
