export const styles = theme => ({
  cardsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: `0 ${theme.spacing(-2)}px`,
  },
  cardWrapper: {
    padding: theme.spacing(2),
  },
  mb5: {
    marginBottom: theme.spacing(5),
  },

  noRows: {
    marginTop: '150px',
    color: theme.palette.text.second,
  },
})
