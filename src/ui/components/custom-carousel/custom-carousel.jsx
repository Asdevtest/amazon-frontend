import {cx} from '@emotion/css'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import InboxIcon from '@mui/icons-material/Inbox'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import {Avatar, Link, Typography} from '@mui/material'

import {Children, cloneElement, useEffect, useState} from 'react'

import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {BigImagesModal} from '@components/modals/big-images-modal'

import {checkIsImageLink} from '@utils/checks'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {shortenDocumentString} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './custom-carousel.style'

export const RIGHT_BLOCK_WIDTH = 100

export const CustomCarousel = observer(
  ({children, title, view = 'simple', alignButtons = 'center', index, onChengeIndex}) => {
    const {classes: classNames} = useClassNames()
    const [clides, setClides] = useState([])
    const [offset, setOffset] = useState(index ? -RIGHT_BLOCK_WIDTH * index : 0)

    const [slideCount, setSlideCount] = useState(index ? index + 1 : 1)

    const [carouselIsMounted, setCarouselIsMounted] = useState(false)

    useEffect(() => {
      setCarouselIsMounted(true)
    }, [])

    useEffect(() => {
      if (index === undefined) {
        return
      }

      setSlideCount(index + 1)
    }, [index])

    useEffect(() => {
      if (index === undefined) {
        return
      }
      setOffset(-RIGHT_BLOCK_WIDTH * index)
    }, [index])

    useEffect(() => {
      if (!onChengeIndex || !carouselIsMounted) {
        return
      }
      onChengeIndex(slideCount - 1)
    }, [slideCount])

    // console.log('slideCount', slideCount)
    // console.log('index', index)

    const handleLeftArrowClick = () => {
      setOffset(currentOffset => {
        const newOffset = currentOffset + RIGHT_BLOCK_WIDTH

        return Math.min(newOffset, 0)
      })

      if (slideCount > 1) {
        setSlideCount(prev => prev - 1)
        // onChengeIndex(slideCount)
      }
    }

    const handleRightArrowClick = () => {
      setOffset(currentOffset => {
        const newOffset = currentOffset - RIGHT_BLOCK_WIDTH

        const maxOffset = -(RIGHT_BLOCK_WIDTH * (clides.length - 1))

        return Math.max(newOffset, maxOffset)
      })

      if (slideCount < children.length) {
        setSlideCount(prev => prev + 1)
        // onChengeIndex(slideCount - 2)
      }
    }

    useEffect(() => {
      setClides(
        Children.map(children, child =>
          cloneElement(child, {
            style: {
              height: '100%',
              minWidth: `${RIGHT_BLOCK_WIDTH}%`,
              maxWidth: `${RIGHT_BLOCK_WIDTH}%`,
            },
          }),
        ),
      )
    }, [SettingsModel.languageTag, children])

    return (
      <div className={classNames.mainContainer}>
        {view === 'simple' && children?.length !== 0 && (
          <div className={classNames.headerCarouselDocumentsWrapper}>
            <div className={classNames.buttonDocumentsWrapper}>
              {alignButtons === 'center' ? (
                <ArrowLeftIcon
                  style={{cursor: offset === 0 ? 'initial' : 'pointer', width: '40px', height: '40px'}}
                  // color={offset === 0 ? 'disabled' : 'primary'}
                  className={cx(classNames.arrowIcon, {[classNames.arrowDisabledIcon]: offset === 0})}
                  onClick={handleLeftArrowClick}
                />
              ) : null}

              <div className={classNames.window}>
                <div className={classNames.allClides} style={{transform: `translateX(${offset}%)`}}>
                  {clides}
                </div>
              </div>
              {alignButtons === 'center' ? (
                <ArrowRightIcon
                  style={{
                    cursor: offset === -(RIGHT_BLOCK_WIDTH * children?.length) + 100 ? 'initial' : 'pointer',
                    width: '40px',
                    height: '40px',
                  }}
                  // color={offset === -(RIGHT_BLOCK_WIDTH * children.length) + 100 ? 'disabled' : 'primary'}
                  className={cx(classNames.arrowIcon, {
                    [classNames.arrowDisabledIcon]: offset === -(RIGHT_BLOCK_WIDTH * children?.length) + 100,
                  })}
                  onClick={handleRightArrowClick}
                />
              ) : null}
            </div>
            {alignButtons === 'center' ? (
              <div className={classNames.numberOfFiles}>
                <Typography color="primary">{`${slideCount}/${children?.length}`}</Typography>
              </div>
            ) : (
              <div className={classNames.numberOfFilesFlex}>
                <ArrowLeftIcon
                  style={{cursor: offset === 0 ? 'initial' : 'pointer', width: '40px', height: '40px'}}
                  // color={offset === 0 ? 'disabled' : 'primary'}
                  className={cx(classNames.arrowIcon, {[classNames.arrowDisabledIcon]: offset === 0})}
                  onClick={handleLeftArrowClick}
                />
                <Typography color="primary">{`${slideCount}/${children?.length}`}</Typography>
                <ArrowRightIcon
                  style={{
                    cursor: offset === -(RIGHT_BLOCK_WIDTH * children?.length) + 100 ? 'initial' : 'pointer',
                    width: '40px',
                    height: '40px',
                  }}
                  // color={offset === -(RIGHT_BLOCK_WIDTH * children.length) + 100 ? 'disabled' : 'primary'}
                  className={cx(classNames.arrowIcon, {
                    [classNames.arrowDisabledIcon]: offset === -(RIGHT_BLOCK_WIDTH * children?.length) + 100,
                  })}
                  onClick={handleRightArrowClick}
                />
              </div>
            )}
          </div>
        )}
        {view === 'complex' && children?.length !== 0 && (
          <div>
            <div className={classNames.headerCarouselWrapper}>
              <div className={classNames.buttonWrapper}>
                <ArrowLeftIcon
                  style={{cursor: offset === 0 ? 'initial' : 'pointer'}}
                  // color={offset === 0 ? 'disabled' : 'primary'}
                  className={cx(classNames.arrowIcon, {[classNames.arrowDisabledIcon]: offset === 0})}
                  onClick={handleLeftArrowClick}
                />
                <Typography className={classNames.proposalCount}>{`${title} №${slideCount}`}</Typography>

                <ArrowRightIcon
                  style={{cursor: offset === -(RIGHT_BLOCK_WIDTH * children?.length) + 100 ? 'initial' : 'pointer'}}
                  // color={offset === -(RIGHT_BLOCK_WIDTH * children.length) + 100 ? 'disabled' : 'primary'}
                  className={cx(classNames.arrowIcon, {
                    [classNames.arrowDisabledIcon]: offset === -(RIGHT_BLOCK_WIDTH * children?.length) + 100,
                  })}
                  onClick={handleRightArrowClick}
                />
              </div>
              <div className={classNames.numberOfProposals}>
                <Typography color="primary">{`${slideCount}/${children?.length}`}</Typography>
              </div>
            </div>

            <div className={classNames.window}>
              <div className={classNames.allPages} style={{transform: `translateX(${offset}%)`}}>
                {clides}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  },
)
export const openPdfFile = url => {
  const pdfWindow = window.open('')

  pdfWindow.document.write(`<iframe width='100%' height='1000%' src='${url}'></iframe>`)
}

export const PhotoAndFilesCarousel = ({
  files,
  width,
  small = false,
  direction = 'row',
  notToShowEmpty = false,
  withoutPhotos,
  whithoutFiles,
  imagesTitles = [],
}) => {
  const {classes: classNames} = useClassNames()
  const [bigImagesOptions, setBigImagesOptions] = useState({images: [], imgIndex: 0})
  const [showPhotosModal, setShowPhotosModal] = useState(false)

  const notEmptyFiles = files?.length
    ? files.filter(el => (el?.file?.name ? !checkIsImageLink(el?.file?.name) : !checkIsImageLink(el)))
    : []
  const notEmptyPhotos = files?.length ? files.filter(el => checkIsImageLink(el?.file?.name || el)) : []

  return files?.length ? (
    <div
      className={direction === 'column' ? classNames.imagesAndFilesWrapperColumn : classNames.imagesAndFilesWrapper}
      style={{
        width,
        flexDirection: direction === 'column' ? 'column' : 'row',
      }}
    >
      {!withoutPhotos && (
        <>
          {(notToShowEmpty && notEmptyPhotos?.length) || !notToShowEmpty ? (
            <div className={cx(classNames.imagesWrapper, {[classNames.notToShowEmptyWrapper]: notToShowEmpty})}>
              {notEmptyPhotos?.length ? (
                <CustomCarousel>
                  {notEmptyPhotos.map((photo, index) => (
                    <div key={index} className={classNames.imageSubWrapper}>
                      <>
                        <Avatar
                          key={index}
                          variant="square"
                          alt={'!'}
                          src={photo?.data_url || photo}
                          className={classNames.image}
                          classes={{img: small ? classNames.smallImage : classNames.image}}
                          onClick={() => {
                            setShowPhotosModal(!showPhotosModal)

                            setBigImagesOptions({
                              images: files
                                .filter(el => checkIsImageLink(el?.file?.name || el))
                                .map(img => img?.data_url || img),
                              imgIndex: index,
                            })
                          }}
                        />

                        {imagesTitles[index] && (
                          <Typography className={classNames.imageTitle}>{imagesTitles[index]}</Typography>
                        )}
                      </>
                    </div>
                  ))}
                </CustomCarousel>
              ) : (
                <div className={classNames.emptyIconWrapper}>
                  <div className={classNames.emptyWrapper}>
                    <div className={classNames.emptyIcon}>
                      <PhotoCameraIcon style={{color: '#C4C4C4', fontSize: '30px'}} />
                    </div>
                    <Typography className={classNames.noPhotoText}>{t(TranslationKey['No photos'])}</Typography>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </>
      )}

      {!whithoutFiles && (
        <>
          {(notToShowEmpty && notEmptyFiles?.length) || !notToShowEmpty ? (
            <div className={cx(classNames.documentsWrapper, {[classNames.notToShowEmptyWrapper]: notToShowEmpty})}>
              {notEmptyFiles?.length ? (
                <CustomCarousel>
                  {notEmptyFiles.map((file, index) =>
                    file?.data_url ? (
                      <div
                        key={index}
                        className={classNames.documentWrapper}
                        onClick={() => file.data_url && openPdfFile(file.data_url)}
                      >
                        <InsertDriveFileIcon color="primary" style={{width: '40px', height: '40px'}} />
                        <Typography className={classNames.documentTitle}>
                          {shortenDocumentString(file?.file?.name ? file?.file?.name : file)}
                        </Typography>
                        <span className={classNames.documentHover}>{file?.file?.name || file}</span>
                      </div>
                    ) : (
                      <Link key={index} href={file} className={classNames.documentWrapper} target="__blank">
                        <InsertDriveFileIcon color="primary" style={{width: '40px', height: '40px'}} />
                        <Typography className={classNames.documentTitle}>
                          {shortenDocumentString(file?.file?.name ? file?.file?.name : file)}
                        </Typography>
                        <span className={classNames.documentHover}>{file?.file?.name || file}</span>
                      </Link>
                    ),
                  )}
                </CustomCarousel>
              ) : (
                <div className={classNames.emptyIconWrapper}>
                  <div className={classNames.emptyWrapper}>
                    <div className={classNames.emptyIcon}>
                      <InboxIcon style={{color: '#C4C4C4', fontSize: '30px'}} />
                    </div>
                    <Typography className={classNames.emptyDocs}>{t(TranslationKey['No documents'])}</Typography>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </>
      )}

      <BigImagesModal
        openModal={showPhotosModal}
        setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
        images={bigImagesOptions.images}
        imgIndex={bigImagesOptions.imgIndex}
      />
    </div>
  ) : (
    <div className={classNames.emptyProposalsIconWrapper}>
      <div className={classNames.emptyProposalsIcon}>
        <InboxIcon style={{color: '#C4C4C4', fontSize: '76px', padding: 10}} />
      </div>
      <div className={classNames.emptyProposalsDescriptionWrapper}>
        <Typography className={classNames.emptyProposalsTitle}>{t(TranslationKey['No files added'])}</Typography>
      </div>
    </div>
  )
}

export const PhotoAndFilesCarouselMini = ({files, width, small = false, direction = 'row', notToShowEmpty = false}) => {
  const {classes: classNames} = useClassNames()
  const [bigImagesOptions, setBigImagesOptions] = useState({images: [], imgIndex: 0})
  const [showPhotosModal, setShowPhotosModal] = useState(false)

  const notEmptyFiles = files?.length
    ? files.filter(el => (el?.file?.name ? !checkIsImageLink(el?.file?.name) : !checkIsImageLink(el)))
    : []
  const notEmptyPhotos = files?.length ? files.filter(el => checkIsImageLink(el?.file?.name || el)) : []

  return files?.length ? (
    <div
      className={direction === 'column' ? classNames.imagesAndFilesWrapperColumn : classNames.imagesAndFilesWrapperMini}
      style={{
        width,
        flexDirection: direction === 'column' ? 'column' : 'row',
      }}
    >
      {(notToShowEmpty && notEmptyPhotos?.length) || !notToShowEmpty ? (
        <div className={cx(classNames.imagesWrapper, {[classNames.notToShowEmptyWrapper]: notToShowEmpty})}>
          {notEmptyPhotos?.length ? (
            <CustomCarousel>
              {notEmptyPhotos.map((photo, index) => (
                <Avatar
                  key={index}
                  variant="square"
                  alt={'!'}
                  src={photo?.data_url || photo}
                  className={classNames.image}
                  classes={{img: small ? classNames.smallImage : classNames.image}}
                  onClick={() => {
                    setShowPhotosModal(!showPhotosModal)

                    setBigImagesOptions({
                      images: files
                        .filter(el => checkIsImageLink(el?.file?.name || el))
                        .map(img => img?.data_url || img),
                      imgIndex: index,
                    })
                  }}
                />
              ))}
            </CustomCarousel>
          ) : (
            <div className={classNames.emptyIconWrapper}>
              <div className={classNames.emptyWrapper}>
                <div className={classNames.emptyIcon}>
                  <PhotoCameraIcon style={{color: '#C4C4C4', fontSize: '30px'}} />
                </div>
                <Typography className={classNames.noPhotoText}>{t(TranslationKey['No photos'])}</Typography>
              </div>
            </div>
          )}
        </div>
      ) : null}

      {(notToShowEmpty && notEmptyFiles?.length) || !notToShowEmpty ? (
        <div className={cx(classNames.documentsWrapper, {[classNames.notToShowEmptyWrapper]: notToShowEmpty})}>
          {notEmptyFiles?.length ? (
            <CustomCarousel>
              {notEmptyFiles.map((file, index) =>
                file?.data_url ? (
                  <div
                    key={index}
                    className={classNames.documentWrapper}
                    onClick={() => file.data_url && openPdfFile(file.data_url)}
                  >
                    <InsertDriveFileIcon color="primary" style={{width: '60px', height: '60px'}} />
                    <Typography className={classNames.documentTitle}>
                      {shortenDocumentString(file?.file?.name ? file?.file?.name : file)}
                    </Typography>
                    <span className={classNames.documentHover}>{file?.file?.name || file}</span>
                  </div>
                ) : (
                  <Link key={index} href={file} className={classNames.documentWrapper} target="__blank">
                    <InsertDriveFileIcon color="primary" style={{width: '60px', height: '60px'}} />
                    <Typography className={classNames.documentTitle}>
                      {shortenDocumentString(file?.file?.name ? file?.file?.name : file)}
                    </Typography>
                    <span className={classNames.documentHover}>{file?.file?.name || file}</span>
                  </Link>
                ),
              )}
            </CustomCarousel>
          ) : (
            <div className={classNames.emptyIconWrapper}>
              <div className={classNames.emptyWrapperMini}>
                <div className={classNames.emptyIconMini}>
                  <InboxIcon style={{color: '#C4C4C4', fontSize: '40px', padding: 10}} />
                </div>
                <Typography className={classNames.emptyDocs}>{t(TranslationKey['No documents'])}</Typography>
              </div>
            </div>
          )}
        </div>
      ) : null}
      <BigImagesModal
        openModal={showPhotosModal}
        setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
        images={bigImagesOptions.images}
        imgIndex={bigImagesOptions.imgIndex}
      />
    </div>
  ) : (
    <div className={classNames.emptyProposalsIconWrapperMini}>
      <div className={classNames.emptyProposalsIconMini}>
        <InboxIcon style={{color: '#C4C4C4', fontSize: '40px', padding: 10}} />
      </div>
      <div className={classNames.emptyProposalsDescriptionWrapper}>
        <Typography className={classNames.emptyProposalsTitleMini}>{t(TranslationKey['No files added'])}</Typography>
      </div>
    </div>
  )
}

export const PhotoCarousel = observer(({files, isAmazonPhoto, view, alignButtons, small = false, imageClass}) => {
  const {classes: classNames} = useClassNames()
  const [bigImagesOptions, setBigImagesOptions] = useState({images: [], imgIndex: 0})
  const [showPhotosModal, setShowPhotosModal] = useState(false)

  const notEmptyPhotos = isAmazonPhoto
    ? files?.map(el => getAmazonImageUrl(el, true))
    : files?.filter(el => checkIsImageLink(el?.file?.name || el))

  return files?.length ? (
    <div className={classNames.imagesCarouselWrapper}>
      <div className={classNames.imageWrapper}>
        {notEmptyPhotos?.length ? (
          <CustomCarousel view={view || 'simple'} alignButtons={alignButtons || 'center'}>
            {notEmptyPhotos.map((photo, index) => (
              <Avatar
                key={index}
                variant="square"
                alt={'!'}
                src={photo?.data_url || photo}
                classes={{img: small ? classNames.smallImage : imageClass ? imageClass : classNames.image}}
                onClick={() => {
                  setShowPhotosModal(!showPhotosModal)

                  setBigImagesOptions({
                    images: isAmazonPhoto
                      ? files?.map(el => getAmazonImageUrl(el, true))
                      : files?.filter(el => checkIsImageLink(el?.file?.name || el)).map(img => img?.data_url || img),

                    imgIndex: index,
                  })
                }}
              />
            ))}
          </CustomCarousel>
        ) : (
          <div className={classNames.emptyIconWrapper}>
            <div className={classNames.emptyIcon}>
              <PhotoCameraIcon style={{color: '#C4C4C4', fontSize: '40px'}} />
            </div>
          </div>
        )}
      </div>

      <BigImagesModal
        openModal={showPhotosModal}
        setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
        images={bigImagesOptions.images}
        imgIndex={bigImagesOptions.imgIndex}
      />
    </div>
  ) : (
    <div className={classNames.emptyIconWrapper}>
      <div className={classNames.emptyWrapper}>
        <div className={classNames.emptyIcon}>
          <PhotoCameraIcon style={{color: '#C4C4C4', fontSize: '30px'}} />
        </div>
        <Typography className={classNames.noPhotoText}>{t(TranslationKey['No photos'])}</Typography>
      </div>
    </div>
  )
})
