import {Button, Divider} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Field} from '@components/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './send-own-product-form.style'

const textConsts = getLocalizedTexts(texts, 'en').clientSendOwnProductForm

const formFields = {
  productName: '',
  linkAmazon: '',
  linkImg: '',
  productWeight: '',
  productSize: '',
  provider0: '',
  provider1: '',
  provider2: '',
  clientComment: '',
}

export const SendOwnProductForm = ({onSubmit}) => {
  const classNames = useClassNames()
  return (
    <div className={classNames.root}>
      <div className={classNames.form}>
        <Field containerClasses={classNames.field} label={textConsts.productNameLabel} value={formFields.productName} />

        <div className={classNames.fieldWithBtn}>
          <Field containerClasses={classNames.field} label={textConsts.linkAmazonLabel} value={formFields.linkAmazon} />
          <Button
            disableElevation
            color="primary"
            className={classNames.inlineBtn}
            variant="contained"
            onClick={() => alert('parse product')}
          >
            {textConsts.parseBtn}
          </Button>
        </div>

        <Divider className={classNames.divider} />

        <div className={classNames.fieldWithBtn}>
          <Field containerClasses={classNames.field} label={textConsts.linkImgLabel} value={formFields.linkImg} />
          <Button
            disableElevation
            color="primary"
            className={classNames.inlineBtn}
            variant="contained"
            onClick={() => alert('download img')}
          >
            {textConsts.downloadBtn}
          </Button>
        </div>
        <Field containerClasses={classNames.field} label={textConsts.productSizeLabel} value={formFields.productSize} />

        <div className={classNames.providersWrapper}>
          <Field label={textConsts.providerLabel} value={formFields.provider0} />
          <Field label={textConsts.providerLabel} value={formFields.provider1} />
          <Field label={textConsts.providerLabel} value={formFields.provider2} />
        </div>

        <Field
          multiline
          rows={4}
          rowsMax={6}
          className={classNames.multiline}
          containerClasses={classNames.field}
          label={textConsts.clientCommentsLabel}
          placeholder={textConsts.clientCommentsPlaceholder}
          value={formFields.clientComments}
        />
      </div>
      <Button disableElevation className={classNames.submit} color="primary" variant="contained" onClick={onSubmit}>
        {textConsts.addProductBtn}
      </Button>
    </div>
  )
}
