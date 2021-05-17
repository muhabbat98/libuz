import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
import {UserProvider} from './Hooks/User'
import Navbar from './Components/Navbar'

const client = new ApolloClient ({
	uri:'http://localhost:5000/ill',
	cache: new InMemoryCache(),
	headers: {
		token: localStorage.getItem('token') || '',
		usertype:localStorage.getItem('usertype') || '',
		'client-name': 'Space Explorer [web]',
		'client-version': '1.0.0',
	  },
})

ReactDOM.render(
	
		<BrowserRouter>
			<ApolloProvider client={client}>
				<UserProvider>
					
						<Navbar/>
						<App />
					
				</UserProvider>
			</ApolloProvider>
		</BrowserRouter>

	,
  document.getElementById('root')
);

