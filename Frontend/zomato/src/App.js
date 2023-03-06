
import './App.css';
import {Route,Routes} from "react-router-dom"
import Home2 from './Components/Home2';
import SearchPage from './Components/SearchPage';
import Restaurant from './Components/Restaurant';
function App() {
  return (
    <>
    <Routes>
       <Route path="/" element={<Home2/>}/>
       <Route path="/search/:id" element={<SearchPage/>}/>
       <Route path="/restaurant/:id" element={<Restaurant/>}/>
    </Routes>
    
    </>
  );
}

export default App;
