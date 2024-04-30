import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  requestInformationWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  thirdBlock: {
    width: 291,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: 400,
    color: theme.palette.text.second,
  },

  announcementWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 7,
    boxShadow: theme.palette.boxShadow.paper,
    background: theme.palette.background.general,
    padding: 20,
    gap: 20,
  },

  announcementInfoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 7,
  },

  sectionText: {
    fontSize: 14,
    fontWeight: 400,
    color: theme.palette.text.general,

    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordBreak: 'break-word',
  },
}))
