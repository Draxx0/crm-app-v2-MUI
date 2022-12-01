import { Box, Button, FormControl, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const InvoiceForm = ({ fetchClients }) => {
  const { id } = useParams();
  const [credentials, setCredentials] = useState({});
  const [editMode, setEditMode] = useState(id ? true : false);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/api/customers/${id}`)
        .then((res) => res.json())
        .then((data) => setCredentials(data));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    console.log(credentials);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMode) {
      fetch(`http://localhost:8000/api/customers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })
        .then(() => fetchClients())
        .then(() => navigate("/customers"));
    } else {
      fetch("http://localhost:8000/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })
        .then(() => fetchClients())
        .then(() => navigate("/customers"));
    }
  };
  return (
    <Box gap="100px">
      <Box
        component="form"
        onSubmit={(e) => handleSubmit(e)}
        display="flex"
        flexDirection="column"
        width="80%"
        margin="100px auto auto auto"
      >
        <FormControl>
          <TextField
            label="Nom du client"
            name="firstName"
            onChange={(e) => handleChange(e)}
            value={credentials.firstName || ""}
          />
        </FormControl>

        <FormControl>
          <TextField
            label="Prénom du client"
            name="lastName"
            onChange={(e) => handleChange(e)}
            value={credentials.lastName || ""}
          />
        </FormControl>

        <Button type="submit">Submit</Button>
      </Box>
    </Box>
  );
};

export default InvoiceForm;
