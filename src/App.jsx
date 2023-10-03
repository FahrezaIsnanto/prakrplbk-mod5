import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { IconButton, List, Paper, Typography } from "@mui/material";
import ListItemUser from "./components/ListItemUser";
import { useEffect, useState } from "react";
import axios from "axios";
import { AddCircle } from "@mui/icons-material";
import AddUserDialog from "./components/AddUserDialog";
import Halo from "./components/Halo";
const BASE_API_URL = `https://reqres.in/api`;
import { CountryContext } from "./CountryContext";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [users, setUsers] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [country, setCountry] = useState([]);

  useEffect(() => {
    async function getUsers() {
      await axios
        .get(`${BASE_API_URL}/users`)
        .then((res) => {
          const responseData = res.data.data;
          setUsers(responseData);
        })
        .catch((error) => {
          console.log(error);
          window.alert(error);
        });
    }
    async function getCountry() {
      await axios
        .get(`https://restcountries.com/v3.1/all`, {
          // headers : {
          //   'X-RapidAPI-Key': 'f89164673emsh75e6ab700285b7ep132e73jsnd1188017b343',
          //   'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com'
          // }
        })
        .then((res) => {
          console.log("res", res.data);
          setCountry(res.data);
        })
        .catch((error) => {
          console.log(error);
          window.alert(error);
        });
    }
    getUsers();
    getCountry();
  }, []);
  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Awal</Link>
            </li>
            <li>
              <Link to="/use-effect">Pindah</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <div className="App">
                <div className="list-container">
                  <div className="list-title-wrapper">
                    <Typography variant="h4">List User</Typography>
                    <IconButton onClick={openDialog}>
                      <AddCircle />
                    </IconButton>
                  </div>
                  <Paper
                    elevation={2}
                    style={{ maxHeight: "700px", overflow: "auto" }}
                  >
                    <List>
                      {users.map((d) => (
                        <ListItemUser
                          key={d.id}
                          image={d.avatar}
                          primaryText={`${d.first_name} ${d.last_name}`}
                          secondaryText={`Email: ${d.email}`}
                        />
                      ))}
                      {newUsers.map((d) => (
                        <ListItemUser
                          key={d.id}
                          image={d.avatar}
                          primaryText={d.name}
                          secondaryText={`Job: ${d.job} ${d.country}`}
                        />
                      ))}
                    </List>
                  </Paper>
                </div>
                {isDialogOpen && (
                  <AddUserDialog
                    open={isDialogOpen}
                    onClose={closeDialog}
                    users={newUsers}
                    setUsers={setNewUsers}
                  />
                )}
              </div>
            }
          ></Route>
          <Route path="/use-state" exact element={<Halo/>}></Route>
          <Route path="/use-effect" exact element={<Halo/>}></Route>
          <Route path="/use-context" exact element={<Halo/>}></Route>
        </Routes>
      </Router>
    </CountryContext.Provider>
  );
}
export default App;
