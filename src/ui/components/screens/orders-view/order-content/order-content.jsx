import {Container, Divider, Typography, useTheme, useMediaQuery, Paper, TableRow, TableCell} from '@mui/material'

import React, {useEffect, useState} from 'react'

import {OrderStatusByCode, OrderStatus, OrderStatusByKey, OrderStatusText} from '@constants/order-status'
import {CLIENT_WAREHOUSE_HEAD_CELLS} from '@constants/table-head-cells'
import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {Table} from '@components/table'
import {WarehouseBodyRow} from '@components/table-rows/warehouse'
import {Text} from '@components/text'

import {toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

import {DeliveryParameters} from './delivery-parameters'
import {ExtraOrderInfo} from './extra-order-info'
import {LeftPanel} from './left-panel'
import {useClassNames} from './order-content.style'

const MEDIA_SCALE_POINTS = '1812'

export const OrderContent = ({order, boxes, onClickCancelOrder, volumeWeightCoefficient}) => {
  const {classes: classNames} = useClassNames()

  const [collapsed, setCollapsed] = useState(false)
  const [updatedOrder, setUpdatedOrder] = useState(order)
  const theme = useTheme()
  const narrow = useMediaQuery(theme.breakpoints.down(MEDIA_SCALE_POINTS))

  const [headCells, setHeadCells] = useState(CLIENT_WAREHOUSE_HEAD_CELLS)

  // useEffect(() => {
  //   setUpdatedProduct(() => ({...product}))
  // }, [SettingsModel.languageTag, product])

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

  useEffect(() => {
    setUpdatedOrder(() => ({...order}))
  }, [SettingsModel.languageTag, order])

  return (
    <Paper>
      <Container disableGutters maxWidth={false}>
        <div>
          <div className={classNames.orderContainer}>
            <div>
              <OrderStatusText status={OrderStatusByCode[updatedOrder.status]} className={classNames.containerTitle} />
            </div>

            <div className={classNames.orderNumWrapper}>
              <Typography className={classNames.orderNum}>{t(TranslationKey['Order number'])}</Typography>
              <Typography className={classNames.titleSpan}>{`№ ${updatedOrder.id}`}</Typography>
            </div>

            <div className={classNames.orderPriceWrapper}>
              <Field
                oneLine
                tooltipInfoContent={t(TranslationKey['Total order amount'])}
                label={t(TranslationKey['Order amount'])}
                labelClasses={classNames.orderPrice}
                containerClasses={classNames.field}
                inputComponent={
                  <Typography className={classNames.titleSpan}>
                    {toFixedWithDollarSign(updatedOrder.totalPrice, 2)}
                  </Typography>
                }
              />
            </div>
          </div>

          <Divider orientation={'horizontal'} />

          <div className={classNames.panelsWrapper}>
            <LeftPanel order={updatedOrder} collapsed={collapsed} narrow={narrow} setCollapsed={setCollapsed} />

            <Divider orientation={'vertical'} className={classNames.divider} />

            <DeliveryParameters order={updatedOrder} />

            <Divider orientation={'vertical'} className={classNames.divider} />

            <ExtraOrderInfo order={updatedOrder} />
          </div>

          <Divider orientation={'horizontal'} />

          <div className={classNames.btnsWrapper}>
            {updatedOrder.status === OrderStatusByKey[OrderStatus.READY_TO_PROCESS] && onClickCancelOrder && (
              <Button
                danger
                tooltipInfoContent={t(TranslationKey['Cancel order, refund of frozen funds'])}
                className={classNames.cancelBtn}
                onClick={onClickCancelOrder}
              >
                {t(TranslationKey['Cancel order'])}
              </Button>
            )}
          </div>

          <div className={classNames.tableWrapper}>
            <Text
              tooltipInfoContent={t(TranslationKey['All boxes received/received by the prep center on order'])}
              textClasses={classNames.tableText}
              containerClasses={classNames.container}
            >
              {t(TranslationKey['Boxes to order'])}
            </Text>

            {boxes.length > 0 ? (
              <Table
                rowsOnly
                data={boxes}
                BodyRow={WarehouseBodyRow}
                renderHeadRow={renderHeadRow()}
                mainProductId={updatedOrder.product._id}
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
