import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalWrapper: {
    width: '700px',
  },
  modalTitle: {
    color: theme.palette.text.general,
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '140%',
    marginBottom: '30px',
  },

  boxCode: {
    display: 'flex',
    alignItems: 'center',
    margin: '48px 0px',
  },

  input: {
    width: '400px',
  },
  saveBox: {
    marginTop: '16px',
    display: 'flex',
    gap: '10px',
    justifyContent: 'end',
  },
  actionButton: {
    width: '179px',
    height: '40px',
  },

  linkWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  link: {
    width: '660px',
  },
}))
