import React from "react";
import { AppBar, Toolbar, Typography, styled, Link } from "@mui/material";

import { Outlet } from "react-router-dom";

const AppBarStyle = styled(AppBar)(({ theme }) => ({
  background: theme.palette.background.default,
  borderBottom: `solid ${theme.palette.primary.lighter} 1px`,
  minHeight: "70px",
}));

const ToolBarStyle = styled(Toolbar)(() => ({
  display: "flex",
  justifyContent: "space-between"
}));

const TitleStyle = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.dark,
  margin: theme.spacing(0, 3)
}));

const MenuStyle = styled("div")(() => ({
  display: "flex"
}));

export default function Header() {
  return (
    <div>
      <AppBarStyle position="relative" elevation={1}>
        <ToolBarStyle>
          <div>
            <TitleStyle href="/" variant="h4" aria-label="title" underline="none">
              Yelp
            </TitleStyle>
          </div>
          <MenuStyle>
            <TitleStyle href="/" variant="h6" underline="none">
              Home
            </TitleStyle>
            <TitleStyle href="nlp" variant="h6" underline="none">
              NLP
            </TitleStyle>
            <TitleStyle href="location_recommender" variant="h6" underline="none">
              Location Recommender
            </TitleStyle>
          </MenuStyle>
        </ToolBarStyle>
      </AppBarStyle>
      <Outlet />
    </div>
  );
}
