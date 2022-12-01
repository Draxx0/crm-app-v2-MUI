import { Box, Button, FormControl, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const InvoiceForm = ({ fetchInvoices }) => {
  const { id } = useParams();
  const [credentials, setCredentials] = useState({});
  const [editMode, setEditMode] = useState(id ? true : false);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/api/invoices/${id}`)
        .then((res) => res.json())
        .then((data) => setCredentials(data));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMode) {
      fetch(`http://localhost:8000/api/invoices/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })
        .then(() => fetchInvoices())
        .then(() => navigate("/"));
    } else {
      fetch("http://localhost:8000/api/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })
        .then(() => fetchInvoices())
        .then(() => navigate("/"));
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
            label="Status de la facture"
            name="status"
            onChange={(e) => handleChange(e)}
            value={credentials.status || ""}
          />
        </FormControl>

        <FormControl>
          <TextField
            label="Montant de la facture"
            name="amount"
            onChange={(e) => handleChange(e)}
            value={credentials.amount || ""}
          />
        </FormControl>

        <Button type="submit">Submit</Button>
      </Box>
    </Box>
  );
};

export default InvoiceForm;
