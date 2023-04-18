import { Home } from './home/home';
import { About } from './about/about';
import { Profile } from './profile/profile';
import { Viewer } from './viewer/viewer';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="header">
        <NavLink className="logo" to="">
          <span className="main-color">amni</span><span className="highlight-color">.live</span>
        </NavLink>
        <span className="head_main">
        </span>
      </header>
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path='/profile' element={<Profile />} />
        <Route path='/about' element={<About />} />
        <Route path='/viewer' element={<Viewer />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;
