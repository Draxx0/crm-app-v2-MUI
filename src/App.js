import InvoiceListePage from "./pages/InvoiceListePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerListePage from "./pages/CustomerListePage";
import MainLayout from "./layouts/MainLayout";
import { useEffect, useState } from "react";
import InvoiceForm from "./pages/InvoiceForm";
import CustomerForm from "./pages/CustomerForm";

function App() {
  const fetchInvoices = async () => {
    fetch("http://localhost:8000/api/invoices")
      .then((response) => response.json())
      .then((data) => setInvoices(data));
  };
  const fetchClients = async () => {
    fetch("http://localhost:8000/api/customers")
      .then((response) => response.json())
      .then((data) => setClients(data));
  };
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  useEffect(() => {
    fetchInvoices();
    fetchClients();
  }, []);
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<InvoiceListePage fetchInvoices={fetchInvoices} fetchClients={fetchClients} invoices={invoices} setInvoices={setInvoices} />} />
          <Route path="/customers" element={<CustomerListePage fetchClients={fetchClients} clients={clients} setClients={setClients} />} />
          <Route path="/invoices" element={<InvoiceForm fetchInvoices={fetchInvoices} />} />
          <Route path="/invoices/:id" element={<InvoiceForm fetchInvoices={fetchInvoices} />} />
          <Route path="/customers-form" element={<CustomerForm fetchClients={fetchClients} />} />
          <Route path="/customers-form/:id" element={<CustomerForm fetchClients={fetchClients} />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
