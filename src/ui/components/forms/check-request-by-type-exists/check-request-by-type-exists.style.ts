import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 415,
  },

  attentionText: {
    fontWeight: 600,
    fontSize: 22,
    lineHeight: '26px',

    marginBottom: 10,
  },

  text: {
    width: 'fit-content',
    fontWeight: 400,
    fontSize: 18,
    lineHeight: '140%',
    whiteSpace: 'pre-wrap',
  },

  requestsInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    marginBottom: 50,
  },

  requestsTextWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    gap: 31,
  },

  requestInfo: {
    whiteSpace: 'pre-wrap',
    cursor: 'pointer',
    color: theme.palette.primary.main,
  },
}))
