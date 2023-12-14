import './App.css';
import {Route, Routes} from 'react-router-dom'
import Layout from './Components/Layout'
import Indexpage from './Pages/Indexpage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import CreatePost from './Pages/CreatePost';
import SinglePostPage from './Pages/SinglePostPage';
import { UserContextProvider } from './Context/UserContext';
import EditPost from './Pages/EditPost';
import DeletePost from './Pages/DeletePost';


function App() {
  return (
    <UserContextProvider>
    <Routes>

      <Route path='/' element={<Layout />} >

      <Route index element ={ <Indexpage /> } /> 

      <Route path={'/login'} element={
        <LoginPage />
      }> </Route>

      <Route path={'/register'} element={
        <RegisterPage />
      }> </Route>

      <Route path={'/create'} element={ <CreatePost /> } />

      <Route path={'/post/:id'} element= { <SinglePostPage />} />

      <Route path={'/edit/:id'} element={<EditPost />} />

      <Route path={'/post/delete/:id'} element={<DeletePost />}/>

      </Route>

    </Routes>
    </UserContextProvider>
  );
}

export default App;
