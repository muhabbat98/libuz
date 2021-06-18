import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {ApolloClient, ApolloProvider, InMemoryCache,  split, HttpLink, ApolloLink} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities';
import {UserProvider} from './Hooks/User'
import {RoomProvider} from './Hooks/NewRoom'
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';
import Navbar from './Components/Navbar'
// uri: process.env.REACT_APP_GRAPHQL_URL

const httpLink = new HttpLink({
	uri:'/ill'
  });
const wsLink = new WebSocketLink({
	uri: '/subscriptions',
	options: {
	  reconnect: true
	}
  });
  const splitLink = split(
	({ query }) => {
	  const definition = getMainDefinition(query);
	  return (
		definition.kind === 'OperationDefinition' &&
		definition.operation === 'subscription'
	  );
	},
	wsLink,
	httpLink,
  );
  const authLink = setContext((_, { headers }) => {
	return {
	  headers: {
			token: localStorage.getItem('token') || '',
			usertype:localStorage.getItem('usertype') || '',
	  }
	}
  });

const client = new ApolloClient ({
	link:  authLink.concat(splitLink),
	cache: new InMemoryCache()
})

ReactDOM.render(
	
		<BrowserRouter>
			<ApolloProvider client={client}>
				<UserProvider>
					
						<Navbar/>
						<RoomProvider>
							<App />
						</RoomProvider>
					
				</UserProvider>
			</ApolloProvider>
		</BrowserRouter>

	,
  document.getElementById('root')
);

