import { Box, Button, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { Link } from "react-router-dom";
import ActionsRow from "../components/table/ActionsRow";

const ClientListPage = ({ fetchClients, clients }) => {
    const [columns, setColumns] = useState([
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "firstName",
      headerName: "Nom",
      width: 130,
      valueGetter: (params) => `${params.row.firstName}`,
    },
    {
      field: "lastName",
      headerName: "Prénom",
      width: 130,
      valueGetter: (params) => `${params.row.lastName}`,
    },
    {
      field: "invoices",
      headerName: "Factures",
      width: 90,
      renderCell: (params) => `${params.row.invoices.length}`,
    },
    {
      headerName: "Actions",
      width: 300,
      renderCell: (params) => (
        <ActionsRow params={params} fetchClients={fetchClients} />
      ),
    },
  ]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h2">Liste des clients</Typography>
        <Button variant="contained"><Link to="/customers-form">Nouveau client</Link></Button>
      </Box>
      <Box component="form">
        <TextField
          variant="outlined"
          label="Recherche"
          sx={{ width: "100%" }}
        />
      </Box>
      <Box
        sx={{
          height: 400,
          width: "100%",
          mt: 4,
        }}
      >
        <DataGrid
          rows={clients}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
};

export default ClientListPage;
