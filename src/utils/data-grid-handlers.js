export const onStateChangeHandler = (e, setStateFunc) => {
  if (!e.state.options.loading && !e.state.isScrolling && e.state.rows.totalRowCount) {
    setStateFunc(e.state)
  }
}
