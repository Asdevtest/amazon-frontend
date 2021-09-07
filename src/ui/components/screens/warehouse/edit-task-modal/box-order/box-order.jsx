import {Typography, Chip} from '@material-ui/core'
import clsx from 'clsx'

import {texts} from '@constants/texts'

import {Input} from '@components/input'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './box-order.style'

const textConsts = getLocalizedTexts(texts, 'en').warehouseEditBoxForm

export const BoxOrder = ({box, onSetBarcode}) => {
  const classNames = useClassNames()
  return (
    <div className={classNames.order}>
      <div className={classNames.imgWithTitles}>
        <img className={classNames.img} src={box.product.img} />
        <div>
          <Typography>{box.product.amazonTitle}</Typography>
          <Typography color="textSecondary">{box.product.id}</Typography>
        </div>
      </div>

      <div className={classNames.fields}>
        <div>
          <Typography>{textConsts.amountLabel}</Typography>
          <Input className={classNames.inputNumber} value={box.amount} />
        </div>
        <div>
          <Typography>{textConsts.materialLabel}</Typography>
          <Input className={classNames.inputText} value={box.product.material} />
        </div>
      </div>

      <div className={classNames.chipWrapper}>
        <Typography className={classNames.subTitle}>{textConsts.shippingLabel}</Typography>
        <Chip
          className={clsx(
            {
              root: classNames.orderChip,
              clickable: classNames.orderChipHover,
              deletable: classNames.orderChipHover,
              deleteIcon: classNames.orderChipIcon,
            },
            {[classNames.select]: box.chip},
          )}
          size="small"
          label={box.chip ? box.chip : textConsts.setShippingLabel}
          onClick={box.chip ? () => navigator.clipboard.writeText(box.chip) : () => onSetBarcode()}
          onDelete={box.chip ? () => alert(textConsts.deleteAlert) : undefined}
        />
      </div>
    </div>
  )
}
