import React from "react";
import { ButtonPrimary } from "@primer/components";

function Footer() {
  return (
    <>
      <section className="fdb-block mt-4 make-contribution">
        <div className="layer"></div>
        <div className="container">
          <div className="row justify-content-center ">
            <div className="col-12 col-lg-8 col-xl-6 text-center">
              <h1 className="mt-4">Make your contribution</h1>
              <p className="lead">
                Small experiments, inspired inventions, and the software
                everyone depends on—the code you write on GitHub can reach one
                codebase or millions.
              </p>

              <p className="h3 mt-4 mb-5">
                <ButtonPrimary>
                  <a id="explore" href="https://github.com/sliit-foss">
                    Explore trending repos
                  </a>
                </ButtonPrimary>
              </p>
            </div>
          </div>
        </div>
      </section>

      <div id="wrapper">
        <div id="container">
          <p id="footer">
            Made with ❤️ by{" "}
            <a href="https://sliitfoss.org/" id="hyper">
              SLIIT FOSS
            </a>
          </p>
        </div>
      </div>
      <div id="footer"></div>
    </>
  );
}

export default Footer;
