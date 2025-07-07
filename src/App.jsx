import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import {NavBar} from "./components/NavBar.jsx";
import {Banner} from "./components/Banner.jsx";
import {Projects} from "./components/Projects.jsx";
import {ParticleCanvas} from "./components/ParticleCanvas.jsx";
import {AboutMe} from "./components/AboutMe.jsx";

function App() {

  return (
    <div className="App">
      <div className="gradient-background">
        <NavBar></NavBar>
        <Banner>
          <ParticleCanvas/>
        </Banner>
          <AboutMe></AboutMe>
        <Projects></Projects>
      </div>
    </div>
  )
}

export default App
