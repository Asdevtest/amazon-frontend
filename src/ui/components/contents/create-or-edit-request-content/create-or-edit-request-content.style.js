import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  mainWrapper: {
    position: 'relative',
    padding: 20,
    height: '100%',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: theme.palette.background.general,
    borderRadius: 20,
  },

  header: {
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  headerColumn: {
    flexDirection: 'column',
    gap: 10,
  },

  title: {
    width: '100%',
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
    color: theme.palette.text.general,
  },

  subTitle: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  text: {
    fontSize: '16px',
    lineHeight: '22px',
    color: theme.palette.text.general,
  },

  stepWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
  },

  stepContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  field: {
    height: 40,
    width: '100%',
  },

  requestTypeField: {
    maxWidth: 250,
  },

  fieldContainer: {
    marginBottom: 0,
  },

  datePicker: {
    div: {
      height: 40,
    },
  },

  label: {
    marginBottom: 5,
    fontSize: 12,
    lineHeight: '16px',
    color: theme.palette.text.second,
  },

  fields: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 20,
  },

  deadlineErrorText: {
    color: theme.palette.text.red,
  },

  checkbox: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },

  defaultMarginTop: {
    marginTop: 10,
  },

  fireIcon: {
    width: '19px !important',
    height: '19px !important',
  },

  executorWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
  },

  advices: {
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  advice: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  point: {
    width: 5,
    height: 5,
    minWidth: 5,
    borderRadius: '50%',
    background: theme.palette.primary.main,
  },

  link: {
    margin: '0 5px',
  },

  fieldsDataWrapper: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  fieldsData: {
    width: '100%',
    display: 'flex',
    gap: 20,
  },

  fieldsDataColumn: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  buttonsWrapper: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    gap: 20,
  },

  buttons: {
    position: 'fixed',
    bottom: 160,
    right: 40,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 20,
  },

  arrowIcon: {
    opacity: 0.2,
  },

  steps: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  stepPagination: {
    display: 'flex',
    alignItems: 'center',
  },

  stepPaginationBar: {
    height: '2px',
    width: '225px',
    backgroundColor: '#C4c4c4',
  },

  stepPaginationStartBar: {
    width: '12px',
    height: '12px',
    backgroundColor: '#00B746',
    borderRadius: '50%',
  },

  stepPaginationEndBar: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
  },

  step: {
    backgroundColor: '#00B746',
    height: '2px',
  },

  stepTitle: {
    margin: '0',
    padding: '0',
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '400',
    color: theme.palette.primary.main,
  },

  middleStepTwoWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
  },

  middleStepTwoSubWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '20px',
  },

  titleAndAsinWrapper: {
    display: 'flex',
    gap: 20,
  },

  resultText: {
    fontSize: '14px',
    lineHeight: '19px',
    fontWeight: 600,
    color: theme.palette.text.general,
    wordBreak: 'break-word',
  },

  infoColumn: {
    width: 'calc(100% / 3)',
    display: 'flex',
    flexDirection: 'column',
  },

  pricesWrapper: {
    display: 'flex',
    gap: 5,
  },

  twoStepFieldResult: {
    color: theme.palette.text.main,
  },

  newPrice: {
    color: theme.palette.text.red,
  },

  oldPrice: {
    textDecoration: 'line-through',
  },

  infoTextWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  performerWrapperStepTwo: {
    display: 'flex',
    flexDirection: 'column',
  },

  performerDescriptionText: {
    maxHeight: 76,
    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    wordWrap: 'break-word',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },

  buttonSelect: {
    width: 200,
  },

  editorWrapper: {
    marginTop: 10,
  },

  editorClassName: {
    height: 245,
  },

  customItemsWrapper: {
    padding: '0 10px',
  },

  seoInfoText: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.red,
  },
}))
