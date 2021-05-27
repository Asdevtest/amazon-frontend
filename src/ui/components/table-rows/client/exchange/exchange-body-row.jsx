import {Button, TableCell, TableRow} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'

import {texts} from '@constants/texts'

import {StarRating} from '@components/star-rating'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {isNumber} from '@utils/is-number'

import {styles} from './exchange-body-row.style'

const textConsts = getLocalizedTexts(texts, 'en').exchangeBodyRow

const ExchangeBodyRowRaw = ({item, handlers, ...restProps}) => {
  const classNames = restProps.classes

  const ImgCell = imgSrc => <img alt="" className={classNames.imgCell} src={imgSrc} />

  const ResearcherCell = researcher => (
    <>
      <Button color="primary" onClick={() => handlers.username()}>
        {researcher.username}
      </Button>
      <StarRating rating={researcher.rating} />
    </>
  )

  const PrivateLabelPriceCell = price => <span className={classNames.privateLabelPrice}>{`$${price}`}</span>

  const renderCell = (key, value) => {
    switch (key) {
      case 'categoryImg':
        return ImgCell(value)
      case 'researcher':
        return ResearcherCell(value)
      case 'privateLabelPrice':
        return PrivateLabelPriceCell(value)
      default:
        return value
    }
  }

  return (
    <TableRow>
      {Object.entries(item).map(([key, value], index) => (
        <TableCell key={`${index}${key}-${value}`} className={clsx({[classNames.alignRight]: isNumber(value)})}>
          {renderCell(key, value)}
        </TableCell>
      ))}
      <TableCell>
        <Button color="primary" onClick={() => handlers.privateLabel(item)}>
          {textConsts.labelBtn}
        </Button>
      </TableCell>
      <TableCell>
        <Button disableElevation color="primary" variant="contained">
          {textConsts.priceBtn}
        </Button>
      </TableCell>
    </TableRow>
  )
}

export const ExchangeBodyRow = withStyles(styles)(ExchangeBodyRowRaw)
