import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AddMovie from "./pages/Admin/AddMovie";
import EditMovie from "./pages/Admin/EditMovie";
import ShowAllMovie from "./pages/Admin/ShowAllMovie";

import ShowAllUserMovie from "./pages/User/ShowAllMovies";

import Home from "./pages/User/Home";
import ShowAMovie from "./pages/User/ShowAMovie";
import MyTickets from "./pages/User/MyTickets";
import Layout from "./components/Layout";
import AdminLogin from "./pages/Admin/AdminLogin";


function App() {
  return (
    <div className="App">
      <Router>
      <Routes>

        <Route path="/admin" element={<Layout><Dashboard/></Layout> }/>
        <Route path="/admin/login" element={<Layout><AdminLogin/></Layout> }/>
        <Route path='/admin/addMovie' element={<Layout> <AddMovie/> </Layout>} />
        <Route path='/admin/editMovie/:id' element={ <Layout><EditMovie/></Layout> } />
        <Route path='/admin/showAllMovies' element={<Layout><ShowAllMovie/></Layout>} />
        
        <Route path="/" element={<Home/>}/>
        <Route path="/showAllMovies" element={<ShowAllUserMovie/>} />
        <Route path="/showAMovie/:id" element={<ShowAMovie/>} />
        <Route path="/mytickets" element={<MyTickets/>}/>
      
      </Routes>
      </Router>
    </div>
  );
}

export default App;