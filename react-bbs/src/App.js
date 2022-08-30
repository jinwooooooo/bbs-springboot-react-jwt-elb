import React from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Bbsdetail from "./Components/bbsdetail";
import Bbslist from "./Components/bbslist";
import Bbswrite from "./Components/bbswrite";
import Bbsupdate from "./Components/bbsupdate";
import Bbsreply from "./Components/bbsreply";
import Login from "./Components/login";
import Join from "./Components/join";
// import './main.css';

const logout = () => {
  localStorage.clear();
  window.location.href="/bbslist";
}

function App() {
  return (
    <div>
      <header className="py-4">
        <div className="container text-center">
          <img alt="" src="open-holy.jpg" width='960' height='150' />
        </div>
      </header>

      <BrowserRouter>

      <nav className="navbar navbar-expand-md navbar-dark bg-info sticky-top">
          <div className="container">

            <div className="collapse navbar-collapse" id="navbar-content">
              <ul className="navbar-nav mr-auto">

                  <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>

                  <li className="nav-item dropdown">

                    <div className="nav-link dropdown-toggle" id="navbarDropdown" 
                       role="button" data-toggle="dropdown" aria-haspopup="true" 
                       aria-expanded="false">게시판</div>

                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <Link className="dropdown-item" to="/bbslist">글목록</Link>
                      <Link className="dropdown-item" to="/bbswrite">글추가</Link>
                    </div>   
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/pdslist">자료실</Link>
                  </li>
                
                  
                </ul>
                <div className="nav-item float-right">
                    {
                      localStorage.getItem("ACCESS_TOKEN") != null
                      ? <button type="button" className="btn btn-dark" onClick={logout}>로그아웃</button>
                      : <Link className="dropdown-item" to="/login">로그인</Link>
                    }
                </div>
            </div>
          </div>
        </nav>

        <main>
          <div className="py-4">
            <div className="container">

              <Routes>

                <Route path="/" element={<Home />}></Route>

                <Route path="/bbslist" element={<Bbslist />}></Route>
                <Route path="/bbswrite" element={<Bbswrite />}></Route>
                <Route path="/bbsdetail/:seq" element={<Bbsdetail />}></Route>
                <Route path="/bbsupdate/:seq" element={<Bbsupdate />}></Route>
                <Route path="/bbsreply/:seq" element={<Bbsreply />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/join" element={<Join />}></Route>
              </Routes>

            </div>
          </div>
        </main>

      </BrowserRouter>

      <footer className="py-4 bg-info text-light">
        <div className="container text-center">
          <ul className="nav justify-content-center mb-3">
            <li className="nav-item">
              <a className="nav-link" href="/">Top</a>
            </li>
          </ul>

          <p>
            <small>Copyright &copy;Graphic Arts</small>
          </p>
        </div>
      </footer>
      
    </div>
  );
}

function Home(){
  return (
    <div>
      <h2>Home</h2>
    </div>
  )
}

// function Bbslist(){
//   return (
//     <div>
//       <h2>Bbslist</h2>
//     </div>
//   )
// }

//function Bbswrite(){
//  return (
//    <div>
//      <h2>Bbswrite</h2>
//    </div>
//  )
//}

export default App;
