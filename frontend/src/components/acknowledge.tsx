import React from 'react';
import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonRow } from '@ionic/react';

interface Acknowledgment {
  id: number;
  userId: number;
  medicineId: number;
  status: 'Taken' | 'Skipped';
  timestamp: string;
}

interface AcknowledgmentTableProps {
  data: Acknowledgment[];
}

const AcknowledgmentTable: React.FC<AcknowledgmentTableProps> = ({ data }) => {
  return (
    <IonCard>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol><strong>ID</strong></IonCol>
            <IonCol><strong>User ID</strong></IonCol>
            <IonCol><strong>Medicine ID</strong></IonCol>
            <IonCol><strong>Status</strong></IonCol>
            <IonCol><strong>Timestamp</strong></IonCol>
          </IonRow>

          {data.length > 0 ? (
            data.map((item) => (
              <IonRow key={item.id}>
                <IonCol>{item.id}</IonCol>
                <IonCol>{item.userId}</IonCol>
                <IonCol>{item.medicineId}</IonCol>
                <IonCol>{item.status}</IonCol>
                <IonCol>{item.timestamp}</IonCol>
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

export default AcknowledgmentTable;
