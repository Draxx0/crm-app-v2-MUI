import { Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const ActionsRow = ({ params, fetchInvoices, fetchClients }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleEdit = (e) => {
    e.stopPropagation();
    if (location.pathname === "/customers") {
      navigate(`/customers-form/${params.row._id}`);
    } else {
      navigate(`/invoices/${params.row._id}`);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (location.pathname === "/") {
      fetch(`http://localhost:8000/api/invoices/${params.row._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => fetchInvoices());
    } else {
      fetch(`http://localhost:8000/api/customers/${params.row._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => fetchClients());
    }
  };

  return (
    <Box display="flex" justifyContent="space-around">
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleEdit}
      >
        Editer
      </Button>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        sx={{ ml: 2 }}
        onClick={(e) => handleDelete(e)}
      >
        Supprimer
      </Button>
    </Box>
  );
};

export default ActionsRow;
