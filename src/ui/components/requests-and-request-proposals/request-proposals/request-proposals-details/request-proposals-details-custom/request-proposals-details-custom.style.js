import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  root: {
    width: '100%',
  },
  requestProposalsWrappper: {
    marginTop: '10px',
  },
  requestProposalWrapper: {
    width: '100%',
    padding: '10px 10px',
    borderStyle: 'solid',
    borderWidth: 0,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  requestProposalWrapperNotFirst: {
    borderTopWidth: 0,
  },
}))
