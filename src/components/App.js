import React, { useState, useEffect } from 'react'
import '../styles/App.css';

const App = () => {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAscending, setIsAscending] = useState(true);
  const [state, setState] = useState(false)

  const fetchUsersData = () => {
    setState(true)
    setIsLoading(true);
    fetch('https://content.newtonschool.co/v1/pr/main/users')
      .then(response => response.json())
      .then(data => {
        setIsLoading(false);
        setUsers(data.map(({ id, name, email }) => ({ id, name, email })));
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });

  };

  const sortUsersByNameLength = () => {
    setUsers(users => {
      const sortedUsers = [...users].sort((user1, user2) => {
        const nameLength1 = user1.name.length;
        const nameLength2 = user2.name.length;
        return isAscending ? nameLength1 - nameLength2 : nameLength2 - nameLength1;
      });
      setIsAscending(isAscending => !isAscending);
      return sortedUsers;
    });
  };

  // useEffect(() => {

  //   fetchUsersData();
  // }, []);
  return (
    <div id="main">
      <h2>User List</h2>
      <button className="fetch-data-btn" onClick={fetchUsersData}>Fetch User Data</button>
      <button className="sort-btn" onClick={sortUsersByNameLength}>
        {isAscending ? 'Sort by name length (ascending)' : 'Sort by name length (descending)'}
      </button>
      {isLoading && <p>Loading...</p>}

      {!isLoading && users.length > 0 && state &&
        <div>
          <div className='users-section'>
            {users.map(({ id, name, email }) => (
              <li>
                <section className='id-section'>{id}</section>
                <section className='name-email-section'>
                  <p className='name'>{name}</p>
                  <p className='email'>{email} </p>
                </section>
              </li>
            ))}
          </div>

        </div>
      }
    </div>
  )
}


export default App;

