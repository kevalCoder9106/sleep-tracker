import './App.css';

// Router
import { BrowserRouter ,Routes, Route } from 'react-router-dom'

// Page
import Login from './page/Login';
import Register from './page/Register';
import Home from './page/Home';
import Graph from './page/Graph';

// Context

const App = () => {
  /*
    How verification will work ?
      - verifying in home and graph page
  */

  return(
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/graph' element={<Graph/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;