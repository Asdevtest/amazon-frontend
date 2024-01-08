/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Dispatch, FC, Fragment, SetStateAction, memo, useState } from 'react'

import {
  getConversion,
  getWeightSizesType,
  inchesCoefficient,
  poundsWeightCoefficient,
  unitsOfChangeOptions,
} from '@constants/configs/sizes-settings'
import { orderPriority } from '@constants/orders/order-priority'
import { TranslationKey } from '@constants/translations/translation-key'

import { UserMiniCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { SelectStorekeeperAndTariffForm } from '@components/forms/select-storkeeper-and-tariff-form'
import { CommentsModal } from '@components/modals/comments-modal'
import { GalleryModal } from '@components/modals/gallery-modal'
import { Card } from '@components/modals/my-order-modal/components'
import { CopyValue } from '@components/shared/copy-value'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { LabelWithCopy } from '@components/shared/label-with-copy'
import { Modal } from '@components/shared/modal'
import { Select } from '@components/shared/selects/select'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'
import { EyeIcon } from '@components/shared/svg-icons'
import { Switch } from '@components/shared/switch'

import { checkAndMakeAbsoluteUrl, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IDestination, IDestinationStorekeeper } from '@typings/destination'
import { IUploadFile } from '@typings/upload-file'

import { useGetDestinationTariffInfo } from '@hooks/use-get-destination-tariff-info'

import { useStyles } from './basic-info-tab.style'

interface IFieldConfig {
  title?: string
  text?: string
  element?: JSX.Element
  files?: Array<string | IUploadFile>
}

interface BasicInfoTabProps {
  order: any
  destinations: IDestination[]
  storekeepers: IDestinationStorekeeper[]
  destinationsFavourites: string[]
  setDestinationsFavouritesItem: () => void
}

export const BasicInfoTab: FC<BasicInfoTabProps> = memo(props => {
  const { order, destinations, storekeepers, destinationsFavourites, setDestinationsFavouritesItem } = props

  const { classes: styles, cx } = useStyles()

  const [showSelectionStorekeeperAndTariffModal, setShowSelectionStorekeeperAndTariffModal] = useState(false)

  const [sizeSetting, setSizeSetting] = useState(unitsOfChangeOptions.EU)

  const lengthConversion = getConversion(sizeSetting, inchesCoefficient)
  const weightConversion = getConversion(sizeSetting, poundsWeightCoefficient)
  const weightSizesType = getWeightSizesType(sizeSetting)

  const supplierInformationFieldsConfig: IFieldConfig[] = [
    {
      title: t(TranslationKey['Purchase price']),
      text:
        order?.totalPrice && order?.amount
          ? `$ ${toFixed(order?.totalPrice / order?.amount, 2)}`
          : t(TranslationKey['No data']),
      element: undefined,
    },
    {
      title: t(TranslationKey.Supplier),
      text: undefined,
      element: (
        <a
          target="_blank"
          rel="noreferrer"
          href={checkAndMakeAbsoluteUrl(order?.orderSupplier?.link)}
          className={cx(styles.fieldText, { [styles.link]: order?.orderSupplier?.link !== 'access denied' })}
          onClick={e => {
            if (order?.orderSupplier?.link === 'access denied') {
              e.preventDefault()
            }
          }}
        >
          {order?.orderSupplier?.name}
        </a>
      ),
    },
    {
      title: t(TranslationKey['Production time']),
      text: order?.orderSupplier?.productionTerm || t(TranslationKey['No data']),
      element: undefined,
    },
    {
      title: t(TranslationKey.BarCode),
      text: undefined,
      element: <LabelWithCopy labelValue={order?.product.barCode} lableLinkTitle={t(TranslationKey.View)} />,
    },
    {
      title: undefined,
      text: undefined,
      element: (
        <div className={styles.switcher}>
          <CustomSwitcher
            switchMode="small"
            condition={sizeSetting}
            switcherSettings={[
              { label: () => unitsOfChangeOptions.EU, value: unitsOfChangeOptions.EU },
              { label: () => unitsOfChangeOptions.US, value: unitsOfChangeOptions.US },
            ]}
            changeConditionHandler={condition => setSizeSetting(condition as string)} // (as string) - CustomSwitcher types bug
          />
        </div>
      ),
    },
    {
      title: t(TranslationKey.Dimensions),
      text:
        order?.product.width && order?.product.height && order?.product.length
          ? `${
              toFixed(order?.product.width / lengthConversion, 2) +
              ' x ' +
              toFixed(order?.product.height / lengthConversion, 2) +
              ' x ' +
              toFixed(order?.product.length / lengthConversion, 2)
            }`
          : t(TranslationKey['No data']),
      element: undefined,
    },
    {
      title: t(TranslationKey.Weight),
      text: order?.product.weight
        ? `${toFixed(order?.product.weight / weightConversion, 2)} ${weightSizesType}`
        : t(TranslationKey['No data']),
      element: undefined,
    },
  ]

  const [isCheckedUrgent, setIsCheckedUrgent] = useState(order?.priority === String(orderPriority.urgentPriority))
  const [isCheckedChina, setIsCheckedChina] = useState(order?.expressChinaDelivery)
  const [isCheckedResearch, setIsCheckedResearch] = useState(order?.needsResearch)

  const handleToggle = (isChecked: boolean, setIsChecked: Dispatch<SetStateAction<boolean>>) => {
    setIsChecked(!isChecked)
  }

  const { tariffName, tariffRate } = useGetDestinationTariffInfo(
    destinations,
    storekeepers,
    order?.destination?._id || order?.variationTariff?.destinationId || null,
    order?.storekeeper?._id || '',
    order?.logicsTariff?._id || '',
    order?.variationTariff?._id || null,
  )
  const currentTariffName =
    order?.storekeeper?._id && (tariffName || tariffRate)
      ? `${tariffName ? tariffName : ''}${tariffRate ? ' / ' + tariffRate + ' $' : ''}`
      : t(TranslationKey.Select)
  const selectedItem = destinations?.find(el => el?._id === order?.destination?._id)
  const selectedItems =
    order?.variationTariffId && order?.destination?._id
      ? destinations.filter(el => el?._id === order?.destination?._id)
      : destinations?.filter(el => el?.storekeeper?._id !== order?.storekeeper?._id)

  const additionalOrderInformationFieldsConfig: IFieldConfig[] = [
    {
      title: t(TranslationKey.Destination),
      element: (
        <Select
          // disabled
          withFaworites
          currentItem={selectedItem?.name}
          items={selectedItems}
          destinationsFavourites={destinationsFavourites}
          setDestinationsFavouritesItem={setDestinationsFavouritesItem}
        />
      ),
    },
    {
      title: `${t(TranslationKey['Int warehouse'])} / ${t(TranslationKey.Tariff)}`,
      element: (
        <button
          className={styles.tafiffButton}
          onClick={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
        >
          <span>{currentTariffName}</span>
        </button>
      ),
    },
    {
      title: t(TranslationKey['Mark an order as urgent']),
      element: (
        <Switch isChecked={isCheckedUrgent} onChange={() => handleToggle(isCheckedUrgent, setIsCheckedUrgent)} />
      ),
    },
    {
      title: t(TranslationKey['Order express delivery in China']),
      element: <Switch isChecked={isCheckedChina} onChange={() => handleToggle(isCheckedChina, setIsCheckedChina)} />,
    },
    {
      title: t(TranslationKey['Re-search supplier']),
      element: (
        <Switch isChecked={isCheckedResearch} onChange={() => handleToggle(isCheckedResearch, setIsCheckedResearch)} />
      ),
    },
    {
      title: t(TranslationKey['Transparency codes']),
      text: undefined,
      element: <LabelWithCopy labelValue={order?.transparencyFile} lableLinkTitle={t(TranslationKey.View)} />,
    },
    {
      title: t(TranslationKey.Buyer),
      element: (
        <UserMiniCell
          userName={order?.buyer?.name}
          userId={order?.buyer?._id}
          wrapperClassName={styles.userMiniCellWrapper}
          avatarClassName={styles.userMiniCellAvatar}
        />
      ),
    },
  ]

  const [showGalleryModal, setShowGalleryModal] = useState(false)
  const [galleryFiles, setGalleryFiles] = useState<Array<string | IUploadFile>>([])

  const handleOpenGalleryModal = (files?: Array<string | IUploadFile>) => {
    if (files && files.length > 0) {
      setGalleryFiles(files)
    } else {
      setGalleryFiles([])
    }

    setShowGalleryModal(!showGalleryModal)
  }

  const photosConfig: IFieldConfig[] = [
    {
      title: t(TranslationKey['Order photos']),
      element: <EyeIcon className={styles.eyeIcon} />,
      files: order?.images,
    },
    {
      title: t(TranslationKey['Photos of current supplier']),
      element: <EyeIcon className={styles.eyeIcon} />,
      files: order?.orderSupplier?.images,
    },
    {
      title: t(TranslationKey['Supplier payment']),
      element: <EyeIcon className={styles.eyeIcon} />,
      files: order?.paymentDetails,
    },
  ]

  const [showCommentsModal, setShowCommentsModal] = useState(false)
  const [comment, setComment] = useState({ title: '', text: '' })
  const handleChangeComment = (title?: string, text?: string) => {
    setComment(prevComment => ({ ...prevComment, title: title || '', text: text || '' }))

    setShowCommentsModal(!showCommentsModal)
  }

  const commentsConfig: IFieldConfig[] = [
    {
      title: t(TranslationKey.Buyer),
      text: order?.buyerComment,
      element: order?.buyerComment.length > 0 ? <CopyValue text={order?.buyerComment} /> : undefined,
    },
    {
      title: t(TranslationKey.Client),
      text: order?.clientComment,
      element: order?.clientComment.length > 0 ? <CopyValue text={order?.clientComment} /> : undefined,
    },
  ]

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.mainInfoBlockWrapper}>
          <div className={styles.infoBlock}>
            <p className={styles.title}>{t(TranslationKey['Supplier information'])}</p>

            <Card wrapperClassName={styles.card}>
              {supplierInformationFieldsConfig.map((item, index) => (
                <div key={index} className={styles.field}>
                  <p className={styles.fieldText}>{item.title}</p>
                  {item.element}
                  {item.text && <p className={styles.fieldText}>{item.text}</p>}
                </div>
              ))}
            </Card>
          </div>
        </div>

        <div className={styles.additionalInfoBlockWrapper}>
          <div className={styles.infoBlock}>
            <p className={styles.title}>{t(TranslationKey['Additional order information'])}</p>

            <Card wrapperClassName={styles.card}>
              {additionalOrderInformationFieldsConfig.map((item, index) => (
                <div key={index} className={styles.field}>
                  <p className={styles.fieldText}>{item.title}</p>
                  {item.element}
                  {item.text && <p className={styles.fieldText}>{item.text}</p>}
                </div>
              ))}
            </Card>
          </div>
        </div>

        <div className={styles.photosInfoBlockWrapper}>
          <div className={styles.infoBlock}>
            <p className={styles.title}>{t(TranslationKey.Photos)}</p>

            <div className={styles.cardsWrapper}>
              {photosConfig.map((item, index) => (
                <Card key={index} wrapperClassName={cx(styles.card, styles.photosCard)}>
                  <div className={styles.field}>
                    <p className={styles.fieldText}>{item.title}</p>
                    <button className={styles.fieldIconButton} onClick={() => handleOpenGalleryModal(item.files)}>
                      {item.element}
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.commentsInfoBlockWrapper}>
          <div className={styles.infoBlock}>
            <p className={styles.title}>{t(TranslationKey.Comments)}</p>

            <div className={styles.cardsWrapper}>
              {commentsConfig.map((item, index) => (
                <Card key={index} wrapperClassName={cx(styles.card, styles.cardComment)}>
                  <div className={styles.field}>
                    <p className={cx(styles.fieldText, styles.commentTitle)}>{item.title}</p>
                    {item.element}
                  </div>
                  <p className={cx(styles.commentText, styles.comment, { [styles.empty]: !item.text })}>
                    {item.text || t(TranslationKey.Empty)}
                  </p>

                  <div className={styles.fieldButtonContainer}>
                    {item.text && (
                      <button
                        className={cx(styles.commentText, styles.link)}
                        onClick={() => handleChangeComment(item.title, item.text)}
                      >
                        {t(TranslationKey['View more'])}
                      </button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showGalleryModal && (
        <GalleryModal
          files={galleryFiles}
          isOpenModal={showGalleryModal}
          onOpenModal={() => setShowGalleryModal(!showGalleryModal)}
        />
      )}

      {showCommentsModal && (
        <CommentsModal
          title={comment.title}
          text={comment.text}
          isOpenModal={showCommentsModal}
          onOpenModal={() => setShowCommentsModal(!showCommentsModal)}
        />
      )}

      {showSelectionStorekeeperAndTariffModal && (
        <Modal
          openModal={showSelectionStorekeeperAndTariffModal}
          setOpenModal={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
        >
          {/* @ts-ignore */}
          <SelectStorekeeperAndTariffForm
            showCheckbox
            RemoveDestinationRestriction
            storekeepers={storekeepers?.filter(el => el?._id === order?.storekeeper?._id)}
            curStorekeeperId={order?.storekeeperId}
            currentDestinationId={order?.destinationId}
            curTariffId={order?.logicsTariffId}
            currentVariationTariffId={order?.variationTariffId}
            onSubmit={() => {
              console.log('test')
            }}
          />
        </Modal>
      )}
    </>
  )
})
