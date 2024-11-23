// src/SoldeStats.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_SOLDE_STATS = gql`
  query GetSoldeStats {
    totalSolde {
      count
      sum
      average
    }
  }
`;

const SoldeStats = () => {
  const { loading, error, data } = useQuery(GET_SOLDE_STATS);

  if (loading) return <p style={styles.loading}>Loading...</p>;
  if (error) return <p style={styles.error}>Error: {error.message}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Balance Statistics</h2>
      <div style={styles.card}>
        <div style={styles.statItem}>
          <span style={styles.label}>Total Accounts:</span>
          <span style={styles.value}>{data.totalSolde.count}</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.label}>Total Balance:</span>
          <span style={styles.value}>{data.totalSolde.sum.toFixed(2)}</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.label}>Average Balance:</span>
          <span style={styles.value}>{data.totalSolde.average.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '30px auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    fontSize: '1.8rem',
    color: '#333',
    marginBottom: '20px',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px 20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  statItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
    fontSize: '1.1rem',
    borderBottom: '1px dashed #ddd',
    paddingBottom: '8px',
  },
  label: {
    color: '#555',
    fontWeight: '500',
  },
  value: {
    color: '#007bff',
    fontWeight: '700',
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

export default SoldeStats;
