import { Tooltip, Typography } from 'antd'
import { FC, memo } from 'react'
import { IoWarningOutline } from 'react-icons/io5'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomImage } from '@components/shared/custom-image'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import { useHover } from '@hooks/use-hover'

import { useStyles } from './product-cell.style'

const { Text: AntText, Link } = Typography

interface ProductCellProps {
  asin?: string
  image?: string
  title?: string
  sku?: string
  quantity?: number
  superbox?: number
  errorMessage?: string
  errorDescription?: string
  isCell?: boolean
}

export const ProductCell: FC<ProductCellProps> = memo(props => {
  const { image, title, asin, sku, quantity, superbox, errorMessage, errorDescription, isCell = true } = props

  const { classes: styles, cx, theme } = useStyles()
  const hoverAsin = useHover()
  const hoverSku = useHover()

  const renderTextCell = (text: string, rows: number) => (
    <Text copyable={false} rows={rows} text={text} className={cx(styles.text, { [styles.fixWidth]: isErrorText })} />
  )

  const notAsinAndSku = !asin && !sku
  const isErrorText = !!errorMessage || !!errorDescription

  return (
    <div className={cx(styles.root, { [styles.cell]: isCell })}>
      {title && !notAsinAndSku ? renderTextCell(title, 1) : null}

      <div className={styles.flexRow}>
        <CustomImage width={32} height={32} src={image} maskClassName={styles.mask} />

        <div className={styles.flexColumn}>
          {notAsinAndSku && title ? (
            renderTextCell(title, 2)
          ) : (
            <>
              {asin ? (
                <Link
                  {...hoverAsin[1]}
                  ellipsis
                  target="_blank"
                  copyable={hoverAsin[0] && !!asin}
                  href={`https://www.amazon.com/dp/${asin}`}
                  className={cx(styles.text, { [styles.fixWidth]: isErrorText })}
                  onClick={e => e.stopPropagation()}
                >
                  {asin}
                </Link>
              ) : null}

              {sku ? (
                <AntText
                  {...hoverSku[1]}
                  ellipsis
                  copyable={hoverSku[0] && !!sku}
                  type="secondary"
                  className={cx(styles.text, { [styles.fixWidth]: isErrorText })}
                >
                  {sku}
                </AntText>
              ) : null}
            </>
          )}
        </div>
      </div>

      <div className={styles.flexRow}>
        {superbox && superbox > 1 ? (
          <AntText copyable={false} className={cx(styles.text, styles.superbox)}>
            {`SB x ${superbox}`}
          </AntText>
        ) : null}

        {quantity ? (
          <AntText copyable={false} className={styles.text}>
            {`${t(TranslationKey.qty)}: ${quantity}`}
          </AntText>
        ) : null}
      </div>

      {isErrorText ? (
        <Tooltip
          destroyTooltipOnHide
          overlayInnerStyle={{ width: 'max-content' }}
          color={theme.palette.background.general}
          title={
            <>
              <p className={styles.warningText}>{errorMessage}</p>
              <p className={styles.warningText}>{errorDescription}</p>
            </>
          }
        >
          <IoWarningOutline size={18} color={theme.palette.text.red} className={styles.warning} />
        </Tooltip>
      ) : null}
    </div>
  )
})
