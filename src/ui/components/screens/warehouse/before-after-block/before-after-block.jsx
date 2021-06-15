import React from 'react'

import {Divider, Typography, Paper, Checkbox, Chip} from '@material-ui/core'
import clsx from 'clsx'
import Carousel from 'react-material-ui-carousel'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {Input} from '@components/input'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './before-after-block.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseBeforeAfterBlock

export const BeforeAfterBlock = ({
  incomingBoxes,
  desiredBoxes,
  onSetBarcode,
  onEditBox,
  onPickupBox,
  isEdit = true,
}) => {
  const classNames = useClassNames()

  const onClickEditBox = box => {
    onEditBox(box)
    onPickupBox(box.boxId)
  }

  const Box = ({box, isNewBox = false, isCurrentBox = false}) => (
    <Paper className={(classNames.box, classNames.mainPaper)}>
      <Typography className={classNames.boxTitle}>
        {textConsts.boxNum} {box.boxId}
      </Typography>
      <Paper className={classNames.order}>
        <img className={classNames.img} src={box.product.img} />
        <Typography className={classNames.title}>{box.product.amazonTitle}</Typography>
        <Typography className={classNames.subTitle}>{textConsts.count}</Typography>
        <Input readOnly classes={{root: classNames.inputWrapper, input: classNames.input}} value={box.amount} />
      </Paper>
      {isCurrentBox && (
        <Paper>
          <Typography>{textConsts.material}</Typography>
          <Input className={classNames.inputText} value={box.product.material} disabled={!isEdit} />
        </Paper>
      )}

      <Paper className={classNames.chipWrapper}>
        <Typography className={classNames.subTitle}>{textConsts.shippingLabel}</Typography>
        <Chip
          disabled={!isEdit}
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
      </Paper>

      <Paper className={classNames.demensionsWrapper}>
        <Typography className={classNames.categoryTitle}>{textConsts.demensions}</Typography>
        <Typography>
          {textConsts.length}
          {box.lengthCmWarehouse}
        </Typography>
        <Typography>
          {textConsts.width}
          {box.widthCmWarehouse}
        </Typography>
        <Typography>
          {textConsts.height}
          {box.heightCmWarehouse}
        </Typography>
        <Typography>
          {textConsts.weight}
          {box.volumeWeightKgWarehouse}
        </Typography>
        <Typography>
          {textConsts.finalWeight}
          {box.weightFinalAccountingKgWarehouse}
        </Typography>
      </Paper>

      {isNewBox && (
        <Paper>
          <Field containerClasses={classNames.field} label={textConsts.codeCheck} inputComponent={<Checkbox />} />

          <Paper className={classNames.rightCardWrapper}>
            <Typography className={classNames.categoryTitle}>{textConsts.photos}</Typography>

            <Carousel autoPlay timeout={1000} animation="fade">
              {box.images &&
                box.images.map((el, index) => (
                  <div key={index}>
                    <img alt="" className={classNames.imgBox} src={el} />
                  </div>
                ))}
            </Carousel>
          </Paper>
          {isEdit && (
            <Button className={classNames.editBtn} onClick={() => onClickEditBox(box)}>
              {textConsts.editBtn}
            </Button>
          )}
        </Paper>
      )}
    </Paper>
  )

  const CurrentBox = ({currentBoxes}) => (
    <Paper className={classNames.currentBox}>
      <Typography className={classNames.sectionTitle}>{textConsts.incom}</Typography>
      {currentBoxes.map((box, boxIndex) => (
        <Box key={boxIndex} isCurrentBox box={box} />
      ))}
    </Paper>
  )

  const NewBoxes = ({newBoxes}) => (
    <Paper className={classNames.newBoxes}>
      <Typography className={classNames.sectionTitle}>{textConsts.newBoxes}</Typography>
      {newBoxes.map((box, boxIndex) => (
        <Box key={boxIndex} isNewBox box={box} />
      ))}
    </Paper>
  )

  return (
    <Paper className={classNames.boxesWrapper}>
      <CurrentBox currentBoxes={incomingBoxes} />

      <Divider flexItem className={classNames.divider} orientation="vertical" />

      <NewBoxes newBoxes={desiredBoxes} />
    </Paper>
  )
}
