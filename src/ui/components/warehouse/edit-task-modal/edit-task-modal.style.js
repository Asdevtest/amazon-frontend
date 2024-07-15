import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '1440px',
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
  },

  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: '18px',
    lineHeight: '25px',
    fontWeight: 600,
  },

  modalSubHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },

  typeTaskWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },

  typeTaskTitle: {
    fontSize: '18px',
    lineHeight: '25px',
    fontWeight: 600,
    color: theme.palette.text.second,
  },

  form: {
    position: 'relative',
    height: 600,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  commentsAndFilesWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },

  commentsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  horizontalDivider: {
    backgroundColor: '#E0E0E0',
  },

  imageFileInputWrapper: {
    width: '50%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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

  errorText: {
    color: theme.palette.text.red,
  },

  buttonsWrapper: {
    position: 'sticky',
    bottom: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '20px',
  },
}))
