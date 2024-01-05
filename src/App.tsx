import './App.css';
import { Login, Register } from './Page/authentication';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PublicLayout from './layout/PublicLayout';



const App: React.FC = () => {

  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PublicLayout />} >
          <Route path='login' element={<Login data={{
          email: '',
          password: ''
            }} onChange={function (): void {
              throw new Error('Function not implemented.');
            } } onSubmit={function (): void {
              throw new Error('Function not implemented.');
            } }/>}/>
          <Route path='*' element={<h1>ERROR PAGE</h1>}/>
          <Route path="register" element={<Register data={{
              name: '',
              email: '',
              password: ''
            }} onChange={function (): void {
              throw new Error('Function not implemented.');
            } } onSubmit={function (): void {
              throw new Error('Function not implemented.');
            } } />} />
      </Route>
    </Routes>
  </BrowserRouter>
    
  );
};

export default App;