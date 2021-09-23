import React, {useEffect} from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Modal} from '@components/modal'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {RequestToSendBatchBox} from './request-to-send-batch-box'
import {useClassNames} from './request-to-send-batch-modal.style'

const textConsts = getLocalizedTexts(texts, 'ru').requestToSendBatchModal

export const RequestToSendBatchModal = observer(
  ({
    boxesMy,
    openModal,
    setOpenModal,
    selectedBoxes,
    boxesDeliveryCosts,
    onClickSendBoxesToBatch,
    onClickRemoveBoxFromBatch,
  }) => {
    const classNames = useClassNames()
    useEffect(() => {
      if (openModal && !selectedBoxes.length) {
        setOpenModal(false)
      }
    }, [selectedBoxes, openModal])
    return (
      <Modal
        dialogContextClassName={classNames.dialogContextClassName}
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        <div className={classNames.content}>
          <Typography className={classNames.modalTitle} variant="h4">
            {textConsts.modalTitle}
          </Typography>
          <div className={classNames.boxesWrapper}>
            <table className={classNames.table} border="1">
              {boxesDeliveryCosts &&
                selectedBoxes.map((boxId, index) => {
                  const findBox = boxesMy.find(box => box._id === boxId)
                  const findRequestToSendBatchPriceForCurBox = boxesDeliveryCosts.find(
                    priceObj => priceObj.guid === findBox._id,
                  )
                  return (
                    <RequestToSendBatchBox
                      key={`requestToSendBatchModalBox_${findBox._id}_${index}`}
                      box={findBox}
                      index={index}
                      price={findRequestToSendBatchPriceForCurBox?.deliveryCost}
                      onClickRemoveBoxFromBatch={() => onClickRemoveBoxFromBatch(boxId)}
                    />
                  )
                })}
            </table>
          </div>
          <div className={classNames.warningWrapper}>
            <Typography variant="subtitle1" className={classNames.warningText}>
              {
                '* Коробки помеченные красным не будут отправлены потому что у них нет размеров или не достаточно данных'
              }
            </Typography>
          </div>
          <div className={classNames.btnsWrapper}>
            <Button disableElevation color="primary" variant="contained" onClick={onClickSendBoxesToBatch}>
              {'Отправить'}
            </Button>
          </div>
        </div>
      </Modal>
    )
  },
)
