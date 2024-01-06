import './App.css';
import { Login, Register } from './Page/authentication';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PublicLayout from './layout/PublicLayout';
import { List, Edit, Add } from './Page/Category';
import ProtectLayout from './layout/ProtectedLayout';



const App: React.FC = () => {

  return (
  <BrowserRouter>
    <Routes>
      <Route element={<PublicLayout />} >
          <Route path='/' element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>
          {/* <Route path='*' element={<h1>ERROR PAGE</h1>}/> */}
          <Route path="register" element={<Register/>} />
          <Route element={<ProtectLayout />}>
            <Route path="/list" element={<List/>} />
            <Route path="/add" element={<Add/>} />
            <Route path="/edit/:id" element={<Edit />} />
          </Route>

      </Route>
    </Routes>
  </BrowserRouter>
    
  );
};

export default App;