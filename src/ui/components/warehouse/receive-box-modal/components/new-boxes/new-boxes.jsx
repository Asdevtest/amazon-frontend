import { memo } from 'react'
import { FiPlus } from 'react-icons/fi'
import { MdDeleteOutline } from 'react-icons/md'

import { IconButton } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { Input } from '@components/shared/input'
import { Table } from '@components/shared/table'
import { TableHeadRow } from '@components/table/table-rows/batches-view/table-head-row'

import { checkIsValidBoxSize } from '@utils/checks'
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

    return (
      <div className={styles.newBoxes}>
        <div className={styles.sectionTitleWrapper}>
          <p className={styles.sectionTitle}>{t(TranslationKey['New boxes'])}</p>

          <p className={cx(styles.sectionTitle, styles.redText)}>
            {t(TranslationKey['A photo of the Transparency Code sticker'])}
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
              <p className={styles.boxesTitle}>{t(TranslationKey.Box)}</p>
              <IconButton onClick={() => onRemoveBox(item._id)}>
                <MdDeleteOutline size={24} className={styles.deleteBtn} />
              </IconButton>
            </div>

            <div>
              {item.items.map((el, i) => (
                <div key={i} className={styles.descriptionWrapper}>
                  <img className={styles.img} src={getAmazonImageUrl(el.product.images[0])} />
                  <div>
                    <p className={styles.title}>{getShortenStringIfLongerThanCount(el.product.amazonTitle, 50)}</p>

                    <div className={styles.unitsWrapper}>
                      <p className={styles.unitsText}>{t(TranslationKey.Quantity) + ':'}</p>

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
              <p className={styles.boxTitleMobile}>{t(TranslationKey['Boxes in group'])}</p>
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
              <p className={styles.boxTitleMobile}>{t(TranslationKey.Total)}</p>
              <Input
                disabled
                classes={{ root: styles.inputWrapper, input: styles.input }}
                value={item.items[0].amount * item.amount}
              />
            </div>

            <div className={styles.tableRow}>
              <p className={styles.boxTitleMobile}>{t(TranslationKey.Sizes)}</p>
              <div className={styles.sizeWrapper}>
                <p className={styles.sizeTitle}>{t(TranslationKey.L) + ': '}</p>

                <Input
                  classes={{
                    input: styles.input,
                    root: cx(styles.inputWrapper, {
                      [styles.error]: checkIsValidBoxSize(item.lengthCmWarehouse),
                    }),
                  }}
                  inputProps={{ maxLength: 6 }}
                  value={item.lengthCmWarehouse}
                  onChange={e => onChangeFieldInput(e, item._id, 'lengthCmWarehouse')}
                />
              </div>
              <div className={styles.sizeWrapper}>
                <p className={styles.sizeTitle}>{t(TranslationKey.W) + ': '}</p>
                <Input
                  classes={{
                    root: cx(styles.inputWrapper, {
                      [styles.error]: checkIsValidBoxSize(item.widthCmWarehouse),
                    }),
                    input: styles.input,
                  }}
                  inputProps={{ maxLength: 6 }}
                  value={item.widthCmWarehouse}
                  onChange={e => onChangeFieldInput(e, item._id, 'widthCmWarehouse')}
                />
              </div>
              <div className={styles.sizeWrapper}>
                <p className={styles.sizeTitle}>{t(TranslationKey.H) + ': '}</p>
                <Input
                  classes={{
                    root: cx(styles.inputWrapper, {
                      [styles.error]: checkIsValidBoxSize(item.heightCmWarehouse),
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
              <p className={styles.boxTitleMobile}>{t(TranslationKey['Weight, kg'])}</p>
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
              <p className={styles.boxTitleMobile}>{t(TranslationKey['Volume weight, kg'])}</p>
              <Input
                disabled
                classes={{ root: styles.inputWrapper, input: styles.input }}
                value={toFixed(item.volumeWeightKgWarehouse, 3)}
              />
            </div>

            <div className={styles.tableRow}>
              <p className={styles.boxTitleMobile}>{t(TranslationKey['Final weight, kg'])}</p>
              <Input
                disabled
                classes={{ root: styles.inputWrapper, input: styles.input }}
                value={toFixed(item.weightFinalAccountingKgWarehouse, 3)}
              />
            </div>

            <div className={styles.footerBtnsWrapper}>
              <CustomButton icon={<FiPlus size={16} />} onClick={() => addDouble(item._id)}></CustomButton>

              <CustomButton onClick={() => onAddImages(item._id)}>{t(TranslationKey.Photos)}</CustomButton>
            </div>
          </div>
        ))}
      </div>
    )
  },
)
