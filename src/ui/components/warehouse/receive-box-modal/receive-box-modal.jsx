import { cx } from '@emotion/css'
import { transformAndValidate } from 'class-transformer-validator'
import { useState } from 'react'

import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@mui/icons-material/Add'
import { Divider, IconButton, TableCell, TableRow, Tooltip, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { BoxesWarehouseReceiveBoxModalContract } from '@models/boxes-model/boxes-model.contracts'

import { AddFilesForm } from '@components/forms/add-files-form'
import { CheckQuantityForm } from '@components/forms/check-quantity-form'
import { WarningInfoModal } from '@components/modals/warning-info-modal'
import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value'
import { CustomSlider } from '@components/shared/custom-slider'
import { Input } from '@components/shared/input'
import { Modal } from '@components/shared/modal'
import { Table } from '@components/shared/table'
import { TableHeadRow } from '@components/table/table-rows/batches-view/table-head-row'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getObjectFilteredByKeyArrayBlackList } from '@utils/object'
import { getShortenStringIfLongerThanCount, shortAsin, toFixed, toFixedWithKg } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './receive-box-modal.style'

const WAREHOUSE_RECEIVE_HEAD_CELLS = classNames => [
  { title: <Typography className={classNames.headerCell}>{t(TranslationKey.Box)}</Typography> },
  { title: <Typography className={classNames.headerCell}>{t(TranslationKey['Boxes in group'])}</Typography> },
  // {title: <Typography className={classNames.headerCell}>{t(TranslationKey.Quantity)}</Typography>},

  { title: <Typography className={classNames.headerCell}>{t(TranslationKey.Total)}</Typography> },
  {
    title: (
      <Typography className={classNames.headerCell}>{`${t(TranslationKey.Sizes)}, ${t(TranslationKey.cm)}`}</Typography>
    ),
  },
  { title: <Typography className={classNames.headerCell}>{t(TranslationKey['Weight, kg'])}</Typography> },
  { title: <Typography className={classNames.headerCell}>{t(TranslationKey['Volume weight, kg'])}</Typography> },
  { title: <Typography className={classNames.headerCell}>{t(TranslationKey['Final weight, kg'])}</Typography> },
]

const TableBodyBoxRow = ({ item, /* itemIndex,*/ handlers }) => {
  const { classes: classNames } = useClassNames()

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
}

const NewBoxes = ({ newBoxes, onChangeQtyInput, onChangeFieldInput, onRemoveBox, onAddImages, addDouble }) => {
  const { classes: classNames } = useClassNames()

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

      {newBoxes.map(
        (
          item,
          index, // mobile version
        ) => (
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
        ),
      )}
    </div>
  )
}

export const ReceiveBoxModal = ({ setOpenModal, setSourceBoxes, volumeWeightCoefficient, boxesBefore }) => {
  const { classes: classNames } = useClassNames()
  const [showNoDimensionsErrorModal, setShowNoDimensionsErrorModal] = useState(false)
  const [showAddImagesModal, setShowAddImagesModal] = useState(false)

  const [showCheckQuantityModal, setShowCheckQuantityModal] = useState(false)

  const isManyItemsInSomeBox = boxesBefore.some(box => box.items.length > 1)

  const noTariffInSomeBox = boxesBefore.some(box => !box.logicsTariff)

  const receiveNotFromBuyer = isManyItemsInSomeBox || noTariffInSomeBox

  const emptyProducts = boxesBefore[0].items.map(product => ({ ...product, amount: '' }))

  const getEmptyBox = () => {
    const emptyBox = { ...boxesBefore[0], _id: 'new_id_' + Date.now(), items: emptyProducts, amount: 1 }

    const emptyBoxWithDemensions = {
      ...emptyBox,
      lengthCmWarehouse: emptyBox?.lengthCmWarehouse || '',
      widthCmWarehouse: emptyBox?.widthCmWarehouse || '',
      heightCmWarehouse: emptyBox?.heightCmWarehouse || '',
      weighGrossKgWarehouse: emptyBox?.weighGrossKgWarehouse || '',
      volumeWeightKgWarehouse: emptyBox?.volumeWeightKgWarehouse || '',
      weightFinalAccountingKgWarehouse: emptyBox?.weightFinalAccountingKgWarehouse || '',
      // fitsInitialDimensions: fitsInitialDimensions ||
      tmpImages: [],
      images: (emptyBox?.images === null ? [] : emptyBox?.images) || [],
    }

    return emptyBoxWithDemensions
  }

  const getStartBoxes = () => {
    const newArr = boxesBefore.map((el, index) => {
      const startBox = {
        ...el,
        _id: 'new_id_' + index + Date.now(),
        items: el.items.map(product => ({ ...product })),
      }

      const volumeWeight =
        ((parseFloat(el.lengthCmSupplier) || 0) *
          (parseFloat(el.heightCmSupplier) || 0) *
          (parseFloat(el.widthCmSupplier) || 0)) /
        volumeWeightCoefficient

      const weightFinalAccountingKg = Math.max(parseFloat(volumeWeight) || 0, parseFloat(el.weighGrossKgSupplier) || 0)

      const startBoxWithDemensions = {
        ...startBox,
        lengthCmWarehouse: el?.lengthCmSupplier || '',
        widthCmWarehouse: el?.widthCmSupplier || '',
        heightCmWarehouse: el?.heightCmSupplier || '',
        weighGrossKgWarehouse: el?.weighGrossKgSupplier || '',

        volumeWeightKgWarehouse: volumeWeight || '',

        weightFinalAccountingKgWarehouse: weightFinalAccountingKg || '',
        tmpImages: [],
        images: (startBox?.images === null ? [] : startBox?.images) || [],
      }

      return startBoxWithDemensions
    })

    return newArr
  }

  const [newBoxes, setNewBoxes] = useState(getStartBoxes())

  const actuallyAssembled = newBoxes.reduce((acc, box) => acc + box.items[0].amount * box.amount, 0)
  const totalProductsAmount =
    boxesBefore.reduce(
      (accum, current) => (accum += current.items.reduce((acc, order) => acc + order.amount * current.amount, 0)),
      0,
    ) - actuallyAssembled

  const onChangeFieldInput = (e, _id, field) => {
    const targetBox = newBoxes.filter(box => box._id === _id)[0]

    if (
      isNaN(e.target.value) ||
      Number(e.target.value) < 0 ||
      (field === 'amount' && Number(e.target.value) === 0 && e.target.value !== '')
    ) {
      return
    }

    targetBox[field] =
      field === 'amount' ? (e.target.value !== '' ? Number(e.target.value) : e.target.value) : e.target.value

    targetBox.volumeWeightKgWarehouse =
      ((parseFloat(targetBox.lengthCmWarehouse) || 0) *
        (parseFloat(targetBox.heightCmWarehouse) || 0) *
        (parseFloat(targetBox.widthCmWarehouse) || 0)) /
      volumeWeightCoefficient
    targetBox.weightFinalAccountingKgWarehouse = Math.max(
      parseFloat(targetBox.volumeWeightKgWarehouse) || 0,
      parseFloat(targetBox.weighGrossKgWarehouse) || 0,
    )

    const updatedNewBoxes = newBoxes.map(box => (box._id === _id ? targetBox : box))
    setNewBoxes(updatedNewBoxes)
  }

  const onChangeQtyInput = (e, _id, order) => {
    if (isNaN(e.target.value) || Number(e.target.value) < 0) {
      return
    }
    const targetBox = newBoxes.filter(box => box._id === _id)[0]
    const targetProduct = targetBox.items.filter(product => product.order === order)[0]
    const updatedTargetProduct = { ...targetProduct, amount: Number(e.target.value) }
    const updatedTargetProducts = targetBox.items.map(product =>
      product.order === order ? updatedTargetProduct : product,
    )
    const updatedTargetBox = { ...targetBox, items: updatedTargetProducts }
    const updatedNewBoxes = newBoxes.map(box => (box._id === _id ? updatedTargetBox : box))

    setNewBoxes(updatedNewBoxes)
  }

  const onRemoveBox = boxId => {
    const updatedNewBoxes = newBoxes.filter(box => box._id !== boxId)
    setNewBoxes(updatedNewBoxes)
  }

  const addDouble = boxId => {
    const foundedBox = newBoxes.find(box => box._id === boxId)

    const copyedBox = { ...JSON.parse(JSON.stringify(foundedBox)), tmpImages: foundedBox.tmpImages }

    const updatedNewBoxes = [...newBoxes, { ...copyedBox, _id: `${copyedBox._id} + 'double' ${Date.now()}` }]
    setNewBoxes(updatedNewBoxes)
  }

  const [boxForImageEdit, setBoxForImageEdit] = useState({})

  const onAddImages = boxId => {
    setShowAddImagesModal(!showAddImagesModal)
    const editingBox = newBoxes.find(box => box._id === boxId)

    setBoxForImageEdit(editingBox)
  }

  const onClickRedistributeBtn = async () => {
    try {
      const newBoxesWithoutEmptyBoxes = newBoxes
        .map(box => ({ ...box, items: box.items.filter(e => e.amount > 0) }))
        .filter(el => el.items[0].amount !== (0 || ''))

      const newBoxesWithoutNumberFields = newBoxesWithoutEmptyBoxes.map(el => ({
        ...el,
        lengthCmWarehouse: parseFloat(el?.lengthCmWarehouse) || '',
        widthCmWarehouse: parseFloat(el?.widthCmWarehouse) || '',
        heightCmWarehouse: parseFloat(el?.heightCmWarehouse) || '',
        weighGrossKgWarehouse: parseFloat(el?.weighGrossKgWarehouse) || '',
        volumeWeightKgWarehouse: parseFloat(el?.volumeWeightKgWarehouse) || '',
        weightFinalAccountingKgWarehouse: parseFloat(el?.weightFinalAccountingKgWarehouse) || '',
      }))

      for (let i = 0; i < newBoxesWithoutNumberFields.length; i++) {
        const box = getObjectFilteredByKeyArrayBlackList(newBoxesWithoutNumberFields[i], ['tmpImages'])

        await transformAndValidate(BoxesWarehouseReceiveBoxModalContract, box)
      }

      setSourceBoxes([...newBoxesWithoutNumberFields])
      setOpenModal()
    } catch (error) {
      setShowNoDimensionsErrorModal(!showNoDimensionsErrorModal)
    }
  }
  const CurrentBox = () => (
    <div className={classNames.currentBox}>
      <div className={classNames.order}>
        <img className={classNames.img} src={getAmazonImageUrl(boxesBefore[0]?.items[0]?.product.images[0])} />
        <Tooltip title={boxesBefore[0].items[0].product.amazonTitle}>
          <Typography className={classNames.titleOfCurBox}>
            {getShortenStringIfLongerThanCount(boxesBefore[0].items[0].product.amazonTitle, 225)}
          </Typography>
        </Tooltip>
      </div>
      <div className={classNames.currentBoxFooter}>
        <div className={classNames.qtyWrapper}>
          <Typography className={classNames.qtyTitle}>{t(TranslationKey.Quantity)}</Typography>
          <Typography className={classNames.qtySubTitle}>
            {
              boxesBefore.reduce(
                (ac, cur) => (ac += cur.items[0].amount * cur.amount),
                0,
              ) /* `${box.items[0].amount} x ${box.amount}`*/
            }
          </Typography>
        </div>
        <div className={classNames.qtyWrapper}>
          <Typography className={classNames.qtyTitle}>{t(TranslationKey['Left to redistribute'])}</Typography>
          <Typography className={classNames.qtySubTitle}>{totalProductsAmount}</Typography>
        </div>
        <div className={classNames.qtyWrapper}>
          <Typography className={classNames.qtyTitle}>{t(TranslationKey['Actually assembled'])}</Typography>
          <Typography className={classNames.qtySubTitle}>{actuallyAssembled}</Typography>
        </div>
      </div>

      {window.innerWidth >= 1282 && (
        <div className={classNames.currentBoxesWrapper}>
          <CustomSlider alignButtons="end">
            {boxesBefore.map((box, index) => (
              <div key={index} className={classNames.demensionsWrapper}>
                <Typography className={classNames.categoryTitle}>
                  {t(TranslationKey['Sizes from buyer']) + ':'}
                </Typography>
                <Typography className={classNames.footerTitle}>{`${t(TranslationKey.Length)}: ${toFixed(
                  box.lengthCmSupplier,
                  2,
                )} ${t(TranslationKey.cm)}`}</Typography>
                <Typography className={classNames.footerTitle}>{`${t(TranslationKey.Width)}: ${toFixed(
                  box.widthCmSupplier,
                  2,
                )} ${t(TranslationKey.cm)}`}</Typography>
                <Typography className={classNames.footerTitle}>{`${t(TranslationKey.Height)}: ${toFixed(
                  box.heightCmSupplier,
                  2,
                )} ${t(TranslationKey.cm)}`}</Typography>
                <Typography className={classNames.footerTitle}>{`${t(TranslationKey.Weight)}: ${toFixedWithKg(
                  box.weighGrossKgSupplier,
                  2,
                )} `}</Typography>
                <Typography className={classNames.footerTitle}>{`${t(TranslationKey['Volume weight'])}: ${toFixedWithKg(
                  ((parseFloat(box.lengthCmSupplier) || 0) *
                    (parseFloat(box.heightCmSupplier) || 0) *
                    (parseFloat(box.widthCmSupplier) || 0)) /
                    volumeWeightCoefficient,
                  2,
                )} `}</Typography>
                <Typography className={classNames.footerTitle}>{`${t(TranslationKey['Final weight'])}: ${toFixedWithKg(
                  box.weighGrossKgSupplier >
                    ((parseFloat(box.lengthCmSupplier) || 0) *
                      (parseFloat(box.heightCmSupplier) || 0) *
                      (parseFloat(box.widthCmSupplier) || 0)) /
                      volumeWeightCoefficient
                    ? box.weighGrossKgSupplier
                    : ((parseFloat(box.lengthCmSupplier) || 0) *
                        (parseFloat(box.heightCmSupplier) || 0) *
                        (parseFloat(box.widthCmSupplier) || 0)) /
                        volumeWeightCoefficient,
                  2,
                )}`}</Typography>
              </div>
            ))}
          </CustomSlider>
        </div>
      )}

      {window.innerWidth < 1282 && (
        <div className={classNames.currentBoxesWrapper}>
          <CustomSlider alignButtons="end">
            {boxesBefore.map((box, index) => (
              <div key={index} className={classNames.demensionsWrapper}>
                <Typography className={classNames.categoryTitle}>
                  {t(TranslationKey['Sizes from buyer']) + ':'}
                </Typography>
                <div className={classNames.adaptCatigoryWrapper}>
                  <Typography className={classNames.footerTitle}>{`${t(TranslationKey.Length)}: ${toFixed(
                    box.lengthCmSupplier,
                    2,
                  )} ${t(TranslationKey.cm)}`}</Typography>
                  <Typography className={classNames.footerTitle}>{`${t(TranslationKey.Width)}: ${toFixed(
                    box.widthCmSupplier,
                    2,
                  )} ${t(TranslationKey.cm)}`}</Typography>
                  <Typography className={classNames.footerTitle}>{`${t(TranslationKey.Height)}: ${toFixed(
                    box.heightCmSupplier,
                    2,
                  )} ${t(TranslationKey.cm)}`}</Typography>
                  <Typography className={classNames.footerTitle}>{`${t(TranslationKey.Weight)}: ${toFixedWithKg(
                    box.weighGrossKgSupplier,
                    2,
                  )} `}</Typography>
                  <Typography className={classNames.footerTitle}>{`${t(
                    TranslationKey['Volume weight'],
                  )}: ${toFixedWithKg(
                    ((parseFloat(box.lengthCmSupplier) || 0) *
                      (parseFloat(box.heightCmSupplier) || 0) *
                      (parseFloat(box.widthCmSupplier) || 0)) /
                      volumeWeightCoefficient,
                    2,
                  )} `}</Typography>
                  <Typography className={classNames.footerTitle}>{`${t(
                    TranslationKey['Final weight'],
                  )}: ${toFixedWithKg(
                    box.weighGrossKgSupplier >
                      ((parseFloat(box.lengthCmSupplier) || 0) *
                        (parseFloat(box.heightCmSupplier) || 0) *
                        (parseFloat(box.widthCmSupplier) || 0)) /
                        volumeWeightCoefficient
                      ? box.weighGrossKgSupplier
                      : ((parseFloat(box.lengthCmSupplier) || 0) *
                          (parseFloat(box.heightCmSupplier) || 0) *
                          (parseFloat(box.widthCmSupplier) || 0)) /
                          volumeWeightCoefficient,
                    2,
                  )}`}</Typography>
                </div>
              </div>
            ))}
          </CustomSlider>
        </div>
      )}
    </div>
  )

  const disableSubmit = newBoxes.some(box => /* box.items[0].amount < 1 ||*/ box.amount === '')

  return (
    <div className={classNames.root}>
      <div className={classNames.modalHeaderWrapper}>
        <Typography className={classNames.modalTitle}>{t(TranslationKey['Receive and distribute'])}</Typography>
        {!receiveNotFromBuyer && (
          <div className={classNames.addButtonWrapper}>
            <Button
              className={classNames.addButton}
              tooltipInfoContent={t(TranslationKey['Add a box'])}
              onClick={() => {
                setNewBoxes(newBoxes.concat(getEmptyBox()))
              }}
            >
              {t(TranslationKey['New box'])}
              <AddIcon fontSize="small" className={classNames.icon} />
            </Button>
          </div>
        )}
      </div>

      <div className={classNames.boxesWrapper}>
        {!receiveNotFromBuyer && <CurrentBox />}
        {!receiveNotFromBuyer && <Divider flexItem className={classNames.divider} orientation="vertical" />}
        <NewBoxes
          newBoxes={newBoxes}
          addDouble={addDouble}
          onChangeQtyInput={onChangeQtyInput}
          onChangeFieldInput={onChangeFieldInput}
          onRemoveBox={onRemoveBox}
          onAddImages={onAddImages}
        />
      </div>
      <div className={classNames.addButtonWrapperMobile}>
        <Button
          className={classNames.addButtonMobile}
          tooltipInfoContent={t(TranslationKey['Add a box'])}
          onClick={() => {
            setNewBoxes(newBoxes.concat(getEmptyBox()))
          }}
        >
          {t(TranslationKey['New box'])}
          <AddIcon fontSize="small" className={classNames.icon} />
        </Button>
      </div>

      <div className={classNames.buttonsWrapper}>
        <Button
          success
          disabled={disableSubmit}
          className={classNames.button}
          onClick={() => {
            receiveNotFromBuyer
              ? onClickRedistributeBtn()
              : totalProductsAmount === 0
              ? onClickRedistributeBtn()
              : setShowCheckQuantityModal(!showCheckQuantityModal)
          }}
        >
          {t(TranslationKey.Save)}
        </Button>

        <Button variant="text" className={cx(classNames.button, classNames.cancelButton)} onClick={setOpenModal}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
      <WarningInfoModal
        openModal={showNoDimensionsErrorModal}
        setOpenModal={() => setShowNoDimensionsErrorModal(!showNoDimensionsErrorModal)}
        title={t(TranslationKey['Enter the dimensions of all the boxes'])}
        btnText={t(TranslationKey.Ok)}
        onClickBtn={() => {
          setShowNoDimensionsErrorModal(!showNoDimensionsErrorModal)
        }}
      />

      <Modal
        openModal={showAddImagesModal}
        setOpenModal={() => setShowAddImagesModal(!showAddImagesModal)}
        onCloseModal={() => setShowAddImagesModal(!showAddImagesModal)}
      >
        <AddFilesForm
          item={boxForImageEdit}
          allItemsArray={newBoxes}
          setAllItemsArray={setNewBoxes}
          onCloseModal={() => setShowAddImagesModal(!showAddImagesModal)}
        />
      </Modal>

      <Modal openModal={showCheckQuantityModal} setOpenModal={() => setShowCheckQuantityModal(!showCheckQuantityModal)}>
        <CheckQuantityForm
          title={t(TranslationKey['Confirmation of goods quantity'])}
          description={t(TranslationKey['Enter the amount of goods that came into the warehouse']) + ':'}
          acceptText={t(TranslationKey.Save) + '?'}
          comparisonQuantity={actuallyAssembled}
          onClose={() => setShowCheckQuantityModal(!showCheckQuantityModal)}
          onSubmit={onClickRedistributeBtn}
        />
      </Modal>
    </div>
  )
}
