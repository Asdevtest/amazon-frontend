export const styles = theme => ({
  editBtn: {
    padding: '0 54px',
  },

  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  leftBtnsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
  },

  button: {
    marginRight: '10px',
  },

  isDraftRow: {
    opacity: '.5',
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: 400,
    height: 36,
  },
  datagridWrapper: {
    marginTop: '20px',
    height: '82vh',
    width: '100%',
  },
})
