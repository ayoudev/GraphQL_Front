import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_ALL_COMPTES = gql`
  query GetAllComptes {
    allComptes {
      id
      solde
      dateCreation
      type
    }
  }
`;

const CompteList = () => {
  const { loading, error, data } = useQuery(GET_ALL_COMPTES);

  if (loading) return <p style={styles.loading}>Loading...</p>;
  if (error) return <p style={styles.error}>Error: {error.message}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>All Accounts</h2>
      <div style={styles.cardContainer}>
        {data.allComptes.map((compte) => (
          <div key={compte.id} style={styles.card}>
            <h3 style={styles.cardTitle}>Account ID: {compte.id}</h3>
            <p><strong>Balance:</strong> {compte.solde}</p>
            <p><strong>Creation Date:</strong> {compte.dateCreation}</p>
            <p><strong>Type:</strong> {compte.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px', // Augmentée pour accueillir 3 colonnes
    margin: '0 auto',
    padding: '20px',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
    fontSize: '1.8rem',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // 3 colonnes fixes
    gap: '20px', // Espacement entre les cartes
  },
  card: {
    backgroundColor: '#f7f9fc',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '15px',
    textAlign: 'left',
  },
  cardTitle: {
    fontSize: '1.2rem',
    marginBottom: '10px',
    color: '#007bff',
  },
  loading: {
    textAlign: 'center',
    color: '#555',
    fontSize: '1.2rem',
  },
  error: {
    textAlign: 'center',
    color: '#ff4d4f',
    fontSize: '1.2rem',
  },
};


export default CompteList;
