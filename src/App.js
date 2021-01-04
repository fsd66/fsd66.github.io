import React from 'react';
import './App.css';

import Header from "./components/Header";
import GithubLink from "./components/GithubLink";
import WorkRequest from "./components/WorkRequest";
import KoFiLink from "./components/KoFiLink";
import CryptoLink from "./components/CryptoLink";

function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <p>Please visit my <GithubLink /></p>
      </div>
      <div>
        <div>Enjoy my work?</div>

        <div>
          <KoFiLink />
        </div>

        <div>
          <CryptoLink />
        </div>
      </div>
      <WorkRequest />
    </div>
  );
}

export default App;
