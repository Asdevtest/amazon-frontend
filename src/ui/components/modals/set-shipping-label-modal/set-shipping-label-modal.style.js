import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalWrapper: {
    width: '100%',
  },

  modalTitle: {
    marginBottom: 30,
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '25px',
    color: theme.palette.text.general,
  },

  uploadInput: {
    margin: '0 15px 0 5px',
  },

  linkWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  link: {
    width: 350,
    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
  },

  saveBox: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  actionButton: {
    width: 170,
    height: 40,
  },
}))
