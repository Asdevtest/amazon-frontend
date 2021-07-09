import React from 'react'

import {TableCell, TableRow, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {ErrorButton} from '@components/buttons/error-button'

import {formatDateTime} from '@utils/date-time'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './history-table-row.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseHistoryBodyRow

export const HistoryTableRow = ({item, onCancelMergeBoxes, onCancelSplitBoxes}) => {
  const classNames = useClassNames()

  const renderProductImage = (box, key) => (
    <div key={key} className={classNames.imagesWrapper}>
      <Typography className={classNames.imgNum}>{`#${key + 1}`}</Typography>
      {box.items.map((product, itemIndex) => (
        <div key={itemIndex} className={classNames.imgWrapper}>
          <img alt="placeholder" className={classNames.img} src={getAmazonImageUrl(product.product.images[0])} />
          <Typography className={classNames.imgNum}>{`x${product.amount}`}</Typography>
        </div>
      ))}
    </div>
  )

  const taskMergeDescription = () => (
    <React.Fragment>
      <Typography className={classNames.descriptionWrapper}>
        {textConsts.merge}
        {item.boxes.map((box, index) => renderProductImage(box, index))}
      </Typography>
    </React.Fragment>
  )
  const taskDivideDescription = () => (
    <React.Fragment>
      <Typography className={classNames.descriptionWrapper}>
        {textConsts.unMerge}

        {item.boxes.map((box, index) => renderProductImage(box, index))}
      </Typography>
    </React.Fragment>
  )
  const taskReceiveDescription = () => (
    <Typography>
      <Typography className={classNames.descriptionWrapper}>
        {textConsts.receive}
        {item.boxes.map((box, index) => renderProductImage(box, index))}
      </Typography>
    </Typography>
  )

  const renderHistoryItem = () => {
    switch (item.operationType) {
      case 'merge':
        return (
          <React.Fragment>
            <TableCell>{textConsts.tasks}</TableCell>
            <TableCell>{taskMergeDescription()}</TableCell>
            <TableCell>
              <ErrorButton onClick={() => onCancelMergeBoxes(item.boxes[0]._id)}>{textConsts.cancelBtn}</ErrorButton>
            </TableCell>
          </React.Fragment>
        )

      case 'split':
        return (
          <React.Fragment>
            <TableCell>{textConsts.tasks}</TableCell>
            <TableCell>{taskDivideDescription()}</TableCell>
            <TableCell>
              <ErrorButton onClick={() => onCancelSplitBoxes(item.boxes[0]._id)}>{textConsts.cancelBtn}</ErrorButton>
            </TableCell>
          </React.Fragment>
        )
      case 'receive':
        return (
          <React.Fragment>
            <TableCell>{textConsts.tasks}</TableCell>
            <TableCell>{taskReceiveDescription()}</TableCell>
          </React.Fragment>
        )
    }
  }

  return (
    <TableRow>
      <TableCell className={classNames.centerTextCell}>{formatDateTime(item.createDate)}</TableCell>
      {renderHistoryItem()}
    </TableRow>
  )
}
