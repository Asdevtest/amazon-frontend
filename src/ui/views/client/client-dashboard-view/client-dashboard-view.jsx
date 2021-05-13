import {Component} from 'react'

export class ClientDashBoardView extends Component {
  state = {
    activeCategory: 0,
    activeSubCategory: null,
    drawerOpen: false,
  }

  render() {
    // const {activeCategory, activeSubCategory, drawerOpen} = this.state
    // const styles = useStyles()
    return (
      <h1>ClientDashBoardView</h1>
    )
  }

  onChangeCategory = index => {
    this.setState({activeCategory: index})
  }

  onChangeSubCategory = index => {
    this.setState({activeSubCategory: index})
  }

  onTriggerDrawer = () => {
    const {drawerOpen} = this.state
    this.setState({drawerOpen: !drawerOpen})
  }
}
