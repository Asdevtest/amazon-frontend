import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  heightFieldAuto: {
    height: 'auto',
    minWidth: '650px',

    padding: 0,
  },
  commentsWrapper: {
    display: 'flex',
    gap: '10px',
  },
  form: {
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(2.5),
    border: '1px solid rgb(224, 224, 224)',
    borderRadius: '5px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '15px',
  },
  modalTitle: {
    marginBottom: '20px',
  },
  subTitle: {
    color: theme.palette.text.general,
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '20px',
    marginBottom: '12px',
  },

  photoWrapper: {
    width: '200px',
  },
}))
