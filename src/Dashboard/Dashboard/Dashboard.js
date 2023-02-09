import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Typography, Button } from "@mui/material";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Common from "../Common/Common";
import Pay from "../../Pages/Pay/Pay";
import MyOrder from "../../Pages/MyOrder/MyOrder";
import ManageService from "../ManageService/ManageService";
import ManageOrder from "../Manage Order/ManageOrder";
import AddAdmin from "../AddAdmin/AddAdmin";
import AddService from "../AddService/AddService";
import Review from "../Review/Review";
import AdminRoute from "../../Pages/Login/AdminRoute/AdminRoute";
import { useState } from "react";
import { useEffect } from "react";


const drawerWidth = 240;

function Dashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  let { path, url } = useRouteMatch();
  const { user, admin, logout } = useAuth();
  console.log(admin);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [orders, setOrders] = useState([]);

    console.log(orders)

    useEffect(() => {
        fetch(`https://rn-tech-server-side-production.up.railway.app/allEvents`)
            .then(res => res.json())
            .then(data => setOrders(data));
    }, [user.email]);

    const [events,setEvents] = useState([]);

    useEffect(() => {
        fetch(`https://rn-tech-server-side-production.up.railway.app/myEvents/${user?.email}`)
        .then(res => res.json())
        .then(data => setEvents(data));
    },[user.email]);

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <Box sx={{ mt: 1 }}>
        {admin ? (
          <>
            <Link style={{ textDecoration: "none" }} to="/">
              <Button fullWidth>Home</Button>
            </Link>
            <Link style={{ textDecoration: "none" }} to={`${url}/allOrders`}>
              <Button fullWidth>Manage All Services</Button>
            </Link>
            <Link
              to={`${url}/manageService`}
              style={{ textDecoration: "none" }}
            >
              <Button fullWidth>Manage Orders <span className="ms-4 text-danger fw-bold fs-2 p-0">{orders.length} <span className="fs-6">new</span></span></Button>
            </Link>
            <Link to={`${url}/addService`} style={{ textDecoration: "none" }}>
              <Button fullWidth>Add A Service</Button>
            </Link>
            <Link to={`${url}/addAdmin`} style={{ textDecoration: "none" }}>
              <Button fullWidth>Make Admin</Button>
            </Link>
          </>
        ) : (
          <>
            <Link style={{ textDecoration: "none" }} to="/">
              <Button fullWidth>Home</Button>
            </Link>
            <Link style={{ textDecoration: "none" }} to={`${url}/pay`}>
              <Button fullWidth>Payment</Button>
            </Link>

            <Link style={{ textDecoration: "none" }} to={`${url}/myOrder`}>
              <Button fullWidth>My Orders <span className="ms-4 text-danger fw-bold fs-2 p-0">{events.length} <span className="fs-6"></span></span></Button>
            </Link>

            <Link style={{ textDecoration: "none" }} to={`${url}/review`}>
              <Button fullWidth>Review</Button>
            </Link>
          </>
        )}

        <Button onClick={logout} fullWidth>
          Logout
        </Button>
      </Box>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          boxShadow: 0,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Typography paragraph>
          <Switch>
            <Route exact path={path}>
              <Common></Common>
            </Route>
            <Route path={`${path}/pay`}>
              <Pay></Pay>
            </Route>
            <Route path={`${path}/myOrder`}>
              <MyOrder></MyOrder>
            </Route>
            <AdminRoute path={`${path}/allOrders`}>
              <ManageService></ManageService>
            </AdminRoute>
            <AdminRoute path={`${path}/manageService`}>
              <ManageOrder></ManageOrder>
            </AdminRoute>
            <AdminRoute path={`${path}/addAdmin`}>
              <AddAdmin></AddAdmin>
            </AdminRoute>
            <AdminRoute path={`${path}/addService`}>
              <AddService></AddService>
            </AdminRoute>
            <Route path={`${path}/review`}>
              <Review></Review>
            </Route>
          </Switch>
        </Typography>
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;