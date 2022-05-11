import {createStyles} from '@material-ui/core'

export const styles = createStyles(() => ({
  proposalFormWrapper: {
    marginTop: '10px',
    backgroundColor: 'white',
    borderRadius: '4px',
    padding: '10px',
  },
  backBtnWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '30px',
  },
  chatWrapper: {
    marginTop: '20px',
    width: '100%',
  },
  resultButtonsWrapper: {
    margin: '20px 0',
    height: '90px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
}))
