import React, {useState} from 'react'

import {Container, Divider, Typography, useTheme, useMediaQuery, Paper, TableRow, TableCell} from '@material-ui/core'

import {DELIVERY_OPTIONS} from '@constants/delivery-options'
import {getOrderStatusOptionByCode} from '@constants/order-status'
import {CLIENT_WAREHOUSE_HEAD_CELLS} from '@constants/table-head-cells'
import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Table} from '@components/table'
import {WarehouseBodyRow} from '@components/table-rows/warehouse'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {LeftPanel} from './left-panel'
import {useClassNames} from './order-content.style'
import {RightPanel} from './right-panel'

const textConsts = getLocalizedTexts(texts, 'ru').orderContent

const MEDIA_SCALE_POINTS = '1812'

const renderHeadRow = (
  <TableRow>
    {CLIENT_WAREHOUSE_HEAD_CELLS.map((item, index) => (
      <TableCell key={index}>{item.label}</TableCell>
    ))}
  </TableRow>
)

export const OrderContent = ({order, boxes, history}) => {
  const classNames = useClassNames()

  const [collapsed, setCollapsed] = useState(false)
  const [deliveryType, setDeliveryType] = useState(false)
  const theme = useTheme()
  const narrow = useMediaQuery(theme.breakpoints.down(MEDIA_SCALE_POINTS))

  const goBack = () => {
    history.goBack()
  }

  return (
    <Paper>
      <Container disableGutters maxWidth={false}>
        <div>
          <div className={classNames.orderContainer}>
            <Typography className={classNames.containerTitle}>
              {getOrderStatusOptionByCode(order.status).label}
            </Typography>
          </div>

          <Divider orientation={'horizontal'} />

          <div className={classNames.panelsWrapper}>
            <LeftPanel order={order} collapsed={collapsed} narrow={narrow} setCollapsed={setCollapsed} />

            <RightPanel
              order={order}
              deliveryType={deliveryType}
              setDeliveryType={setDeliveryType}
              deliveryOptions={DELIVERY_OPTIONS}
            />
          </div>

          <Divider orientation={'horizontal'} />

          <div className={classNames.btnsWrapper}>
            <Button
              disableElevation
              className={classNames.goBackBtn}
              color="primary"
              variant="contained"
              onClick={() => goBack()}
            >
              {textConsts.backBtn}
            </Button>
          </div>

          <div className={classNames.tableWrapper}>
            <Typography className={classNames.tableText}>{textConsts.boxesAtOrder}</Typography>
            {boxes.length > 0 ? (
              <Table rowsOnly data={boxes} BodyRow={WarehouseBodyRow} renderHeadRow={renderHeadRow} />
            ) : (
              <Typography className={classNames.noBoxesText}>{textConsts.noBoxes}</Typography>
            )}
          </div>
        </div>
      </Container>
    </Paper>
  )
}
