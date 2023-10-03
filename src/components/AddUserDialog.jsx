import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,    
  Select,
  MenuItem
} from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
const BASE_API_URL = `https://reqres.in/api`;
import { CountryContext } from "../CountryContext";
function AddUserDialog({ open, onClose, users, setUsers }) {
  const { country, setCountry } = useContext(CountryContext);
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const handleSubmit = () => {
    axios
      .post(`${BASE_API_URL}/users`, {
        name: name,
        job: job,
        country: userCountry
      })
      .then((res) => {
        setUsers([...users, res.data]);
        onClose();
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add user</DialogTitle>
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
          padding: "8px 20px",
        }}
      >
        <TextField
          name="name"
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <TextField
          name="job"
          label="Job"
          value={job}
          onChange={(event) => setJob(event.target.value)}
        />
         <Select
            value={country}
            label="Country"
            onChange={(event) => setUserCountry(event.target.value)}
        >
             {country.map((d) => (
                <MenuItem value={d.name.common}>{`${d.name.common}`}</MenuItem>
              ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
export default AddUserDialog;
