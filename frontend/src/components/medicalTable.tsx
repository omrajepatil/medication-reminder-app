import React, { useState, useEffect } from 'react';
import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonRow } from '@ionic/react';
import { deleteMedicine, logAcknowledgment } from '../services/medicalServices';  // Import the API functions

interface Medicine {
  id: number;
  userId: number;
  name: string;
  dosage: string;
  scheduleTime: string;
}

interface AdminTableProps {
  data: Medicine[] | undefined; // Define data as possibly undefined
}

const AdminTable: React.FC<AdminTableProps> = ({ data }) => {
  const [tableData, setTableData] = useState<Medicine[]>([]);

  // Sync `tableData` with `data` when it changes
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setTableData(data);
    } else {
      console.error('Invalid data passed to AdminTable:', data);
    }
  }, [data]);

  // Handle delete request
  const handleDelete = async (id: number) => {
    try {
      const response = await deleteMedicine(id);  // Call delete API function
      if (response.status) {
        console.log('Delete successful:', response.message);
        // Remove the deleted item from tableData
        setTableData((prevData) => prevData.filter((item) => item.id !== id));
      } else {
        console.error('Failed to delete medicine:', response.message);
      }
    } catch (error) {
      console.error('Error deleting medicine:', error);
    }
  };

  // Handle taken request
  const handleTaken = async (medicine: Medicine) => {
    try {
      const response = await logAcknowledgment(medicine.userId, medicine.id, 'Taken');  // Call logAcknowledgment API function
      if (response.status) {
        console.log('Acknowledgment logged successfully:', response.message);
      } else {
        console.error('Failed to log acknowledgment:', response.message);
      }
    } catch (error) {
      console.error('Error logging acknowledgment:', error);
    }
  };

  return (
    <IonCard>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol><strong>ID</strong></IonCol>
            <IonCol><strong>User ID</strong></IonCol>
            <IonCol><strong>Medicine Name</strong></IonCol>
            <IonCol><strong>Dosage</strong></IonCol>
            <IonCol><strong>Schedule Time</strong></IonCol>
            <IonCol><strong>Actions</strong></IonCol>
          </IonRow>

          {tableData.length > 0 ? (
            tableData.map((item) => (
              <IonRow key={item.id}>
                <IonCol>{item.id}</IonCol>
                <IonCol>{item.userId}</IonCol>
                <IonCol>{item.name}</IonCol>
                <IonCol>{item.dosage}</IonCol>
                <IonCol>{item.scheduleTime}</IonCol>
                <IonCol>
                  <IonButton color="danger" size="small" onClick={() => handleDelete(item.id)}>
                    Delete
                  </IonButton>

                  <IonButton color="success" size="small" onClick={() => handleTaken(item)}>
                    Taken
                  </IonButton>
                </IonCol>
              </IonRow>
            ))
          ) : (
            <IonRow>
              <IonCol size="12" style={{ textAlign: 'center' }}>
                No data available.
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default AdminTable;
