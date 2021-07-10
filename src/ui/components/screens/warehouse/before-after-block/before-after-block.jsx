import React from 'react'

import {Divider, Typography, Paper, Checkbox, Chip} from '@material-ui/core'
import {observer} from 'mobx-react'
import Carousel from 'react-material-ui-carousel'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {Input} from '@components/input'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './before-after-block.style'
import {BoxItemCard} from './box-item-card'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseBeforeAfterBlock

export const BeforeAfterBlock = observer(
  ({incomingBoxes, desiredBoxes, onSetBarcode, onEditBox, isEdit = true, tmpBarCode}) => {
    const classNames = useClassNames()

    const onClickEditBox = box => {
      onEditBox(box)
    }

    const Box = ({box, isNewBox = false, isCurrentBox = false}) => (
      <Paper className={(classNames.box, classNames.mainPaper)}>
        <Typography className={classNames.boxTitle}>{`${textConsts.boxNum} ${box._id}`}</Typography>
        <div className={classNames.itemsWrapper}>
          {box.items.map((item, index) => (
            <div key={`boxItem_${box.items[0].product?._id}_${index}`}>
              <BoxItemCard item={item} index={index} />
            </div>
          ))}
        </div>
        {isCurrentBox && (
          <Paper>
            <Typography>{textConsts.material}</Typography>
            <Input className={classNames.inputText} value={box.items[0].product?.material} disabled={!isEdit} />
          </Paper>
        )}

        <Paper className={classNames.chipWrapper}>
          <Typography className={classNames.subTitle}>{textConsts.shippingLabel}</Typography>
          <Chip
            disabled={!isEdit}
            classes={{
              root: classNames.orderChip,
              clickable: classNames.orderChipHover,
              deletable: classNames.orderChipHover,
              deleteIcon: classNames.orderChipIcon,
            }}
            size="small"
            label={tmpBarCode ? tmpBarCode : textConsts.setShippingLabel}
            onClick={onSetBarcode}
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
          <Paper className={classNames.bottomBlockWrapper}>
            <Field
              oneLine
              containerClasses={classNames.field}
              label={textConsts.codeCheck}
              inputComponent={<Checkbox />}
            />

            {box.images?.length ? (
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
            ) : undefined}
            <div className={classNames.editBtnWrapper}>
              {isEdit && (
                <Button className={classNames.editBtn} onClick={() => onClickEditBox(box)}>
                  {textConsts.editBtn}
                </Button>
              )}
            </div>
          </Paper>
        )}
      </Paper>
    )

    const CurrentBox = ({currentBoxes}) => (
      <div className={classNames.currentBox}>
        <Typography className={classNames.sectionTitle}>{textConsts.incom}</Typography>
        {currentBoxes && currentBoxes.map((box, boxIndex) => <Box key={boxIndex} isCurrentBox box={box} />)}
      </div>
    )

    const NewBoxes = ({newBoxes}) => (
      <div className={classNames.newBoxes}>
        <Typography className={classNames.sectionTitle}>{textConsts.newBoxes}</Typography>
        {newBoxes.map((box, boxIndex) => (
          <Box key={boxIndex} isNewBox box={box} />
        ))}
      </div>
    )

    return (
      <Paper className={classNames.boxesWrapper}>
        <CurrentBox currentBoxes={incomingBoxes} />

        <Divider flexItem className={classNames.divider} orientation="vertical" />

        <NewBoxes newBoxes={desiredBoxes} />
      </Paper>
    )
  },
)
