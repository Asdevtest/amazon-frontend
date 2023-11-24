import { memo } from 'react'

import DeleteIcon from '@material-ui/icons/Delete'
import { IconButton, TableCell, TableRow, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value'
import { Input } from '@components/shared/input'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { shortAsin, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from '../receive-box-modal.style'

export const TableBodyBoxRow = memo(({ item, handlers }) => {
  const { classes: classNames, cx } = useClassNames()

  return (
    <TableRow className={classNames.row}>
      <TableCell className={classNames.standartCell}>
        {item.items.map((el, i) => (
          <div key={i} className={classNames.descriptionWrapper}>
            <img className={classNames.img} src={getAmazonImageUrl(el?.product.images[0])} />

            <div>
              <Typography className={classNames.title}>{i + 1 + '. ' + el.product.amazonTitle}</Typography>

              <div className={classNames.asinWrapper}>
                <Typography className={classNames.orderText}>
                  <span className={classNames.unitsText}>{t(TranslationKey.ASIN) + ': '}</span>
                  {el?.product?.asin ? (
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={`https://www.amazon.com/dp/${el?.product?.asin}`}
                      className={classNames.normalizeLink}
                    >
                      <span className={classNames.linkSpan}>{shortAsin(el?.product?.asin)}</span>
                    </a>
                  ) : (
                    <span className={classNames.typoSpan}>{t(TranslationKey.Missing)}</span>
                  )}
                </Typography>
                {el?.product?.asin ? <CopyValue text={el?.product?.asin} /> : null}
              </div>

              <div className={classNames.unitsWrapper}>
                <Typography className={classNames.unitsText}>{t(TranslationKey.Quantity) + ':'}</Typography>
                <Input
                  classes={{
                    root: cx(classNames.inputWrapper, {
                      [classNames.error]: !el.amount || el.amount === '0',
                    }),
                    input: classNames.input,
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

      <TableCell className={classNames.standartCell}>
        <Input
          classes={{
            root: cx(classNames.inputWrapper, {
              [classNames.error]: !item.amount || item.amount === '0',
            }),
            input: classNames.input,
          }}
          inputProps={{ maxLength: 6 }}
          value={item.amount}
          onChange={e => handlers.onChangeFieldInput(e, item._id, 'amount')}
        />
      </TableCell>

      <TableCell className={classNames.standartCell}>
        <Input
          disabled
          classes={{ root: classNames.inputWrapper, input: classNames.input }}
          // value={item.items[0].amount * item.amount}
          value={item.items.reduce((ac, cur) => (ac += cur.amount), 0) * item.amount}
        />
      </TableCell>

      <TableCell className={classNames.standartCell}>
        <div className={classNames.sizesCell}>
          <div className={classNames.sizeWrapper}>
            <Typography>{t(TranslationKey.L) + ': '}</Typography>
            <Input
              classes={{
                root: cx(classNames.inputWrapper, {
                  [classNames.error]: !item.lengthCmWarehouse || item.lengthCmWarehouse === '0',
                }),
                input: classNames.input,
              }}
              inputProps={{ maxLength: 6 }}
              value={item.lengthCmWarehouse}
              onChange={e => handlers.onChangeFieldInput(e, item._id, 'lengthCmWarehouse')}
            />
          </div>

          <div className={classNames.sizeWrapper}>
            <Typography>{t(TranslationKey.W) + ': '}</Typography>
            <Input
              classes={{
                root: cx(classNames.inputWrapper, {
                  [classNames.error]: !item.widthCmWarehouse || item.widthCmWarehouse === '0',
                }),
                input: classNames.input,
              }}
              inputProps={{ maxLength: 6 }}
              value={item.widthCmWarehouse}
              onChange={e => handlers.onChangeFieldInput(e, item._id, 'widthCmWarehouse')}
            />
          </div>
          <div className={classNames.sizeWrapper}>
            <Typography>{t(TranslationKey.H) + ': '}</Typography>
            <Input
              classes={{
                root: cx(classNames.inputWrapper, {
                  [classNames.error]: !item.heightCmWarehouse || item.heightCmWarehouse === '0',
                }),
                input: classNames.input,
              }}
              inputProps={{ maxLength: 6 }}
              value={item.heightCmWarehouse}
              onChange={e => handlers.onChangeFieldInput(e, item._id, 'heightCmWarehouse')}
            />
          </div>
        </div>
      </TableCell>
      <TableCell className={classNames.standartCell}>
        <Input
          classes={{
            root: cx(classNames.inputWrapper, {
              [classNames.error]: !item.weighGrossKgWarehouse || item.weighGrossKgWarehouse === '0',
            }),
            input: classNames.input,
          }}
          inputProps={{ maxLength: 6 }}
          value={item.weighGrossKgWarehouse}
          onChange={e => handlers.onChangeFieldInput(e, item._id, 'weighGrossKgWarehouse')}
        />
      </TableCell>
      <TableCell className={classNames.standartCell}>
        <Input
          disabled
          classes={{ root: classNames.inputWrapper, input: classNames.input }}
          value={toFixed(item.volumeWeightKgWarehouse, 3)}
        />
      </TableCell>
      <TableCell className={classNames.standartCell}>
        <Input
          disabled
          classes={{ root: classNames.inputWrapper, input: classNames.input }}
          value={toFixed(item.weightFinalAccountingKgWarehouse, 3)}
        />
      </TableCell>

      <TableCell>
        <Button onClick={() => handlers.onAddImages(item._id)}>{t(TranslationKey.Photos)}</Button>
      </TableCell>

      <TableCell>
        <Button onClick={() => handlers.addDouble(item._id)}>
          <img src="/assets/icons/plus.svg" />
        </Button>
      </TableCell>

      <TableCell>
        <IconButton onClick={() => handlers.onRemoveBox(item._id)}>
          <DeleteIcon className={classNames.deleteBtn} />
        </IconButton>
      </TableCell>
    </TableRow>
  )
})
