import React, {useEffect, useState} from 'react'

import {Container, Divider, Typography, useTheme, useMediaQuery, Paper, TableRow, TableCell} from '@material-ui/core'

import {OrderStatusByCode, OrderStatus, OrderStatusByKey} from '@constants/order-status'
import {CLIENT_WAREHOUSE_HEAD_CELLS} from '@constants/table-head-cells'
import {texts} from '@constants/texts'
import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {Button} from '@components/buttons/button'
import {ErrorButton} from '@components/buttons/error-button'
import {Table} from '@components/table'
import {WarehouseBodyRow} from '@components/table-rows/warehouse'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

import {DeliveryParameters} from './delivery-parameters'
import {ExtraOrderInfo} from './extra-order-info'
import {LeftPanel} from './left-panel'
import {useClassNames} from './order-content.style'

const textConsts = getLocalizedTexts(texts, 'ru').orderContent

const MEDIA_SCALE_POINTS = '1812'

export const OrderContent = ({order, boxes, history, onClickCancelOrder, volumeWeightCoefficient}) => {
  const classNames = useClassNames()

  const [collapsed, setCollapsed] = useState(false)
  const theme = useTheme()
  const narrow = useMediaQuery(theme.breakpoints.down(MEDIA_SCALE_POINTS))

  const goBack = () => {
    history.goBack()
  }

  const [headCells, setHeadCells] = useState(CLIENT_WAREHOUSE_HEAD_CELLS)

  const renderHeadRow = () => (
    <TableRow>
      {headCells.map((item, index) => (
        <TableCell key={index}>{item.label}</TableCell>
      ))}
    </TableRow>
  )

  useEffect(() => {
    setHeadCells(CLIENT_WAREHOUSE_HEAD_CELLS)
  }, [SettingsModel.languageTag])

  return (
    <Paper>
      <Container disableGutters maxWidth={false}>
        <div>
          <div className={classNames.orderContainer}>
            <Typography className={classNames.containerTitle}>{OrderStatusByCode[order.status]}</Typography>

            <div className={classNames.orderNumWrapper}>
              <Typography className={classNames.orderNum}>{t(TranslationKey['Order number'])}</Typography>
              <Typography className={classNames.titleSpan}>{`№ ${order.id}`}</Typography>
            </div>

            <div className={classNames.orderPriceWrapper}>
              <Typography className={classNames.orderPrice}>{t(TranslationKey['Order amount'])}</Typography>
              <Typography className={classNames.titleSpan}>{toFixedWithDollarSign(order.totalPrice, 2)}</Typography>
            </div>
          </div>

          <Divider orientation={'horizontal'} />

          <div className={classNames.panelsWrapper}>
            <LeftPanel order={order} collapsed={collapsed} narrow={narrow} setCollapsed={setCollapsed} />

            <DeliveryParameters order={order} />

            <ExtraOrderInfo order={order} />
          </div>

          <Divider orientation={'horizontal'} />

          <div className={classNames.btnsWrapper}>
            {order.status === OrderStatusByKey[OrderStatus.READY_TO_PROCESS] && onClickCancelOrder && (
              <ErrorButton className={classNames.cancelBtn} onClick={onClickCancelOrder}>
                {textConsts.cancelBtn}
              </ErrorButton>
            )}

            <Button
              disableElevation
              className={classNames.goBackBtn}
              color="primary"
              variant="contained"
              onClick={() => goBack()}
            >
              {t(TranslationKey.Back)}
            </Button>
          </div>

          <div className={classNames.tableWrapper}>
            <Typography className={classNames.tableText}>{t(TranslationKey['Boxes to order'])}</Typography>
            {boxes.length > 0 ? (
              <Table
                rowsOnly
                data={boxes}
                BodyRow={WarehouseBodyRow}
                renderHeadRow={renderHeadRow()}
                mainProductId={order.product._id}
                volumeWeightCoefficient={volumeWeightCoefficient}
              />
            ) : (
              <Typography className={classNames.noBoxesText}>{t(TranslationKey['No boxes...'])}</Typography>
            )}
          </div>
        </div>
      </Container>
    </Paper>
  )
}
