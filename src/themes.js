import { createGlobalStyle } from "styled-components";

export const LightTheme = {
  body: "#fff",
  fontColor: "#000",
  tableColor: "#fff",
  // Header colors
  headerBg: "#ffffff",
  headerText: "#24292f",
  headerBorder: "#d0d7de",
  // PR Section colors
  prSectionBg: "linear-gradient(135deg, #f6f8fa 0%, #ffffff 100%)",
  prCardBg: "#ffffff",
  prCardBorder: "#d0d7de",
  prCardHoverShadow: "0 8px 24px rgba(101, 107, 254, 0.12)",
  prTitleColor: "#24292f",
  prMetaColor: "#57606a",
  prFooterBorder: "#f6f8fa",
  emptyStateBg: "#ffffff",
  emptyStateBorder: "#d0d7de",
};

export const DarkTheme = {
  body: "#171F24",
  fontColor: "#fff",
  tableColor: "#1C2A35",
  // Header colors
  headerBg: "#24292e",
  headerText: "#ffffff",
  headerBorder: "#30363d",
  // PR Section colors
  prSectionBg: "linear-gradient(135deg, #0d1117 0%, #161b22 100%)",
  prCardBg: "#161b22",
  prCardBorder: "#30363d",
  prCardHoverShadow: "0 8px 24px rgba(101, 107, 254, 0.2)",
  prTitleColor: "#f0f6fc",
  prMetaColor: "#8b949e",
  prFooterBorder: "#21262d",
  emptyStateBg: "#161b22",
  emptyStateBorder: "#30363d",
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
    h2{
        color:${(props) => props.theme.fontColor};
    }
    h3{
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

    // Header/Navbar
    .sticky-header {
        background-color: ${(props) => props.theme.headerBg} !important;
        border-bottom: 1px solid ${(props) => props.theme.headerBorder};
        
        a, span {
            color: ${(props) => props.theme.headerText} !important;
        }
        
        svg {
            color: ${(props) => props.theme.headerText} !important;
        }
    }

    // Pending PRs Section
    .pending-prs-section {
        background: ${(props) => props.theme.prSectionBg} !important;
        
        .section-title {
            color: ${(props) => props.theme.fontColor} !important;
        }

        .section-subtitle {
            color: ${(props) => props.theme.prMetaColor} !important;
        }

        .pr-card {
            background: ${(props) => props.theme.prCardBg} !important;
            border-color: ${(props) => props.theme.prCardBorder} !important;

            &:hover {
                box-shadow: ${(props) => props.theme.prCardHoverShadow} !important;
            }

            .pr-title {
                color: ${(props) => props.theme.prTitleColor} !important;
            }

            .pr-number {
                color: ${(props) => props.theme.prMetaColor} !important;
            }

            .pr-card-footer {
                border-top-color: ${(props) => props.theme.prFooterBorder} !important;

                .author-link {
                    color: ${(props) => props.theme.prTitleColor} !important;
                }

                .pr-time {
                    color: ${(props) => props.theme.prMetaColor} !important;
                }
            }
        }

        .empty-state {
            background: ${(props) => props.theme.emptyStateBg} !important;
            border-color: ${(props) => props.theme.emptyStateBorder} !important;

            h3 {
                color: ${(props) => props.theme.fontColor} !important;
            }

            p {
                color: ${(props) => props.theme.prMetaColor} !important;
            }
        }

        .loading-text {
            color: ${(props) => props.theme.prMetaColor} !important;
        }
    }
`;
