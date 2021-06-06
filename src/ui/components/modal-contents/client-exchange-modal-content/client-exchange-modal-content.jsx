import {TableBody, TableContainer, TableHead, Typography, Table as MuiTable, Button} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {texts} from '@constants/texts'

import {ExchangeModalBodyRow} from '@components/table-rows/client/exchange'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {styles} from './client-exchange-modal-content.style'

const textConsts = getLocalizedTexts(texts, 'en').clientExchnageModalContent

const ClientExchnageModalContentRaw = ({
  qty,
  managerIndex,
  item,
  handlers,
  modalHeadRow,
  classes: classNames,
  onClickOrderNowBtn,
  onClickCancelBtn,
}) => (
  <>
    <Typography variant="h5">{textConsts.title}</Typography>
    <TableContainer className={classNames.modalTableWrapper}>
      <MuiTable>
        <TableHead>{modalHeadRow}</TableHead>
        <TableBody>
          <ExchangeModalBodyRow qty={qty} managerIndex={managerIndex} item={item} handlers={handlers} />
        </TableBody>
      </MuiTable>
    </TableContainer>
    <div className={classNames.btnsWrapper}>
      <Button color="primary" variant="contained" onClick={onClickOrderNowBtn}>
        {textConsts.orderNowBtn}
      </Button>
      <Button disableElevation className={classNames.cancelBtn} variant="contained" onClick={onClickCancelBtn}>
        {textConsts.cancelBtn}
      </Button>
    </div>
  </>
)

export const ClientExchnageModalContent = withStyles(styles)(ClientExchnageModalContentRaw)
