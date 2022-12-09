import { GlobalStyles as GlobalThemeStyles } from "@mui/material";

export default function GlobalStyles() {
  return (
    <GlobalThemeStyles
      styles={{
        img: { display: "block", maxWidth: "100%" }
      }}
    />
  );
}
