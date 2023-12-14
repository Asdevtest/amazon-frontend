import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  requestInformationWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  firstBlock: {
    width: 380,
  },

  priorityWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: 400,
    color: theme.palette.text.second,
  },

  priorityIcon: {
    width: 16,
    height: 18,
  },

  prioritySubWrapper: {
    display: 'flex',
    gap: 5,
  },

  requestInformationCardWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 7,
    background: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.paper,
    padding: 20,
  },

  requestInformation: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  requestInformationCardInfoTitles: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  sectionSubTitle: {
    fontSize: 12,
    fontWeight: 400,
    color: theme.palette.text.second,
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

  requestMoreInformation: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 15,
  },

  moreInformationSection: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 7,
  },

  linkSpan: {
    color: theme.palette.primary.main,
  },
}))
