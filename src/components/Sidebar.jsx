import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SvgIcon from "@mui/material/SvgIcon";
import "../assets/styles/Sidebar.css";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/authentication/authenticationSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const nav = [
    {
      id: 1,
      title: "Dashboard",
      link: "/dashboard",
      icon: (
        <path
          d="M4.54 2H7.92C9.33 2 10.46 3.15 10.46 4.561V7.97C10.46 9.39 9.33 10.53 7.92 10.53H4.54C3.14 10.53 2 9.39 2 7.97V4.561C2 3.15 3.14 2 4.54 2ZM4.54 13.4697H7.92C9.33 13.4697 10.46 14.6107 10.46 16.0307V19.4397C10.46 20.8497 9.33 21.9997 7.92 21.9997H4.54C3.14 21.9997 2 20.8497 2 19.4397V16.0307C2 14.6107 3.14 13.4697 4.54 13.4697ZM19.4601 2H16.0801C14.6701 2 13.5401 3.15 13.5401 4.561V7.97C13.5401 9.39 14.6701 10.53 16.0801 10.53H19.4601C20.8601 10.53 22.0001 9.39 22.0001 7.97V4.561C22.0001 3.15 20.8601 2 19.4601 2ZM16.0801 13.4697H19.4601C20.8601 13.4697 22.0001 14.6107 22.0001 16.0307V19.4397C22.0001 20.8497 20.8601 21.9997 19.4601 21.9997H16.0801C14.6701 21.9997 13.5401 20.8497 13.5401 19.4397V16.0307C13.5401 14.6107 14.6701 13.4697 16.0801 13.4697Z"
          strokeWidth="1.5"
        />
      ),
    },
    {
      id: 2,
      title: "Expences",
      link: "/dashboard/expences",
      icon: (
        <>
          <path
            d="M22 12V17C22 20 20 22 17 22H7C4 22 2 20 2 17V12C2 9.28 3.64 7.38 6.19 7.06C6.45 7.02 6.72 7 7 7H17C17.26 7 17.51 7.00999 17.75 7.04999C20.33 7.34999 22 9.26 22 12Z"
            strokeWidth="1.5"
          />
          <path
            d="M17.7514 7.05C17.5114 7.01 17.2614 7.00001 17.0014 7.00001H7.00141C6.72141 7.00001 6.45141 7.02001 6.19141 7.06001C6.33141 6.78001 6.53141 6.52001 6.77141 6.28001L10.0214 3.02C11.3914 1.66 13.6114 1.66 14.9814 3.02L16.7314 4.79002C17.3714 5.42002 17.7114 6.22 17.7514 7.05Z"
            strokeWidth="1.5"
          />
          <path
            d="M22 12.5H19C17.9 12.5 17 13.4 17 14.5C17 15.6 17.9 16.5 19 16.5H22"
            strokeWidth="1.5"
          />
        </>
      ),
    },
    {
      id: 3,
      title: "Revenue",
      link: "/dashboard/revenue",
      icon: (
        <>
          <path
            d="M9.5 13.75C9.5 14.72 10.25 15.5 11.17 15.5H13.05C13.85 15.5 14.5 14.82 14.5 13.97C14.5 13.06 14.1 12.73 13.51 12.52L10.5 11.47C9.91 11.26 9.51001 10.94 9.51001 10.02C9.51001 9.17999 10.16 8.48999 10.96 8.48999H12.84C13.76 8.48999 14.51 9.26999 14.51 10.24"
            strokeWidth="1.5"
          />
          <path d="M12 7.5V16.5" strokeWidth="1.5" />
          <path
            d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2"
            strokeWidth="1.5"
          />
          <path d="M17 3V7H21" strokeWidth="1.5" />
          <path d="M22 2L17 7" strokeWidth="1.5" />
        </>
      ),
    },
    {
      id: 4,
      title: "Report",
      link: "/dashboard/report",
      color: "#84818A",
      icon: (
        <>
          <path d="M6.12109 16.5625C5.70709 16.5625 5.37109 16.2265 5.37109 15.8125V8.95251C5.37109 8.53851 5.70709 8.20251 6.12109 8.20251C6.53509 8.20251 6.87109 8.53851 6.87109 8.95251V15.8125C6.87109 16.2265 6.53509 16.5625 6.12109 16.5625Z" />
          <path d="M10.7881 16.5615C10.3741 16.5615 10.0381 16.2255 10.0381 15.8115V5.66852C10.0381 5.25452 10.3741 4.91852 10.7881 4.91852C11.2021 4.91852 11.5381 5.25452 11.5381 5.66852V15.8115C11.5381 16.2255 11.2021 16.5615 10.7881 16.5615Z" />
          <path d="M15.3784 16.5615C14.9644 16.5615 14.6284 16.2255 14.6284 15.8115V12.5775C14.6284 12.1635 14.9644 11.8275 15.3784 11.8275C15.7924 11.8275 16.1284 12.1635 16.1284 12.5775V15.8115C16.1284 16.2255 15.7924 16.5615 15.3784 16.5615Z" />
          <path d="M6.064 1.5C3.292 1.5 1.5 3.397 1.5 6.335V15.165C1.5 18.103 3.292 20 6.064 20H15.436C18.209 20 20 18.103 20 15.165V6.335C20 3.397 18.209 1.5 15.436 1.5H6.064ZM15.436 21.5H6.064C2.437 21.5 0 18.954 0 15.165V6.335C0 2.546 2.437 0 6.064 0H15.436C19.063 0 21.5 2.546 21.5 6.335V15.165C21.5 18.954 19.063 21.5 15.436 21.5Z" />
        </>
      ),
    },
  ];

  return (
    <div className="sidebar">
      <ListItem sx={{ marginBottom: "20px" }}>
        <h2>
          Logo<span style={{ color: "#0BAFFF" }}>.</span>
        </h2>
      </ListItem>
      <List>
        <ListItem>
          <p style={{ fontSize: ".7em", color: "#84818A" }}>ADMIN TOOLS</p>
        </ListItem>
        {nav.map((nav) => (
          <NavLink exact to={nav.link} activeClassName="selected" key={nav.id}>
            <ListItemButton>
              <ListItemIcon>
                <SvgIcon
                  htmlColor={`${nav.color ? "#84818A" : "#0000"}`}
                  className={`${nav.color ? "color" : "stroke"}`}
                >
                  {nav.icon}
                </SvgIcon>
              </ListItemIcon>
              <ListItemText secondary={nav.title} />
            </ListItemButton>
          </NavLink>
        ))}
      </List>
      <NavLink to="/">
        <ListItemButton
          sx={{ position: "fixed", bottom: "1em" }}
          onClick={() => dispatch(login())}
        >
          <ListItemIcon>
            <SvgIcon htmlColor="#0000">
              <path
                opacity="0.4"
                d="M15.016 7.49642V6.56342C15.016 4.52842 13.366 2.87842 11.331 2.87842H6.45597C4.42197 2.87842 2.77197 4.52842 2.77197 6.56342V17.6934C2.77197 19.7284 4.42197 21.3784 6.45597 21.3784H11.341C13.37 21.3784 15.016 19.7334 15.016 17.7044V16.7614"
                stroke="#808191"
                strokeWidth="1.5"
              />
              <path
                d="M21.8096 12.1283H9.76855"
                stroke="#808191"
                strokeWidth="1.5"
              />
              <path
                d="M18.8811 9.21326L21.8091 12.1283L18.8811 15.0443"
                stroke="#808191"
                strokeWidth="1.5"
              />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText secondary="Logout" />
        </ListItemButton>
      </NavLink>
    </div>
  );
}

export default Sidebar;
