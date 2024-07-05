import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '1510px',
    display: 'flex',
    padding: '10px 20px',
    height: '100%',
    flexDirection: 'column',
    position: 'relative',
  },

  buttonsMainWrapper: {
    display: 'flex',
    justifyContent: 'end',
    paddingTop: 20,
  },

  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: '30px',
    lineHeight: '41px',
    fontWeight: 600,
    color: theme.palette.text.general,
  },
  typeTaskWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  typeTaskTitle: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: 600,
    color: theme.palette.text.second,
  },
  typeTaskSubTitle: {
    fontSize: '30px',
    lineHeight: '41px',
    fontWeight: 600,
    color: theme.palette.text.general,
  },
  form: {
    maxHeight: 606,
    overflowY: 'auto',
    paddingRight: 20,
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(2.5),
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: '1fr 1fr 1fr',
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '20px',
  },

  subTitle: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: 600,
    color: theme.palette.text.general,
    gridColumn: '1 / 4',
  },
  field: {
    flexBasis: '100%',
  },
  multiline: {
    height: 'auto',
    width: '100%',
  },

  horizontalDivider: {
    backgroundColor: '#E0E0E0',
    gridColumn: '1 / 4',
  },

  newBoxes: {
    marginBottom: '20px',
  },
  box: {
    minWidth: '300px',
  },

  img: {
    width: '32px',
    height: '32px',
    marginRight: '4px',
  },

  title: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    marginRight: '10px',
    width: '160px',
  },

  input: {
    fontSize: '14px',
    textAlign: 'center',
  },
  heightFieldAuto: {
    height: 106,
    width: 330,

    padding: 0,
    border: `1px solid ${theme.palette.input.customBorder}`,
  },

  storekeeperCommentField: {
    width: 330,
    height: '100%',
  },

  commentsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',

    width: '100%',
  },

  commentsWrapper: {
    display: 'flex',
    gap: '10px',
  },

  imageFileInputWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  commentsAndFilesWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gridColumn: '1 / 4',
  },

  buttons: {
    display: 'flex',
    gap: '20px',
  },

  buttonWrapper: {
    display: 'flex',
    justifyContent: 'end',
  },

  boxSvgContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 2,
  },
  bigBoxSvg: {
    height: 32,
    width: 32,
  },
  boxArrowSvg: {
    height: '12px !important',
    width: '12px !important',
    color: theme.palette.primary.main,
  },

  modalSubHeader: {
    display: 'flex',
    alignItems: 'center',
  },

  errorText: {
    color: theme.palette.text.red,
  },
}))
