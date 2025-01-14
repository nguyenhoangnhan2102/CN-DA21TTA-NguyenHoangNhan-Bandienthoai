import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminRoute from './admin/route-admin-view';
import RouterView from "./view/route-views";
import Header from "./share/component/Nav";
import Footer from "./share/component/Footer";
import GuardRoute from "./authentication/guardRoute";

function App() {
  return (
    <Router>
      <div className="App" style={{ backgroundColor: '#F2F4F7' }}>
        <div className="App-header">
          <Routes>
            <Route path="/*" element={<MainLayout />} />
            {/* <Route path="/admin/*" element={<AdminLayout />} /> */}
            <Route
              path="/admin/*"
              element={<GuardRoute element={AdminLayout} />}
            />
          </Routes>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

const MainLayout = () => (
  <>
    <Header />
    <Routes>
      <Route path="/*" element={<RouterView />} />
    </Routes>
    <Footer />
  </>
);

const AdminLayout = () => (
  <Routes>
    <Route path="/*" element={<AdminRoute />} />
  </Routes>
);

export default App;
