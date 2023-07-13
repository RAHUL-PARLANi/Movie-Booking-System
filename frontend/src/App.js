import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AddMovie from "./pages/Admin/AddMovie";
import EditMovie from "./pages/Admin/EditMovie";
import ShowAllMovie from "./pages/Admin/ShowAllMovie";
import Home from "./pages/User/Home";
import ShowAMovie from "./pages/User/ShowAMovie";
import MyTickets from "./pages/User/MyTickets";
import Layout from "./components/Layout";
import AdminLogin from "./pages/Admin/AdminLogin";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { login } from "./features/user";
import UserLogin from "./pages/User/userLogin";
import UserLayout from "./components/userLayout";


function App() {
  const userData=useSelector(state=>state.users.value)
  console.log(userData)
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const data = JSON.parse(localStorage.getItem("user"));
      console.log(data);
      dispatch(
        login({
          userName: data.userName,
          role: data.role,
          userId: data.userId,
          emailId:data.emailId,
          isAuthenticated:data.isAuthenticated
        })
      );
    }
   }, []);
    

  return (
    <div className="App">
      <Router>
      <Routes>

        <Route path="/admin" element={<Layout>{userData.isAuthenticated && userData.role=='admin'? <Dashboard/> : <AdminLogin/>}</Layout>}/>
        <Route path='/admin/addMovie' element={<Layout> {userData.isAuthenticated && userData.role=='admin'? <AddMovie/> : <AdminLogin/>} </Layout>} />
        <Route path='/admin/editMovie/:id' element={ <Layout>{userData.isAuthenticated && userData.role=='admin'? <EditMovie/> : <AdminLogin/>}</Layout> } />
        <Route path='/admin/showAllMovies' element={<Layout>{userData.isAuthenticated && userData.role=='admin'? <ShowAllMovie/> : <AdminLogin/>}</Layout>} />
        
        <Route path="/" element={<UserLayout>{userData.isAuthenticated ? <Home/> : <UserLogin/>}</UserLayout>}/>
        <Route path="/showAMovie/:id" element={<UserLayout>{userData.isAuthenticated ? <ShowAMovie/> : <UserLogin/>}</UserLayout>} />
        <Route path="/mytickets" element={<UserLayout>{userData.isAuthenticated ? <MyTickets/> : <UserLogin/>}</UserLayout>}/>
      
      </Routes>
      </Router>
    </div>
  );
}

export default App;