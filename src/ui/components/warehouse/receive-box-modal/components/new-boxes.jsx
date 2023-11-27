import { memo } from 'react'

import DeleteIcon from '@material-ui/icons/Delete'
import { IconButton, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Input } from '@components/shared/input'
import { Table } from '@components/shared/table'
import { TableHeadRow } from '@components/table/table-rows/batches-view/table-head-row'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getShortenStringIfLongerThanCount, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from '../receive-box-modal.style'

import { WAREHOUSE_RECEIVE_HEAD_CELLS } from '../receive-box-modal.constant'

import { TableBodyBoxRow } from './table-row'

export const NewBoxes = memo(
  ({ newBoxes, onChangeQtyInput, onChangeFieldInput, onRemoveBox, onAddImages, addDouble }) => {
    const { classes: classNames, cx } = useClassNames()

    const renderHeadRow = () => <TableHeadRow headCells={WAREHOUSE_RECEIVE_HEAD_CELLS(classNames)} />

    return (
      <div className={classNames.newBoxes}>
        <Typography className={classNames.sectionTitle}>{t(TranslationKey['New boxes'])}</Typography>
        <div className={classNames.tableWrapper}>
          <Table
            rowsOnly
            data={newBoxes}
            BodyRow={TableBodyBoxRow}
            renderHeadRow={renderHeadRow()}
            rowsHandlers={{ onChangeQtyInput, onChangeFieldInput, onRemoveBox, onAddImages, addDouble }}
          />
        </div>

        {newBoxes.map((item, index) => (
          <div key={index} className={classNames.tableWrapperMobile}>
            <div className={classNames.boxesTitleWrapper}>
              <Typography className={classNames.boxesTitle}>{t(TranslationKey.Box)}</Typography>
              <IconButton onClick={() => onRemoveBox(item._id)}>
                <DeleteIcon className={classNames.deleteBtn} />
              </IconButton>
            </div>
            <div>
              {item.items.map((el, i) => (
                <div key={i} className={classNames.descriptionWrapper}>
                  <img className={classNames.img} src={getAmazonImageUrl(el.product.images[0])} />
                  <div>
                    <Typography className={classNames.title}>
                      {getShortenStringIfLongerThanCount(el.product.amazonTitle, 50)}
                    </Typography>

                    <div className={classNames.unitsWrapper}>
                      <Typography className={classNames.unitsText}>{t(TranslationKey.Quantity) + ':'}</Typography>

                      <Input
                        classes={{
                          root: cx(classNames.inputWrapper, {
                            [classNames.error]: !el.amount || el.amount === 0,
                          }),
                          input: classNames.input,
                        }}
                        inputProps={{ maxLength: 6 }}
                        value={el.amount}
                        onChange={e => onChangeQtyInput(e, item._id, el.order)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={classNames.tableRow}>
              <Typography className={classNames.boxTitleMobile}>{t(TranslationKey['Boxes in group'])}</Typography>
              <Input
                classes={{
                  root: cx(classNames.inputWrapper, {
                    [classNames.error]: !item.amount || item.amount === '0',
                  }),
                  input: classNames.input,
                }}
                inputProps={{ maxLength: 6 }}
                value={item.amount}
                onChange={e => onChangeFieldInput(e, item._id, 'amount')}
              />
            </div>

            <div className={classNames.tableRow}>
              <Typography className={classNames.boxTitleMobile}>{t(TranslationKey.Total)}</Typography>
              <Input
                disabled
                classes={{ root: classNames.inputWrapper, input: classNames.input }}
                value={item.items[0].amount * item.amount}
              />
            </div>
            <div className={classNames.tableRow}>
              <Typography className={classNames.boxTitleMobile}>{t(TranslationKey.Sizes)}</Typography>
              <div className={classNames.sizeWrapper}>
                <Typography className={classNames.sizeTitle}>{t(TranslationKey.L) + ': '}</Typography>

                <Input
                  classes={{
                    root: cx(classNames.inputWrapper, {
                      [classNames.error]: !item.lengthCmWarehouse || item.lengthCmWarehouse === '0',
                    }),
                    input: classNames.input,
                  }}
                  inputProps={{ maxLength: 6 }}
                  value={item.lengthCmWarehouse}
                  onChange={e => onChangeFieldInput(e, item._id, 'lengthCmWarehouse')}
                />
              </div>
              <div className={classNames.sizeWrapper}>
                <Typography className={classNames.sizeTitle}>{t(TranslationKey.W) + ': '}</Typography>
                <Input
                  classes={{
                    root: cx(classNames.inputWrapper, {
                      [classNames.error]: !item.widthCmWarehouse || item.widthCmWarehouse === '0',
                    }),
                    input: classNames.input,
                  }}
                  inputProps={{ maxLength: 6 }}
                  value={item.widthCmWarehouse}
                  onChange={e => onChangeFieldInput(e, item._id, 'widthCmWarehouse')}
                />
              </div>
              <div className={classNames.sizeWrapper}>
                <Typography className={classNames.sizeTitle}>{t(TranslationKey.H) + ': '}</Typography>
                <Input
                  classes={{
                    root: cx(classNames.inputWrapper, {
                      [classNames.error]: !item.heightCmWarehouse || item.heightCmWarehouse === '0',
                    }),
                    input: classNames.input,
                  }}
                  inputProps={{ maxLength: 6 }}
                  value={item.heightCmWarehouse}
                  onChange={e => onChangeFieldInput(e, item._id, 'heightCmWarehouse')}
                />
              </div>
            </div>
            <div className={classNames.tableRow}>
              <Typography className={classNames.boxTitleMobile}>{t(TranslationKey['Weight, kg'])}</Typography>
              <Input
                classes={{
                  root: cx(classNames.inputWrapper, {
                    [classNames.error]: !item.weighGrossKgWarehouse || item.weighGrossKgWarehouse === '0',
                  }),
                  input: classNames.input,
                }}
                inputProps={{ maxLength: 6 }}
                value={item.weighGrossKgWarehouse}
                onChange={e => onChangeFieldInput(e, item._id, 'weighGrossKgWarehouse')}
              />
            </div>
            <div className={classNames.tableRow}>
              <Typography className={classNames.boxTitleMobile}>{t(TranslationKey['Volume weight, kg'])}</Typography>
              <Input
                disabled
                classes={{ root: classNames.inputWrapper, input: classNames.input }}
                value={toFixed(item.volumeWeightKgWarehouse, 3)}
              />
            </div>
            <div className={classNames.tableRow}>
              <Typography className={classNames.boxTitleMobile}>{t(TranslationKey['Final weight, kg'])}</Typography>
              <Input
                disabled
                classes={{ root: classNames.inputWrapper, input: classNames.input }}
                value={toFixed(item.weightFinalAccountingKgWarehouse, 3)}
              />
            </div>

            <div className={classNames.footerBtnsWrapper}>
              <Button onClick={() => addDouble(item._id)}>
                <img src="/assets/icons/plus.svg" />
              </Button>

              <Button onClick={() => onAddImages(item._id)}>{t(TranslationKey.Photos)}</Button>
            </div>
          </div>
        ))}
      </div>
    )
  },
)
