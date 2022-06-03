import {createStyles} from '@material-ui/core'

export const styles = createStyles(() => ({
  btnsWrapper: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  btnsLeftSide: {},
  btnsRightSide: {
    display: 'flex',
  },
  requestProposalsWrapper: {
    marginTop: '10px',
    backgroundColor: 'white',
    borderRadius: '4px',
    padding: '10px',
  },

  button: {
    marginRight: '10px',
  },

  detailsWrapper: {
    marginTop: '10px',
  },
  proposalsWrapper: {},
  chatWrapper: {
    marginTop: '20px',
    width: '100%',
    height: '880px',
  },

  proposalsTitle: {
    margin: '50px 0 20px',
  },
}))
