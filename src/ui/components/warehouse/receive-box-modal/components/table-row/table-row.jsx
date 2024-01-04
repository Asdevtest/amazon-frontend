import { memo } from 'react'

import DeleteIcon from '@material-ui/icons/Delete'
import { IconButton, TableCell, TableRow, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value'
import { Input } from '@components/shared/input'
import { PlusIcon } from '@components/shared/svg-icons'

import { checkIsValidBoxSize } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { shortAsin, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './table-row.style'

export const TableBodyBoxRow = memo(({ item, handlers }) => {
  const { classes: styles, cx } = useStyles()

  return (
    <TableRow className={styles.row}>
      <TableCell className={styles.standartCell}>
        {item.items.map((el, i) => (
          <div key={i} className={styles.descriptionWrapper}>
            <img className={styles.img} src={getAmazonImageUrl(el?.product.images[0])} />

            <div>
              <Typography className={styles.title}>{i + 1 + '. ' + el.product.amazonTitle}</Typography>

              <div className={styles.asinWrapper}>
                <Typography className={styles.orderText}>
                  <span className={styles.unitsText}>{t(TranslationKey.ASIN) + ': '}</span>
                  {el?.product?.asin ? (
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={`https://www.amazon.com/dp/${el?.product?.asin}`}
                      className={styles.normalizeLink}
                    >
                      <span className={styles.linkSpan}>{shortAsin(el?.product?.asin)}</span>
                    </a>
                  ) : (
                    <span className={styles.typoSpan}>{t(TranslationKey.Missing)}</span>
                  )}
                </Typography>
                {el?.product?.asin ? <CopyValue text={el?.product?.asin} /> : null}
              </div>

              <div className={styles.unitsWrapper}>
                <Typography className={styles.unitsText}>{t(TranslationKey.Quantity) + ':'}</Typography>
                <Input
                  classes={{
                    root: cx(styles.inputWrapper, {
                      [styles.error]: !el.amount || el.amount === '0',
                    }),
                    input: styles.input,
                  }}
                  inputProps={{ maxLength: 6 }}
                  value={el.amount}
                  onChange={e => handlers.onChangeQtyInput(e, item._id, el.order)}
                />
              </div>
            </div>
          </div>
        ))}
      </TableCell>

      <TableCell className={styles.standartCell}>
        <Input
          classes={{
            root: cx(styles.inputWrapper, {
              [styles.error]: !item.amount || item.amount === '0',
            }),
            input: styles.input,
          }}
          inputProps={{ maxLength: 6 }}
          value={item.amount}
          onChange={e => handlers.onChangeFieldInput(e, item._id, 'amount')}
        />
      </TableCell>

      <TableCell className={styles.standartCell}>
        <Input
          disabled
          classes={{ root: styles.inputWrapper, input: styles.input }}
          // value={item.items[0].amount * item.amount}
          value={item.items.reduce((ac, cur) => (ac += cur.amount), 0) * item.amount}
        />
      </TableCell>

      <TableCell className={styles.standartCell}>
        <div className={styles.sizesCell}>
          <div className={styles.sizeWrapper}>
            <Typography>{t(TranslationKey.L) + ': '}</Typography>
            <Input
              classes={{
                root: cx(styles.inputWrapper, {
                  [styles.error]: checkIsValidBoxSize(item.lengthCmWarehouse),
                }),
                input: styles.input,
              }}
              inputProps={{ maxLength: 6 }}
              value={item.lengthCmWarehouse}
              onChange={e => handlers.onChangeFieldInput(e, item._id, 'lengthCmWarehouse')}
            />
          </div>

          <div className={styles.sizeWrapper}>
            <Typography>{t(TranslationKey.W) + ': '}</Typography>
            <Input
              classes={{
                root: cx(styles.inputWrapper, {
                  [styles.error]: checkIsValidBoxSize(item.widthCmWarehouse),
                }),
                input: styles.input,
              }}
              inputProps={{ maxLength: 6 }}
              value={item.widthCmWarehouse}
              onChange={e => handlers.onChangeFieldInput(e, item._id, 'widthCmWarehouse')}
            />
          </div>
          <div className={styles.sizeWrapper}>
            <Typography>{t(TranslationKey.H) + ': '}</Typography>
            <Input
              classes={{
                root: cx(styles.inputWrapper, {
                  [styles.error]: checkIsValidBoxSize(item.heightCmWarehouse),
                }),
                input: styles.input,
              }}
              inputProps={{ maxLength: 6 }}
              value={item.heightCmWarehouse}
              onChange={e => handlers.onChangeFieldInput(e, item._id, 'heightCmWarehouse')}
            />
          </div>
        </div>
      </TableCell>

      <TableCell className={styles.standartCell}>
        <Input
          classes={{
            root: cx(styles.inputWrapper, {
              [styles.error]: !item.weighGrossKgWarehouse || item.weighGrossKgWarehouse === '0',
            }),
            input: styles.input,
          }}
          inputProps={{ maxLength: 6 }}
          value={item.weighGrossKgWarehouse}
          onChange={e => handlers.onChangeFieldInput(e, item._id, 'weighGrossKgWarehouse')}
        />
      </TableCell>

      <TableCell className={styles.standartCell}>
        <Input
          disabled
          classes={{ root: styles.inputWrapper, input: styles.input }}
          value={toFixed(item.volumeWeightKgWarehouse, 3)}
        />
      </TableCell>

      <TableCell className={styles.standartCell}>
        <Input
          disabled
          classes={{ root: styles.inputWrapper, input: styles.input }}
          value={toFixed(item.weightFinalAccountingKgWarehouse, 3)}
        />
      </TableCell>
      <TableCell>
        <Button onClick={() => handlers.onAddImages(item._id)}>
          {t(TranslationKey.Photos)} {item.tmpImages.length > 0 && `+ ${item.tmpImages.length}`}
        </Button>
      </TableCell>

      <TableCell>
        <Button onClick={() => handlers.addDouble(item._id)}>
          <PlusIcon className={styles.plusIcon} />
        </Button>
      </TableCell>

      <TableCell>
        <IconButton onClick={() => handlers.onRemoveBox(item._id)}>
          <DeleteIcon className={styles.deleteBtn} />
        </IconButton>
      </TableCell>
    </TableRow>
  )
})
