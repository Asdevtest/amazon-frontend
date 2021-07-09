import React from 'react'

import {TableCell, TableRow, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {ErrorButton} from '@components/buttons/error-button'

// import { formatDateTime } from '@utils/date-time'; еще пригодится - там ппц снова ошибка с датой
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './table-body-row.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseTasksBodyRow

export const TableBodyRow = ({item, itemIndex, handlers}) => {
  const classNames = useClassNames()
  const status = item.status

  const onClickResolveBtn = index => {
    handlers.onSelectTaskIndex(index)
    handlers.onTriggerEditTaskModal()
  }

  // const onClickBrowseBtn = (index) => {
  //   handlers.onSelectTaskIndex(index);
  //   handlers.onTriggerBrowseTaskModal();
  // }; пока оставить

  const renderProductImage = (box, key) => (
    <div key={key} className={classNames.imagesWrapper}>
      <Typography className={classNames.imgNum}>{`#${key + 1}`}</Typography>
      {box.items.map((product, productIndex) => (
        <div key={productIndex} className={classNames.imgWrapper}>
          <img alt="placeholder" className={classNames.img} src={getAmazonImageUrl(product.product.images[0])} />
          <Typography className={classNames.imgNum}>{`x ${product.amount}`}</Typography>
        </div>
      ))}
    </div>
  )

  const taskMergeDescription = () => (
    <React.Fragment>
      <Typography>
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

  const renderDescriptionAndActions = () => {
    switch (item.operationType) {
      case 'merge':
        return (
          <React.Fragment>
            <TableCell>{taskMergeDescription()}</TableCell>
            <TableCell>
              <div className={classNames.buttonsWrapper}>
                <Button onClick={() => onClickResolveBtn(itemIndex)}>{textConsts.resolveBtn}</Button>

                <ErrorButton /* onClick={() => onCancelMergeBoxes(item.boxes[0]._id)}*/>
                  {textConsts.cancelBtn}
                </ErrorButton>
              </div>
            </TableCell>
          </React.Fragment>
        )

      case 'split':
        return (
          <React.Fragment>
            <TableCell>{taskDivideDescription()}</TableCell>
            <TableCell>
              <div className={classNames.buttonsWrapper}>
                <Button onClick={() => onClickResolveBtn(itemIndex)}>{textConsts.resolveBtn}</Button>

                <ErrorButton /* onClick={() => onCancelSplitBoxes(item.boxes[0]._id)}*/>
                  {textConsts.cancelBtn}
                </ErrorButton>
              </div>
            </TableCell>
          </React.Fragment>
        )
      case 'receive':
        return (
          <React.Fragment>
            <TableCell>{taskReceiveDescription()}</TableCell>
            <TableCell>{<Button>{textConsts.resolveBtn}</Button>}</TableCell>
          </React.Fragment>
        )
    }
  }

  return (
    <TableRow>
      {/* <TableCell>{item._id}</TableCell>   возможно тут это лишнее? место занимает */}
      {/* <TableCell>{formatDateTime(item.createDate)}</TableCell> */}
      <TableCell>{'Date'}</TableCell>
      <TableCell>{item.operationType}</TableCell>
      {renderDescriptionAndActions()}
      <TableCell>{status ? textConsts.resolved : textConsts.notResolved}</TableCell>
    </TableRow>
  )
}
