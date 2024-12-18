import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonAlert } from '@ionic/react';
import AcknowledgmentTable from '../components/acknowledge';
import { fetchAcknowledgmentData } from '../services/medicalServices';  // API function to fetch acknowledgment data

const AcknowledgmentPage: React.FC = () => {
  const [acknowledgmentData, setAcknowledgmentData] = useState<any[]>([]); // Initialize as empty array
  const [error, setError] = useState<string | null>(null);

  // Function to fetch acknowledgment data
  const loadAcknowledgmentData = async () => {
    try {
      const data = await fetchAcknowledgmentData();  // Call the API function to fetch data
      console.log('Fetched Acknowledgment Data:', data);
      setAcknowledgmentData(data?.data || []);  // Ensure data is in the correct format
    } catch (err) {
      setError('Failed to fetch acknowledgment data');
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    loadAcknowledgmentData();
  }, []);

  return (
    <IonPage>
      <IonContent>
        <h1 style={{ textAlign: 'center' }}>Acknowledgment Records</h1>

        {error && (
          <IonAlert
            isOpen
            message={error}
            buttons={[{ text: 'OK', handler: () => setError(null) }]}/>
        )}

        <AcknowledgmentTable data={acknowledgmentData} />
      </IonContent>
    </IonPage>
  );
};

export default AcknowledgmentPage;
