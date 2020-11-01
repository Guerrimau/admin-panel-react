import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Drawer,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { Menu, Map, Group, ExitToApp } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

const Navbar = ({ title }) => {

  const history = useHistory();
  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleLogOut = () => {
    history.push("/login");
    setOpenDrawer(!openDrawer);
  };

  const drawerOptions = [
    {
        text: "Empleados",
        icon: <Group />,
        onClick: () => {
          setOpenDrawer(!openDrawer);
          history.push("/empleados");
        },
    },
    {
      text: "Proyectos",
      icon: <Map />,
      onClick: () => {
        setOpenDrawer(!openDrawer);
        history.push("/proyectos");
      },
    },
  ];

  return (
    <>
      <Drawer
        className={classes.drawer}
        open={openDrawer}
        onClose={() => setOpenDrawer(!openDrawer)}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <h2 style={{ marginLeft: "15px", marginTop: "20px" }}>Menú</h2>
        <List>
          {drawerOptions.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
              <ListItem button key={text} onClick={onClick}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
          <Divider style={{ marginTop: "20px", marginBottom: "5px" }} />
          <ListItem
            button
            key="Cerrar sesion"
            onClick={() => {
              handleLogOut();
            }}
          >
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText>Cerrar sesión</ListItemText>
          </ListItem>
        </List>
      </Drawer>

      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => setOpenDrawer(!openDrawer)}
              >
                <Menu />
              </IconButton>
            <Typography variant="h6" className={classes.title}>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default Navbar;