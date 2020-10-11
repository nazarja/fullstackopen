import React, { useState } from 'react'
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import PhoneForm from './components/PhoneForm';
import LoginForm from './components/LoginForm';

const PERSON_DETAILS = gql`
fragment PersonDetails on Person {
	name
	phone 
	address {
	  street 
	  city
	}
  }
`;

const PERSON_ADDED = gql`
  subscription {
    personAdded {
      ...PersonDetails
    }
  }
  
${PERSON_DETAILS}
`;

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`;


const ALL_PERSONS = gql`
	{
		allPersons {
			name
			phone
			id
		}
	}
`;

const CREATE_PERSON = gql`
	mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String) {
			addPerson(
				name: $name,
				street: $street,
				city: $city,
				phone: $phone
			  ) {
					name
					phone
					id
					address {
					street
					city
					}
				}
	}
`;

const EDIT_NUMBER = gql`
  mutation editNumber($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone)  {
      name
      phone
      address {
        street
        city
      }
      id
    }
  }
`;

const App = () => {
	const client = useApolloClient();
	const persons = useQuery(ALL_PERSONS);
	const [editNumber] = useMutation(EDIT_NUMBER);
	const [errorMessage, setErrorMessage] = useState(null);

	const handleError = error => {
		if (error)
			setErrorMessage(error.message);
		setTimeout(() => setErrorMessage(null), 2000);
	};

	const errorNotification = () => errorMessage &&
		<div style={{ color: 'red' }}>
			{errorMessage}
		</div>

	const [token, setToken] = useState(null);
	const [login] = useMutation(LOGIN, {
		onError: handleError
	})

	const logout = () => {
		setToken(null)
		localStorage.clear()
		client.resetStore()
	}

	const updateCacheWith = (addedPerson) => {
		const includedIn = (set, object) => 
		  set.map(p => p.id).includes(object.id)  
	
		const dataInStore = client.readQuery({ query: ALL_PERSONS })
		if (!includedIn(dataInStore.allPersons, addedPerson)) {
		  dataInStore.allPersons.push(addedPerson)
		  client.writeQuery({
			query: ALL_PERSONS,
			data: dataInStore
		  })
		}   
	  }
	
	  useSubscription(PERSON_ADDED, {
		onSubscriptionData: ({ subscriptionData }) => {
		  const addedPerson = subscriptionData.data.personAdded
		  notify(`${addedPerson.name} added`)
		  updateCacheWith(addedPerson)
		}
	  })
	
	  const [addPerson] = useMutation(CREATE_PERSON, {
		onError: handleError,
		update: (store, response) => {
		  updateCacheWith(response.data.addPerson)
		}
	  })

	if (!token) {
		return (
			<div style={{ color: 'red' }}>
				{errorNotification()}
				<h2>Login</h2>
				<LoginForm login={login} setToken={(token) => setToken(token)} />
			</div>
		)
	}


	return (
		<>
			{
				errorMessage &&
				<div style={{ color: 'red' }}>
					{errorMessage}
				</div>
			}

			<Persons result={persons} />

			<h2>Create Person</h2>
			<PersonForm addUser={addPerson} />

			<h2>change number</h2>
			<PhoneForm editNumber={editNumber} />

			<button onClick={logout}>logout</button>
		</>
	);
};

export default App;
