import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from './pages/Profile'
import AuthProvider from "./context/auth";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

 export default App;
// import React from "react";

// const arr = [
//   { id: 1, name: "apple" },
//   { id: 2, name: "orange" },
//   { id: 3, name: "grape" }
// ];

// export default function App() {
//   const [items, setItems] = React.useState(arr);

//   const deleteItem = (index) => () =>
//     setItems((items) => items.filter((_, i) => i !== index));

//   return (
//     <>
//       {items.map((it, index) => {
//         return (
//           <div key={it.id}>
//             {it.name} <button onClick={deleteItem(index)}>delete</button>
//           </div>
//         );
//       })}
//     </>
//   );
// }