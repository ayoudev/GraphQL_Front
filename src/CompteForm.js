import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { parse, format } from 'date-fns';

// Define the mutation for saving a new compte
const SAVE_COMPTE = gql`
  mutation SaveCompte($compte: CompteRequest!) {
    saveCompte(compte: $compte) {
      id
      solde
      dateCreation
      type
    }
  }
`;

// Define the query for fetching all comptes
const GET_COMPTES = gql`
  query GetComptes {
    allComptes {
      id
      solde
      dateCreation
      type
    }
  }
`;

const CompteForm = () => {
  const [solde, setSolde] = useState('');
  const [dateCreation, setDateCreation] = useState('');
  const [type, setType] = useState('COURANT');
  const [saveCompte] = useMutation(SAVE_COMPTE, {
    refetchQueries: [{ query: GET_COMPTES }],
  });

  const convertDateToYYYYMMDD = (date) => {
    try {
      const parsedDate = parse(date, 'dd/MM/yyyy', new Date());
      return format(parsedDate, 'dd/MM/yyyy');
    } catch (error) {
      console.error('Invalid date format', error);
      return ''; // Return empty string if invalid
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDate = convertDateToYYYYMMDD(dateCreation);

    saveCompte({
      variables: {
        compte: {
          solde: parseFloat(solde),
          dateCreation: formattedDate,
          type,
        },
      },
    })
      .then(({ data }) => {
        console.log('New account created:', data.saveCompte);
      })
      .catch((error) => {
        console.error('Error saving account:', error);
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create New Account</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Balance:</label>
          <input
            type="number"
            value={solde}
            onChange={(e) => setSolde(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Creation Date (dd/MM/yyyy):</label>
          <input
            type="text"
            value={dateCreation}
            onChange={(e) => setDateCreation(e.target.value)}
            placeholder="DD/MM/YYYY"
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Account Type:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={styles.select}
          >
            <option value="COURANT">Courant</option>
            <option value="EPARGNE">Epargne</option>
          </select>
        </div>
        <button type="submit" style={styles.button}>
          Save Account
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f7f9fc',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontSize: '1rem',
    color: '#555',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    color: '#333',
  },
  select: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    color: '#333',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    textAlign: 'center',
  },
};

export default CompteForm;
