import axios from 'axios';

const API_URL = 'https://finance-tracker-backend-ew8w.onrender.com/'; // localhost:5000/ for local development

// Add a new transaction
const addTransaction = async (inputdata) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${API_URL}addtransaction`, inputdata, {
    headers: {
        Authorization: `Bearer ${token}`,  
        "Content-Type": "application/json",
    },
  });
 
  return response.data;
};

// Get All Transactions
const getTransactions = async (filters) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${API_URL}gettransactions`, {filters}, {
    headers: {
        Authorization: `Bearer ${token}`,  
        "Content-Type": "application/json",
    },
  });
 
  return response.data;
};

const TransactionService = {
  addTransaction,
  getTransactions
};

export default TransactionService;
