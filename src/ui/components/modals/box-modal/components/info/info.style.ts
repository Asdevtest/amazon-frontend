import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },

  informationContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },

  informationContainerMinGap: {
    gap: 10,
  },

  informationTitle: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  informationText: {
    minWidth: 100,
    maxWidth: 200,
    fontSize: 14,
    lineHeight: '19px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: theme.palette.text.general,
  },

  informationUser: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.general,
  },

  storageInput: {
    width: 200,
    height: 30,
    borderRadius: 7,
  },

  input: {
    padding: '5px 10px',
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.general,
  },

  customGap: {
    gap: 8,
  },
}))
