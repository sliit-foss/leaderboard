import { useCallback, useEffect, useState } from "react";
import Activity from "./Activity";
import Board, { BoardSkeleton } from "./Board";
import { Data, ORG, loadData } from "./data";
import {
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  MoonIcon,
  SunIcon,
  XIcon,
} from "./icons";

type Theme = "light" | "dark";

const currentTheme = (): Theme =>
  (document.documentElement.dataset.theme as Theme | undefined) ??
  (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

function ThemeToggle() {
  const [theme, setTheme] = useState(currentTheme);
  const next = theme === "dark" ? "light" : "dark";

  const toggle = () => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable */
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      className="icon-button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

const SOCIALS = [
  { href: `https://github.com/${ORG}`, label: "GitHub", Icon: GitHubIcon },
  {
    href: "https://www.facebook.com/sliitfoss",
    label: "Facebook",
    Icon: FacebookIcon,
  },
  { href: "https://x.com/fosssliit", label: "X", Icon: XIcon },
  {
    href: "https://www.instagram.com/sliitfoss",
    label: "Instagram",
    Icon: InstagramIcon,
  },
];

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; data: Data };

export default function App() {
  const [state, setState] = useState<State>({ status: "loading" });

  const load = useCallback(() => {
    setState({ status: "loading" });
    loadData()
      .then((data) => setState({ status: "ready", data }))
      .catch((error: Error) =>
        setState({ status: "error", message: error.message }),
      );
  }, []);

  useEffect(load, [load]);

  return (
    <>
      <header className="navbar">
        <div className="container navbar-inner">
          <a className="brand" href="/">
            <img src="/favicon.ico" alt="" width="32" height="32" />
            <span>SLIIT FOSS</span>
          </a>
          <div className="navbar-actions">
            <a
              className="icon-button"
              href={`https://github.com/${ORG}`}
              aria-label="SLIIT FOSS on GitHub"
              title="SLIIT FOSS on GitHub"
            >
              <GitHubIcon />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container">
        <section className="intro" aria-labelledby="title">
          <div>
            <h1 id="title">Contributor leaderboard</h1>
            <p className="lede">
              1 merged PR = 10 points. Send a pull request to any SLIIT FOSS
              repository to get on the board.
            </p>
          </div>
          <a className="button" href={`https://github.com/${ORG}`}>
            Contribute on GitHub
          </a>
        </section>

        {state.status === "loading" && <BoardSkeleton />}
        {state.status === "error" && (
          <div className="notice" role="alert">
            <h2>Couldn't load the leaderboard</h2>
            <p>
              The data request failed ({state.message}). Check your connection
              and try again.
            </p>
            <button type="button" className="button" onClick={load}>
              Try again
            </button>
          </div>
        )}
        {state.status === "ready" && (
          <>
            <Board data={state.data} />
            <Activity data={state.data} />
          </>
        )}
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <p>
            Made by the{" "}
            <a href="https://sliitfoss.org/">SLIIT FOSS Community</a>. Data
            refreshes hourly from GitHub.
          </p>
          <ul className="socials">
            {SOCIALS.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  className="icon-button"
                  href={href}
                  aria-label={`SLIIT FOSS on ${label}`}
                  title={label}
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
}
