import React from 'react';

import { Checkbox, TableCell, TableRow, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';

import { warehouses } from '@constants/warehouses';

import { getAmazonImageUrl } from '@utils/get-amazon-image-url';
import { toFixedWithDollarSign, withKg } from '@utils/text';

import { styles } from './warehouse-body-row.style';

const WarehouseBodyRowRaw = ({
  item: box,
  itemIndex: boxIndex,
  handlers,
  rowsDatas,
  ...restProps
}) => {
  const classNames = restProps.classes;
  const ordersQty = box.items.length;

  const ProductCell = ({ imgSrc, title }) => (
    <TableCell className={classNames.productCell}>
      <img className={classNames.img} src={imgSrc} />
      {title}
    </TableCell>
  );

  return box.items.map((order, orderIndex) => (
    <TableRow
      key={orderIndex}
      className={clsx({ [classNames.boxLastRow]: orderIndex === ordersQty - 1 })}
    >
      {orderIndex === 0 && (
        <React.Fragment>
          <TableCell rowSpan={ordersQty}>{boxIndex + 1}</TableCell>
          <TableCell rowSpan={ordersQty}>
            {box.isDraft ? (
              <Typography>{'isDraft'}</Typography>
            ) : (
              <Checkbox
                color="primary"
                checked={rowsDatas.selectedBoxes.includes(box._id)}
                onChange={() => handlers.checkbox(box._id)}
              />
            )}
          </TableCell>
        </React.Fragment>
      )}
      <ProductCell
        imgSrc={
          order.product.images &&
          order.product.images[0] &&
          getAmazonImageUrl(order.product.images[0])
        }
        title={order.product.amazonTitle}
      />
      <TableCell>{'ID: ' + order.order}</TableCell>

      {/* TODO Extract Barcode chip to Component */}
      <TableCell onClick={handlers.onTriggerBarcode}>{order.barCode}</TableCell>

      <TableCell>{order.product.id}</TableCell>
      <TableCell className={classNames.cellValueNumber}>{order.amount}</TableCell>
      <TableCell>{order.product.material}</TableCell>
      {orderIndex === 0 && (
        <React.Fragment>
          <TableCell rowSpan={ordersQty}>{warehouses[box.warehouse]}</TableCell>
          <TableCell rowSpan={ordersQty}>{'ID: ' + box._id}</TableCell>
        </React.Fragment>
      )}
      {/* <TableCell className={classNames.cellValueNumber}>
        {'$' + order.product.delivery.toFixed(2)}
      </TableCell> */}

      <TableCell className={classNames.cellValueNumber}>
        {toFixedWithDollarSign(
          (parseFloat(order.product.amazon) || 0) * (parseInt(order.amount) || 0)
        )}
      </TableCell>
      <TableCell className={classNames.cellValueNumber}>{order.product.weight + ' kg'}</TableCell>
      <TableCell className={classNames.cellValueNumber}>
        {withKg(
          Math.max(
            parseFloat(box.volumeWeightKgSupplier) || 0,
            parseFloat(box.weightFinalAccountingKgSupplier) || 0
          )
        )}
      </TableCell>
      <TableCell className={classNames.cellValueNumber}>
        {withKg(box.weighGrossKgSupplier)}
      </TableCell>
      <TableCell>{order.track}</TableCell>
    </TableRow>
  ));
};

export const WarehouseBodyRow = withStyles(styles)(WarehouseBodyRowRaw);
