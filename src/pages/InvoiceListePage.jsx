import { Box, Button, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { Link } from "react-router-dom";
import ActionsRow from "../components/table/ActionsRow";
import CreatedAtRow from "../components/table/CreatedAtRow";
import StatusRow from "../components/table/StatusRow";

const InvoiceListePage = ({ fetchInvoices, fetchClients, invoices }) => {
  const [columns, setColumns] = useState([
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "customer",
      headerName: "Client",
      width: 130,
      valueGetter: (params) =>
        `${params.row.customer?.firstname} ${params.row.customer?.lastname}`,
    },
    {
      field: "createdAt",
      headerName: "Date d'envoie",
      width: 130,
      renderCell: (params) => <CreatedAtRow params={params} />,
    },
    {
      field: "status",
      headerName: "Status",
      width: 90,
      renderCell: (params) => <StatusRow params={params} />,
    },
    {
      field: "amount",
      headerName: "Montant",
      width: 160,
      valueGetter: (params) => `${params.value} €`,
    },
    {
      headerName: "Actions",
      width: 300,
      renderCell: (params) => (
          <ActionsRow params={params} fetchInvoices={fetchInvoices} fetchClients={fetchClients} />
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
        <Typography variant="h2">Liste des factures</Typography>
        <Button variant="contained">
          <Link to={`/invoices`}>Nouvelle facture</Link>
        </Button>
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
          rows={invoices}
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

export default InvoiceListePage;
