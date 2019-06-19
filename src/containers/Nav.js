import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'
import PeopleIcon from '@material-ui/icons/People'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { Link } from 'react-router-dom'

const styles = theme => ({
  root: {
    width: '100%',
    // backgroundColor: "#2E7D32" /* Green background with 30% opacity */
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    textDecoration: 'none',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 10,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'flex',
  },
})


class Nav extends PureComponent {
  state = {
    auth: true,
    anchorEl: null,
    searchInput: ''
  }

  handleSearch = (e) => {
    this.setState({
      searchInput: e.target.value
    })
  }

  handleProfileMenuOpen = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  }

  logout = () => {
    this.props.handleLogout()
    this.handleMenuClose()
  }

  render() {
    const { anchorEl } = this.state;
    const { classes, searchInput, handleSearch, loggedIn, user } = this.props
    const isMenuOpen = Boolean(anchorEl)

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem component= { Link } to="/posts/new" onClick={this.handleMenuClose}>New Post</MenuItem>
        <MenuItem component={ Link } to="/profile" onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem component={ Link } to="/profile/edit" onClick={this.handleMenuClose}>My account</MenuItem>
        <MenuItem component={ Link } to="/login" onClick={this.logout}>Log Out</MenuItem>
      </Menu>
    )

      return (
      <div className={classes.root}>
        <AppBar classes={{root: classes.root}} position="static">
          <Toolbar>
            {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer"> */}
            <PeopleIcon style={{"margin": "0 10px 0 0"}}/>
            {/* </IconButton> */}
            <Typography component={ Link } to="/" className={classes.title} variant="h6" color="inherit" noWrap>
              myTowne{user.town !== undefined ? ` (${user.town})` : null}
            </Typography>
            {!loggedIn ?
            null :
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search Posts…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={searchInput}
                onChange={handleSearch}
              />
            </div>
            }

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {loggedIn ? (
                <IconButton
                  aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              ) : (
                null
              )}
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </div>
    )
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Nav)
