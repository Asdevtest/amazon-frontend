import React from 'react'

import {Box, Button} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {texts} from '@constants/texts'

import {SuccessButton} from '@components/buttons/success-button'
import {Field} from '@components/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {styles} from './reasearcher-add-product-form.style'

const textConsts = getLocalizedTexts(texts, 'en').researcherAddProductForm

export const ResearcherAddProductFormRaw = observer(
  ({
    formFields,
    onChangeFormFields,
    onClickCheckBtn,
    onClickAddBtn,
    classes: classNames,
    errorMsg,
    chekedCode,
    actionStatus,
  }) => (
    <React.Fragment>
      <div className={classNames.fieldsWrapper}>
        <Field
          label={textConsts.linkAmazon}
          value={formFields.amazonLink}
          onChange={onChangeFormFields('amazonLink')}
        />
        <Field
          disabled
          label={textConsts.codeOfGood}
          value={formFields.productCode}
          onChange={onChangeFormFields('productCode')}
        />
      </div>
      {errorMsg ? (
        <Alert className={classNames.alert} elevation={0} severity="error">
          {errorMsg}
        </Alert>
      ) : undefined}
      {!errorMsg && actionStatus === loadingStatuses.success ? (
        <Alert className={classNames.alert} elevation={0} severity="success">
          {textConsts.successActionAlert}
        </Alert>
      ) : undefined}
      <Box className={classNames.btnsWrapper}>
        <Button variant="contained" color="primary" className={classNames.button} onClick={onClickCheckBtn}>
          {textConsts.buttonCheck}
        </Button>
        <SuccessButton disabled={chekedCode === '' || errorMsg} onClick={onClickAddBtn}>
          {textConsts.buttonAdd}
        </SuccessButton>
      </Box>
    </React.Fragment>
  ),
)

export const ResearcherAddProductForm = withStyles(styles)(ResearcherAddProductFormRaw)
