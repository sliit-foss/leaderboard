import { createGlobalStyle } from "styled-components";

export const LightTheme = {
  body: "#fff",
  fontColor: "#000",
  tableColor: "#fff",
};

export const DarkTheme = {
  body: "#171F24",
  fontColor: "#fff",
  tableColor: "#1C2A35",
};

export const GlobalStyles = createGlobalStyle`
	body {
        background-color: ${(props) => props.theme.body};
        color:${(props) => props.theme.fontColor};
    }
    
    a{
        color:${(props) => props.theme.fontColor};
    }
    th{
        color:${(props) => props.theme.fontColor};
    }
    h1{
        color:${(props) => props.theme.fontColor};
    }
    p{
        color:${(props) => props.theme.fontColor};
    }
    .make-contribution{
        background-color: ${(props) => props.theme.body};
    }
    .layer{
        background-color: ${(props) => props.theme.body};
    }
    table{
        background-color: ${(props) => props.theme.tableColor};
    }
`;
