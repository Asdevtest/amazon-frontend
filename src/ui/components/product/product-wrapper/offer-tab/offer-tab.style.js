import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  mainWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: '5px',
    width: '100%',
  },

  sideBlockWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: '15px',
    width: '50%',
    padding: '16px',
  },

  title: {
    fontSize: '24px',
    lineHeight: '20px',
    color: 'rgba(61, 81, 112, 1)',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: '24px',
  },
  descriptionProduct: {
    height: 'auto',
    width: '100%',
    display: 'block',
  },
  text: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '22px',
  },
  label: {
    fontSize: '16px',
    lineHeight: '20px',
    color: 'rgba(61, 81, 112, 1)',
    fontWeight: '600',
    marginBottom: '12px',
  },
  boxCode: {
    display: 'flex',
    alignItems: 'center',
    margin: '48px 0px',
  },
  modalText: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
  },
  typoCode: {
    marginRight: '8px',
  },
  input: {
    width: '400px',
  },
  imgBox: {
    width: '400px',
    height: '400px',
    objectFit: 'center',
    transition: '.2s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },

  bigImg: {
    height: '70vh',
    objectFit: 'center',
  },
  competitorsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  competitorTypo: {
    height: '60px',
    maxWidth: '400px',
    whiteSpace: 'nowrap',
    overflowX: 'scroll',
  },
}))
