import {React, useState} from 'react'

import {Checkbox, Container, Divider, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button/success-button'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {Field} from '@components/field'
import {ImageFileInput} from '@components/image-file-input'
import {BigImagesModal} from '@components/modals/big-images-modal'

import {checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot} from '@utils/checks'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {priceCalculation} from '@utils/price-calculation'

import {useClassNames} from './add-or-edit-supplier-modal-content.style'

const textConsts = getLocalizedTexts(texts, 'ru').addOrEditSupplierModalContent

export const AddOrEditSupplierModalContent = observer(
  ({
    title,
    onTriggerShowModal,
    supplier,
    onClickSaveBtn,
    showProgress,
    progressValue,
    requestStatus,
    outsideProduct,
    onClickPrevButton,
  }) => {
    const classNames = useClassNames()

    const [tmpSupplier, setTmpSupplier] = useState({
      amount: (supplier && supplier.amount) || '',
      comment: (supplier && supplier.comment) || '',
      delivery: (supplier && supplier.delivery) || '',
      link: (supplier && supplier.link) || '',
      lotcost: (supplier && supplier.lotcost) || '',
      minlot: (supplier && supplier.minlot) || '',
      name: (supplier && supplier.name) || '',
      price: (supplier && supplier.price) || '',
      images: (supplier && supplier.images) || [],
    })

    const [makeMainSupplier, setMakeMainSupplier] = useState(false)

    const [photosOfSupplier, setPhotosOfSupplier] = useState([])

    const [showPhotosModal, setShowPhotosModal] = useState(false)

    const renderFooterModalButtons = () => {
      if (outsideProduct) {
        return (
          <div className={classNames.buttonsWrapperClient}>
            <Button disableElevation className={classNames.prevBtnClient} onClick={() => onClickPrevButton()}>
              {textConsts.backBtn}
            </Button>
            <div>
              <SuccessButton
                disableElevation
                disabled={diasabledSubmit}
                className={classNames.saveBtnClient}
                variant="contained"
                onClick={() => {
                  onClickSaveBtn(
                    {...tmpSupplier, _id: supplier && supplier._id},
                    photosOfSupplier,
                    false,
                    makeMainSupplier,
                  )
                }}
              >
                {textConsts.saveAndBindBtn}
              </SuccessButton>
              <SuccessButton
                disableElevation
                disabled={diasabledSubmit}
                className={classNames.saveBtnClient}
                variant="contained"
                onClick={() => {
                  onClickSaveBtn(
                    {...tmpSupplier, _id: supplier && supplier._id},
                    photosOfSupplier,
                    true,
                    makeMainSupplier,
                  )
                  setTmpSupplier({
                    amount: '',
                    comment: '',
                    delivery: '',
                    link: '',
                    lotcost: '',
                    minlot: '',
                    name: '',
                    price: '',
                    images: [],
                  })

                  setPhotosOfSupplier(() => [])
                  setMakeMainSupplier(false)
                }}
              >
                {textConsts.saveAndAddBtn}
              </SuccessButton>
            </div>
          </div>
        )
      } else {
        return (
          <div className={classNames.buttonsWrapper}>
            <Button
              disableElevation
              disabled={diasabledSubmit}
              className={classNames.saveBtn}
              variant="contained"
              onClick={() => {
                onClickSaveBtn({...tmpSupplier, _id: supplier && supplier._id}, photosOfSupplier)

                setPhotosOfSupplier(() => [])
              }}
            >
              {textConsts.saveBtn}
            </Button>
            <Button
              disableElevation
              className={classNames.cancelBtn}
              variant="contained"
              onClick={() => onTriggerShowModal()}
            >
              {textConsts.cancelBtn}
            </Button>
          </div>
        )
      }
    }

    const onChangeField = fieldName => event => {
      if (
        fieldName !== 'name' &&
        fieldName !== 'comment' &&
        fieldName !== 'link' &&
        !checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(event.target.value)
      ) {
        return
      } else if (['minlot', 'amount'].includes(fieldName)) {
        setTmpSupplier({...tmpSupplier, [fieldName]: parseInt(event.target.value) || ''})
      } else {
        setTmpSupplier({...tmpSupplier, [fieldName]: event.target.value})
      }
    }

    const diasabledSubmit =
      '' === tmpSupplier.price ||
      '' === tmpSupplier.link ||
      '' === tmpSupplier.amount ||
      '' === tmpSupplier.delivery ||
      '' === tmpSupplier.lotcost ||
      '' === tmpSupplier.minlot ||
      0 === parseInt(tmpSupplier.price) ||
      0 === parseInt(tmpSupplier.amount) ||
      0 === parseInt(tmpSupplier.lotcost) ||
      0 === parseInt(tmpSupplier.minlot) ||
      requestStatus === loadingStatuses.isLoading

    return (
      <Container disableGutters className={classNames.modalContainer}>
        <Typography className={classNames.modalTitle}>{title}</Typography>
        <Divider className={classNames.titleDivider} />

        <Field
          label={textConsts.name}
          inputProps={{maxLength: 1024}}
          value={tmpSupplier.name}
          onChange={onChangeField('name')}
        />
        <Field
          label={textConsts.link}
          inputProps={{maxLength: 2000}}
          value={tmpSupplier.link}
          onChange={onChangeField('link')}
        />
        <Field
          label={textConsts.price}
          inputProps={{maxLength: 50}}
          value={tmpSupplier.price}
          error={parseInt(tmpSupplier.price) === 0 && textConsts.errorNoZero}
          onChange={onChangeField('price')}
        />
        <Field
          label={textConsts.deliveryPrice}
          inputProps={{maxLength: 50}}
          value={tmpSupplier.delivery}
          onChange={onChangeField('delivery')}
        />
        <Field
          label={textConsts.qty}
          inputProps={{maxLength: 50}}
          value={tmpSupplier.amount}
          error={parseInt(tmpSupplier.amount) === 0 && textConsts.errorNoZero}
          onChange={onChangeField('amount')}
        />
        <Field
          label={textConsts.minLot}
          inputProps={{maxLength: 50}}
          value={tmpSupplier.minlot}
          error={parseInt(tmpSupplier.minlot) === 0 && textConsts.errorNoZero}
          onChange={onChangeField('minlot')}
        />
        <Field
          label={textConsts.lotCost}
          inputProps={{maxLength: 50}}
          value={tmpSupplier.lotcost}
          error={parseInt(tmpSupplier.lotcost) === 0 && textConsts.errorNoZero}
          onChange={onChangeField('lotcost')}
        />
        <Field
          disabled
          label={textConsts.csCode}
          value={priceCalculation(tmpSupplier.price, tmpSupplier.delivery, tmpSupplier.amount)}
        />

        <Field
          multiline
          className={classNames.commentField}
          inputProps={{maxLength: 2000}}
          rows={4}
          rowsMax={6}
          label={textConsts.comment}
          value={tmpSupplier.comment}
          onChange={onChangeField('comment')}
        />

        {outsideProduct && (
          <div className={classNames.checkboxWrapper}>
            <Typography className={classNames.checkboxText}>{textConsts.makeMainSupplier}</Typography>

            <Checkbox
              color="primary"
              checked={makeMainSupplier}
              onChange={() => setMakeMainSupplier(!makeMainSupplier)}
            />
          </div>
        )}

        <div className={classNames.bottomWrapper}>
          <div>
            <div className={classNames.imageFileInputWrapper}>
              <ImageFileInput
                images={photosOfSupplier}
                setImages={setPhotosOfSupplier}
                maxNumber={50}
                className={classNames.imageFileInput}
              />
            </div>

            <Button
              disableElevation
              disabled={tmpSupplier.images.length < 1}
              color="primary"
              className={classNames.imagesButton}
              variant="contained"
              onClick={() => setShowPhotosModal(!showPhotosModal)}
            >
              {textConsts.availablePhotos}
            </Button>
          </div>
        </div>

        <Divider className={classNames.fieldsDivider} />

        {renderFooterModalButtons()}

        {showProgress && <CircularProgressWithLabel value={progressValue} title={textConsts.circularProgressTitle} />}

        <BigImagesModal
          isAmazone
          openModal={showPhotosModal}
          setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
          images={tmpSupplier.images}
        />
      </Container>
    )
  },
)
