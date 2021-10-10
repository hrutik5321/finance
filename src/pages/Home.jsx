import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import Sidebar from "../components/Sidebar";
import "../assets/styles/Home.css";
import SearchIcon from "../assets/icons/search.svg";
import MessageIcon from "../assets/icons/message.svg";
import NotificationIcon from "../assets/icons/notification.svg";
import Dashboard from "./Dashboard";
import Expences from "./Expences";
import Revenue from "./Revenue";
import Report from "./Report";
import { Route, Switch } from "react-router-dom";

const drawerWidth = 240;
function Home(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }} className="home">
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        className="home__header"
      >
        <Toolbar
          sx={{ justifyContent: "space-between", background: "#1F212B" }}
        >
          <div className="flex" style={{ flex: ".1" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Switch>
              <Route exact path="/dashboard/">
                <h2>Dashboard</h2>
              </Route>
              <Route path="/dashboard/expences">
                <h2>Expences</h2>
              </Route>
              <Route path="/dashboard/revenue">
                <h2>Revenue</h2>
              </Route>
              <Route path="/dashboard/report">
                <h2>Report</h2>
              </Route>
            </Switch>
            <ArrowDropDownRoundedIcon />
          </div>
          <div className="header__searchBox flex">
            <img src={SearchIcon} alt="" />
            <input type="text" placeholder="Search everything..." />
          </div>
          <div className="header__buttons flex">
            <img src={NotificationIcon} alt="" />
            <Badge badgeContent={4} color="error">
              <img src={MessageIcon} alt="" />
            </Badge>
            <div className="flex">
              <Avatar
                src="https://source.unsplash.com/random"
                sx={{ width: { xs: "35px" }, height: { xs: "35px" } }}
              />
              <ArrowDropDownRoundedIcon
                sx={{
                  display: { sm: "block", xs: "none" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                  },
                }}
              />
            </div>
          </div>
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
          <Sidebar />
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
          <Sidebar />
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Switch>
          <Route exact path="/dashboard/">
            <Dashboard />
          </Route>
          <Route path="/dashboard/expences">
            <Expences />
          </Route>
          <Route path="/dashboard/revenue">
            <Revenue />
          </Route>
          <Route path="/dashboard/report">
            <Report />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}

export default Home;
