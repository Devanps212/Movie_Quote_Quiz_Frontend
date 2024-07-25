import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/home';
import Questions from './components/questions/questions';
import Result from './components/result/result';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/questions' element={<Questions/>}/>
          <Route path='/result' element={<Result/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App