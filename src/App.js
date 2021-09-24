import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import WithSubnavigation from './Components/Navbar.js';
import { DataContext } from './Components/DataContext.js'
import Home from './Components/Home.js';
import Dashboard from './Components/Dashboard.js';
import Transactions from './Components/Transactions.js';
import Budgets from './Components/Budgets.js';
import About from './Components/About.js';
import Signup from './Components/Signup.js';
import Login from './Components/Login.js';

function App() {

    const [transactionDate, setTransactionDate] = useState();

    return (
        <ChakraProvider theme={theme}>
            <DataContext.Provider
                value = {{ transactionDate, setTransactionDate }}
            >
                <WithSubnavigation />
                <Route exact path="/" component={Home} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/transactions" component={Transactions} />
                <Route exact path="/budgets" component={Budgets} />
                <Route exact path="/about" component={About} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
            </DataContext.Provider>
        </ChakraProvider>
    );
}

export default App;
