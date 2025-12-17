import { createTheme } from "@material-ui/core/styles";

const newPrimary = "#3f7abd";
const newSecondary = "#bd433f";
const newLightSecondary ="b3787a"
const specialButton = "#3e576c";
const buttonGreen="#a5d6a7"
export const theme = createTheme({
  palette: {
    primary: {
      main: newPrimary,
    },
    secondary: {
      main: newSecondary,
    },
    lightSecondary:{
      main:newLightSecondary
    },
    specialButton: {
      main: specialButton,
      light: "#6e8191",
    },
    buttonGreen:{
      main: buttonGreen

    }
  },
  overrides: {

  },
});
