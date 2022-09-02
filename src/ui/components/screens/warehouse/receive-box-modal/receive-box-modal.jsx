import AddIcon from '@mui/icons-material/Add'

import React, {useState} from 'react'

import {Divider, IconButton, Paper, TableCell, TableRow, Typography} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import {transformAndValidate} from 'class-transformer-validator'
import clsx from 'clsx'

import {TranslationKey} from '@constants/translations/translation-key'

import {BoxesWarehouseReceiveBoxModalContract} from '@models/boxes-model/boxes-model.contracts'

import {Button} from '@components/buttons/button'
import {AddFilesForm} from '@components/forms/add-files-form'
import {Input} from '@components/input'
import {Modal} from '@components/modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Table} from '@components/table'
import {TableHeadRow} from '@components/table-rows/batches-view/table-head-row'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getObjectFilteredByKeyArrayBlackList} from '@utils/object'
import {toFixed, toFixedWithKg} from '@utils/text'
import {t} from '@utils/translations'

// import {CommentsLine} from './comments-line'
import {useClassNames} from './receive-box-modal.style'

const WAREHOUSE_RECEIVE_HEAD_CELLS = () => [
  {title: t(TranslationKey.Box)},
  {title: t(TranslationKey.Quantity)},
  {title: t(TranslationKey['Number of superboxes'])},
  {title: t(TranslationKey.Total)},
  {title: `${t(TranslationKey.Sizes)}, ${t(TranslationKey.cm)}`},
  {title: t(TranslationKey['Weight, kg'])},
  {title: t(TranslationKey['Volume weight, kg'])},
  {title: t(TranslationKey['Final weight, kg'])},
]

const TableBodyBoxRow = ({item, itemIndex, handlers}) => {
  const classNames = useClassNames()

  return (
    <TableRow className={classNames.row}>
      <TableCell className={classNames.standartCell}>
        <Typography className={classNames.boxTitle}>{'new box'}</Typography>
        <div className={classNames.descriptionWrapper}>
          <img className={classNames.img} src={getAmazonImageUrl(item.items[0]?.product.images[0])} />
          <Typography className={classNames.title}>
            {itemIndex + 1 + '. ' + item.items[0].product.amazonTitle}
          </Typography>
        </div>
      </TableCell>

      <TableCell className={classNames.qtyCell}>
        <Input
          classes={{root: classNames.inputWrapper, input: classNames.input}}
          inputProps={{maxLength: 6}}
          value={item.items[0].amount}
          onChange={e => handlers.onChangeQtyInput(e, item._id, item.items[0].order)}
        />
      </TableCell>

      <TableCell className={classNames.standartCell}>
        <Input
          classes={{root: classNames.inputWrapper, input: classNames.input}}
          inputProps={{maxLength: 6}}
          value={item.amount}
          onChange={e => handlers.onChangeFieldInput(e, item._id, 'amount')}
        />
      </TableCell>

      <TableCell className={classNames.standartCell}>
        <Input
          disabled
          classes={{root: classNames.inputWrapper, input: classNames.input}}
          value={item.items[0].amount * item.amount}
        />
      </TableCell>

      <TableCell className={classNames.sizesCell}>
        <div className={classNames.sizeWrapper}>
          <Typography>{t(TranslationKey.H) + ': '}</Typography>
          <Input
            classes={{root: classNames.inputWrapper, input: classNames.input}}
            inputProps={{maxLength: 6}}
            value={item.heightCmWarehouse}
            onChange={e => handlers.onChangeFieldInput(e, item._id, 'heightCmWarehouse')}
          />
        </div>
        <div className={classNames.sizeWrapper}>
          <Typography>{t(TranslationKey.W) + ': '}</Typography>
          <Input
            classes={{root: classNames.inputWrapper, input: classNames.input}}
            inputProps={{maxLength: 6}}
            value={item.widthCmWarehouse}
            onChange={e => handlers.onChangeFieldInput(e, item._id, 'widthCmWarehouse')}
          />
        </div>
        <div className={classNames.sizeWrapper}>
          <Typography>{t(TranslationKey.L) + ': '}</Typography>
          <Input
            classes={{root: classNames.inputWrapper, input: classNames.input}}
            inputProps={{maxLength: 6}}
            value={item.lengthCmWarehouse}
            onChange={e => handlers.onChangeFieldInput(e, item._id, 'lengthCmWarehouse')}
          />
        </div>
      </TableCell>
      <TableCell className={classNames.standartCell}>
        <Input
          classes={{root: classNames.inputWrapper, input: classNames.input}}
          inputProps={{maxLength: 6}}
          value={item.weighGrossKgWarehouse}
          onChange={e => handlers.onChangeFieldInput(e, item._id, 'weighGrossKgWarehouse')}
        />
      </TableCell>
      <TableCell className={classNames.standartCell}>
        <Input
          disabled
          classes={{root: classNames.inputWrapper, input: classNames.input}}
          value={toFixed(item.volumeWeightKgWarehouse, 3)}
        />
      </TableCell>
      <TableCell className={classNames.standartCell}>
        <Input
          disabled
          classes={{root: classNames.inputWrapper, input: classNames.input}}
          value={toFixed(item.weightFinalAccountingKgWarehouse, 3)}
        />
      </TableCell>

      <TableCell>
        <Button onClick={() => handlers.onAddImages(item._id)}>{t(TranslationKey.Photos)}</Button>
      </TableCell>

      <TableCell>
        <IconButton onClick={() => handlers.onRemoveBox(item._id)}>
          <DeleteIcon className={classNames.deleteBtn} />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

const NewBoxes = ({newBoxes, onChangeQtyInput, onChangeFieldInput, onRemoveBox, onAddImages}) => {
  const classNames = useClassNames()

  const renderHeadRow = () => <TableHeadRow headCells={WAREHOUSE_RECEIVE_HEAD_CELLS()} />

  return (
    <div className={classNames.newBoxes}>
      <Typography className={classNames.sectionTitle}>{t(TranslationKey['New boxes'])}</Typography>
      <div className={classNames.tableWrapper}>
        <Table
          rowsOnly
          data={newBoxes}
          BodyRow={TableBodyBoxRow}
          renderHeadRow={renderHeadRow()}
          rowsHandlers={{onChangeQtyInput, onChangeFieldInput, onRemoveBox, onAddImages}}
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
              <Typography className={classNames.boxTitle}>{t(TranslationKey['New box'])}</Typography>
              <div className={classNames.descriptionWrapper}>
                <img className={classNames.img} src={getAmazonImageUrl(item.items[0]?.product.images[0])} />
                <Typography className={classNames.title}>
                  {item.items[0].product.amazonTitle.length > 50
                    ? item.items[0].product.amazonTitle.slice(0, 50) + '...'
                    : item.items[0].product.amazonTitle}
                </Typography>
              </div>
            </div>
            <div className={classNames.tableRow}>
              <Typography className={classNames.boxTitleMobile}>{t(TranslationKey.Quantity)}</Typography>
              <Input
                classes={{root: classNames.inputWrapper, input: classNames.input}}
                inputProps={{maxLength: 6}}
                value={item.items[0].amount}
                onChange={e => onChangeQtyInput(e, item._id, item.items[0].order)}
              />
            </div>
            <div className={classNames.tableRow}>
              <Typography className={classNames.boxTitleMobile}>{t(TranslationKey['Number of superboxes'])}</Typography>
              <Input
                classes={{root: classNames.inputWrapper, input: classNames.input}}
                inputProps={{maxLength: 6}}
                value={item.amount}
                onChange={e => onChangeFieldInput(e, item._id, 'amount')}
              />
            </div>
            <div className={classNames.tableRow}>
              <Typography className={classNames.boxTitleMobile}>{t(TranslationKey.Total)}</Typography>
              <Input
                disabled
                classes={{root: classNames.inputWrapper, input: classNames.input}}
                value={item.items[0].amount * item.amount}
              />
            </div>
            <div className={classNames.tableRow}>
              <Typography className={classNames.boxTitleMobile}>{t(TranslationKey.Sizes)}</Typography>
              <div className={classNames.sizeWrapper}>
                <Typography className={classNames.sizeTitle}>{t(TranslationKey.H) + ': '}</Typography>
                <Input
                  classes={{root: classNames.inputWrapper, input: classNames.input}}
                  inputProps={{maxLength: 6}}
                  value={item.heightCmWarehouse}
                  onChange={e => onChangeFieldInput(e, item._id, 'heightCmWarehouse')}
                />
              </div>
              <div className={classNames.sizeWrapper}>
                <Typography className={classNames.sizeTitle}>{t(TranslationKey.W) + ': '}</Typography>
                <Input
                  classes={{root: classNames.inputWrapper, input: classNames.input}}
                  inputProps={{maxLength: 6}}
                  value={item.widthCmWarehouse}
                  onChange={e => onChangeFieldInput(e, item._id, 'widthCmWarehouse')}
                />
              </div>
              <div className={classNames.sizeWrapper}>
                <Typography className={classNames.sizeTitle}>{t(TranslationKey.L) + ': '}</Typography>
                <Input
                  classes={{root: classNames.inputWrapper, input: classNames.input}}
                  inputProps={{maxLength: 6}}
                  value={item.lengthCmWarehouse}
                  onChange={e => onChangeFieldInput(e, item._id, 'lengthCmWarehouse')}
                />
              </div>
            </div>
            <div className={classNames.tableRow}>
              <Typography className={classNames.boxTitleMobile}>{t(TranslationKey['Weight, kg'])}</Typography>
              <Input
                classes={{root: classNames.inputWrapper, input: classNames.input}}
                inputProps={{maxLength: 6}}
                value={item.weighGrossKgWarehouse}
                onChange={e => onChangeFieldInput(e, item._id, 'weighGrossKgWarehouse')}
              />
            </div>
            <div className={classNames.tableRow}>
              <Typography className={classNames.boxTitleMobile}>{t(TranslationKey['Volume weight, kg'])}</Typography>
              <Input
                disabled
                classes={{root: classNames.inputWrapper, input: classNames.input}}
                value={toFixed(item.volumeWeightKgWarehouse, 3)}
              />
            </div>
            <div className={classNames.tableRow}>
              <Typography className={classNames.boxTitleMobile}>{t(TranslationKey['Final weight, kg'])}</Typography>
              <Input
                disabled
                classes={{root: classNames.inputWrapper, input: classNames.input}}
                value={toFixed(item.weightFinalAccountingKgWarehouse, 3)}
              />
            </div>
            <div className={classNames.photoBtnWrapper}>
              <Button onClick={() => onAddImages(item._id)}>{t(TranslationKey.Photos)}</Button>
            </div>
          </div>
        ),
      )}
    </div>
  )
}

export const ReceiveBoxModal = ({setOpenModal, selectedBox, setSourceBoxes, volumeWeightCoefficient}) => {
  const classNames = useClassNames()
  const [showNoDimensionsErrorModal, setShowNoDimensionsErrorModal] = useState(false)
  const [showAddImagesModal, setShowAddImagesModal] = useState(false)

  const emptyProducts = selectedBox.items.map(product => ({...product, amount: ''}))
  const getEmptyBox = () => {
    const emptyBox = {...selectedBox, _id: 'new_id_' + Date.now(), items: emptyProducts, amount: 1}

    const emptyBoxWithDemensions = {
      ...emptyBox,
      lengthCmWarehouse: emptyBox?.lengthCmWarehouse || '',
      widthCmWarehouse: emptyBox?.widthCmWarehouse || '',
      heightCmWarehouse: emptyBox?.heightCmWarehouse || '',
      weighGrossKgWarehouse: emptyBox?.weighGrossKgWarehouse || '',
      volumeWeightKgWarehouse: emptyBox?.volumeWeightKgWarehouse || '',
      weightFinalAccountingKgWarehouse: emptyBox?.weightFinalAccountingKgWarehouse || '',
      tmpImages: [],
      images: (emptyBox?.images === null ? [] : emptyBox?.images) || [],
    }

    return emptyBoxWithDemensions
  }

  const [newBoxes, setNewBoxes] = useState([getEmptyBox()])

  const actuallyAssembled = newBoxes.reduce((acc, box) => acc + box.items[0].amount * box.amount, 0)
  const totalProductsAmount =
    selectedBox.items.reduce((acc, order) => acc + order.amount * selectedBox.amount, 0) - actuallyAssembled

  const onChangeFieldInput = (e, _id, field) => {
    if (
      isNaN(e.target.value) ||
      Number(e.target.value) < 0 ||
      (field === 'amount' && Number(e.target.value) === 0 && e.target.value !== '')
    ) {
      return
    }
    const targetBox = newBoxes.filter(box => box._id === _id)[0]

    const updatedTargetBox =
      field === 'amount'
        ? {...targetBox, [field]: e.target.value !== '' ? Number(e.target.value) : e.target.value}
        : {...targetBox, [field]: e.target.value}

    updatedTargetBox.volumeWeightKgWarehouse =
      ((parseFloat(updatedTargetBox.lengthCmWarehouse) || 0) *
        (parseFloat(updatedTargetBox.heightCmWarehouse) || 0) *
        (parseFloat(updatedTargetBox.widthCmWarehouse) || 0)) /
      volumeWeightCoefficient
    updatedTargetBox.weightFinalAccountingKgWarehouse = Math.max(
      parseFloat(updatedTargetBox.volumeWeightKgWarehouse) || 0,
      parseFloat(updatedTargetBox.weighGrossKgWarehouse) || 0,
    )

    const updatedNewBoxes = newBoxes.map(box => (box._id === _id ? updatedTargetBox : box))
    setNewBoxes(updatedNewBoxes)
  }

  const onChangeQtyInput = (e, _id, order) => {
    if (isNaN(e.target.value) || Number(e.target.value) < 0) {
      return
    }
    const targetBox = newBoxes.filter(box => box._id === _id)[0]
    const targetProduct = targetBox.items.filter(product => product.order === order)[0]
    const updatedTargetProduct = {...targetProduct, amount: Number(e.target.value)}
    const updatedTargetProducts = targetBox.items.map(product =>
      product.order === order ? updatedTargetProduct : product,
    )
    const updatedTargetBox = {...targetBox, items: updatedTargetProducts}
    const updatedNewBoxes = newBoxes.map(box => (box._id === _id ? updatedTargetBox : box))

    setNewBoxes(updatedNewBoxes)
  }

  const onRemoveBox = boxId => {
    const updatedNewBoxes = newBoxes.filter(box => box._id !== boxId)
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
      const newBoxesWithoutEmptyBoxes = newBoxes.filter(el => el.items[0].amount !== (0 || ''))

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
        <img className={classNames.img} src={getAmazonImageUrl(selectedBox?.items[0]?.product.images[0])} />
        <Typography className={classNames.titleOfCurBox}>{selectedBox.items[0].product.amazonTitle}</Typography>
      </div>
      <div className={classNames.currentBoxFooter}>
        <div className={classNames.qtyWrapper}>
          <Typography className={classNames.qtyTitle}>{t(TranslationKey.Quantity)}</Typography>
          <Typography
            className={classNames.qtySubTitle}
          >{`${selectedBox.items[0].amount} x ${selectedBox.amount}`}</Typography>
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

      <div className={classNames.demensionsWrapper}>
        <Typography className={classNames.categoryTitle}>{t(TranslationKey['Sizes from supplier:'])}</Typography>
        <Typography className={classNames.footerTitle}>{`${t(TranslationKey.Length)}: ${toFixed(
          selectedBox.lengthCmSupplier,
          2,
        )} ${t(TranslationKey.cm)}`}</Typography>
        <Typography className={classNames.footerTitle}>{`${t(TranslationKey.Width)}: ${toFixed(
          selectedBox.widthCmSupplier,
          2,
        )} ${t(TranslationKey.cm)}`}</Typography>
        <Typography className={classNames.footerTitle}>{`${t(TranslationKey.Height)}: ${toFixed(
          selectedBox.heightCmSupplier,
          2,
        )} ${t(TranslationKey.cm)}`}</Typography>
        <Typography className={classNames.footerTitle}>{`${t(TranslationKey.Weight)}: ${toFixedWithKg(
          selectedBox.weighGrossKgSupplier,
          2,
        )} `}</Typography>
        <Typography className={classNames.footerTitle}>{`${t(TranslationKey['Volume weight'])}: ${toFixedWithKg(
          ((parseFloat(selectedBox.lengthCmSupplier) || 0) *
            (parseFloat(selectedBox.heightCmSupplier) || 0) *
            (parseFloat(selectedBox.widthCmSupplier) || 0)) /
            volumeWeightCoefficient,
          2,
        )} `}</Typography>
        <Typography className={classNames.footerTitle}>{`${t(TranslationKey['Final weight'])}: ${toFixedWithKg(
          selectedBox.weighGrossKgSupplier >
            ((parseFloat(selectedBox.lengthCmSupplier) || 0) *
              (parseFloat(selectedBox.heightCmSupplier) || 0) *
              (parseFloat(selectedBox.widthCmSupplier) || 0)) /
              volumeWeightCoefficient
            ? selectedBox.weighGrossKgSupplier
            : ((parseFloat(selectedBox.lengthCmSupplier) || 0) *
                (parseFloat(selectedBox.heightCmSupplier) || 0) *
                (parseFloat(selectedBox.widthCmSupplier) || 0)) /
                volumeWeightCoefficient,
          2,
        )}`}</Typography>
      </div>
    </div>
  )

  const disableSubmit = newBoxes.some(box => box.items[0].amount < 1 || box.amount === '')

  return (
    <div className={classNames.root}>
      <div className={classNames.modalHeaderWrapper}>
        <Typography className={classNames.modalTitle}>{t(TranslationKey['Receive and distribute'])}</Typography>
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
      </div>

      {/* <CommentsLine /> */}

      <Paper className={classNames.boxesWrapper}>
        <CurrentBox />
        <Divider flexItem className={classNames.divider} orientation="vertical" />

        <NewBoxes
          newBoxes={newBoxes}
          onChangeQtyInput={onChangeQtyInput}
          onChangeFieldInput={onChangeFieldInput}
          onRemoveBox={onRemoveBox}
          onAddImages={onAddImages}
        />
      </Paper>
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
            onClickRedistributeBtn()
          }}
        >
          {t(TranslationKey.Save)}
        </Button>

        <Button
          variant="text"
          className={clsx(classNames.button, classNames.cancelButton)}
          onClick={() => {
            setOpenModal()
          }}
        >
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
    </div>
  )
}
