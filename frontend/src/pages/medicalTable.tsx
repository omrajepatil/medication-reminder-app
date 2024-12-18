import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonAlert } from '@ionic/react';
import AdminTable from '../components/medicalTable';
import { fetchAllMedicalData } from '../services/medicalServices';

const AdminPage: React.FC = () => {
  const [medicalData, setMedicalData] = useState<any[]>([]); // Initialize as an empty array
  const [error, setError] = useState<string | null>(null);

  const loadMedicalData = async () => {
    try {
      const data = await fetchAllMedicalData();
      console.log('Fetched Medical Data:', data);
      setMedicalData(data?.data || []);  // Ensure data is in the correct format
    } catch (err) {
      setError('Failed to fetch medical data');
    }
  };

  useEffect(() => {
    loadMedicalData();
  }, []);

  return (
    <IonPage>
      <IonContent>
        <h1 style={{ textAlign: 'center' }}>Medical Table</h1>

        {error && (
          <IonAlert
            isOpen
            message={error}
            buttons={[{ text: 'OK', handler: () => setError(null) }]}/>
        )}

        <AdminTable data={medicalData} />
      </IonContent>
    </IonPage>
  );
};

export default AdminPage;
