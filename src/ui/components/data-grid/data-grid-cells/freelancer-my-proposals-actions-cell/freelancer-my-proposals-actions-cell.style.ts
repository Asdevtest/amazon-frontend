import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  proposalsActions: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',

    button: {
      height: '30px',
    },

    svg: {
      width: '20px !important',
      height: '20px !important',
    },
  },

  freelancerMyProposalsButton: {
    width: '30px',
  },
}))
