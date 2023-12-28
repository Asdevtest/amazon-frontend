import { memo } from 'react'

import DeleteIcon from '@material-ui/icons/Delete'
import { IconButton, Typography } from '@mui/material'

import { maxLengthInputInSizeBox } from '@constants/configs/sizes-settings'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Input } from '@components/shared/input'
import { Table } from '@components/shared/table'
import { TableHeadRow } from '@components/table/table-rows/batches-view/table-head-row'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getShortenStringIfLongerThanCount, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './new-boxes.style'

import { WAREHOUSE_RECEIVE_HEAD_CELLS } from '../../receive-box-modal.constant'
import { TableBodyBoxRow } from '../table-row/table-row'

export const NewBoxes = memo(
  ({ newBoxes, onChangeQtyInput, onChangeFieldInput, onRemoveBox, onAddImages, addDouble }) => {
    const { classes: styles, cx } = useStyles()

    const renderHeadRow = () => <TableHeadRow headCells={WAREHOUSE_RECEIVE_HEAD_CELLS(styles)} />

    const isNormalLength = length => !Number(length) || Number(length) > maxLengthInputInSizeBox

    const isNormalWidth = width => !Number(width) || Number(width) > maxLengthInputInSizeBox

    const isNormalHeight = height => !Number(height) || Number(height) > maxLengthInputInSizeBox

    return (
      <div className={styles.newBoxes}>
        <div className={styles.sectionTitleWrapper}>
          <p className={styles.sectionTitle}>{t(TranslationKey['New boxes'])}</p>

          <p className={cx(styles.sectionTitle, styles.redText)}>
            {t(TranslationKey['A photo of the Transperensy Code sticker'])}
          </p>
        </div>
        <div className={styles.tableWrapper}>
          <Table
            rowsOnly
            data={newBoxes}
            BodyRow={TableBodyBoxRow}
            renderHeadRow={renderHeadRow()}
            rowsHandlers={{ onChangeQtyInput, onChangeFieldInput, onRemoveBox, onAddImages, addDouble }}
          />
        </div>

        {newBoxes.map((item, index) => (
          <div key={index} className={styles.tableWrapperMobile}>
            <div className={styles.boxesTitleWrapper}>
              <Typography className={styles.boxesTitle}>{t(TranslationKey.Box)}</Typography>
              <IconButton onClick={() => onRemoveBox(item._id)}>
                <DeleteIcon className={styles.deleteBtn} />
              </IconButton>
            </div>

            <div>
              {item.items.map((el, i) => (
                <div key={i} className={styles.descriptionWrapper}>
                  <img className={styles.img} src={getAmazonImageUrl(el.product.images[0])} />
                  <div>
                    <Typography className={styles.title}>
                      {getShortenStringIfLongerThanCount(el.product.amazonTitle, 50)}
                    </Typography>

                    <div className={styles.unitsWrapper}>
                      <Typography className={styles.unitsText}>{t(TranslationKey.Quantity) + ':'}</Typography>

                      <Input
                        classes={{
                          root: cx(styles.inputWrapper, {
                            [styles.error]: !el.amount || el.amount === 0,
                          }),
                          input: styles.input,
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

            <div className={styles.tableRow}>
              <Typography className={styles.boxTitleMobile}>{t(TranslationKey['Boxes in group'])}</Typography>
              <Input
                classes={{
                  root: cx(styles.inputWrapper, {
                    [styles.error]: !item.amount || item.amount === '0',
                  }),
                  input: styles.input,
                }}
                inputProps={{ maxLength: 6 }}
                value={item.amount}
                onChange={e => onChangeFieldInput(e, item._id, 'amount')}
              />
            </div>

            <div className={styles.tableRow}>
              <Typography className={styles.boxTitleMobile}>{t(TranslationKey.Total)}</Typography>
              <Input
                disabled
                classes={{ root: styles.inputWrapper, input: styles.input }}
                value={item.items[0].amount * item.amount}
              />
            </div>

            <div className={styles.tableRow}>
              <Typography className={styles.boxTitleMobile}>{t(TranslationKey.Sizes)}</Typography>
              <div className={styles.sizeWrapper}>
                <Typography className={styles.sizeTitle}>{t(TranslationKey.L) + ': '}</Typography>

                <Input
                  classes={{
                    input: styles.input,
                    root: cx(styles.inputWrapper, {
                      [styles.error]: isNormalLength(item.length),
                    }),
                  }}
                  inputProps={{ maxLength: 6 }}
                  value={item.lengthCmWarehouse}
                  onChange={e => onChangeFieldInput(e, item._id, 'lengthCmWarehouse')}
                />
              </div>
              <div className={styles.sizeWrapper}>
                <Typography className={styles.sizeTitle}>{t(TranslationKey.W) + ': '}</Typography>
                <Input
                  classes={{
                    root: cx(styles.inputWrapper, {
                      [styles.error]: isNormalWidth(item.widthCmWarehouse),
                    }),
                    input: styles.input,
                  }}
                  inputProps={{ maxLength: 6 }}
                  value={item.widthCmWarehouse}
                  onChange={e => onChangeFieldInput(e, item._id, 'widthCmWarehouse')}
                />
              </div>
              <div className={styles.sizeWrapper}>
                <Typography className={styles.sizeTitle}>{t(TranslationKey.H) + ': '}</Typography>
                <Input
                  classes={{
                    root: cx(styles.inputWrapper, {
                      [styles.error]: isNormalHeight(item.heightCmWarehouse),
                    }),
                    input: styles.input,
                  }}
                  inputProps={{ maxLength: 6 }}
                  value={item.heightCmWarehouse}
                  onChange={e => onChangeFieldInput(e, item._id, 'heightCmWarehouse')}
                />
              </div>
            </div>

            <div className={styles.tableRow}>
              <Typography className={styles.boxTitleMobile}>{t(TranslationKey['Weight, kg'])}</Typography>
              <Input
                classes={{
                  root: cx(styles.inputWrapper, {
                    [styles.error]: !item.weighGrossKgWarehouse || item.weighGrossKgWarehouse === '0',
                  }),
                  input: styles.input,
                }}
                inputProps={{ maxLength: 6 }}
                value={item.weighGrossKgWarehouse}
                onChange={e => onChangeFieldInput(e, item._id, 'weighGrossKgWarehouse')}
              />
            </div>

            <div className={styles.tableRow}>
              <Typography className={styles.boxTitleMobile}>{t(TranslationKey['Volume weight, kg'])}</Typography>
              <Input
                disabled
                classes={{ root: styles.inputWrapper, input: styles.input }}
                value={toFixed(item.volumeWeightKgWarehouse, 3)}
              />
            </div>

            <div className={styles.tableRow}>
              <Typography className={styles.boxTitleMobile}>{t(TranslationKey['Final weight, kg'])}</Typography>
              <Input
                disabled
                classes={{ root: styles.inputWrapper, input: styles.input }}
                value={toFixed(item.weightFinalAccountingKgWarehouse, 3)}
              />
            </div>

            <div className={styles.footerBtnsWrapper}>
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
