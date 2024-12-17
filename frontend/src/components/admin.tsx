import React from 'react';
import { IonCard, IonCardContent, IonCol, IonGrid, IonRow } from '@ionic/react';

interface AdminTableProps {
  data: Array<{
    id: number;
    userId: number;
    name: string;
    dosage: string;
    scheduleTime: string;
  }>;
}

const AdminTable: React.FC<AdminTableProps> = ({ data }) => {
  return (
    <IonCard>
      <IonCardContent>
        <IonGrid>
          {/* Table Header */}
          <IonRow>
            <IonCol><strong>ID</strong></IonCol>
            <IonCol><strong>User ID</strong></IonCol>
            <IonCol><strong>Medicine Name</strong></IonCol>
            <IonCol><strong>Dosage</strong></IonCol>
            <IonCol><strong>Schedule Time</strong></IonCol>
          </IonRow>

          {/* Table Rows */}
          {data.length > 0 ? (
            data.map((item) => (
              <IonRow key={item.id}>
                <IonCol>{item.id}</IonCol>
                <IonCol>{item.userId}</IonCol>
                <IonCol>{item.name}</IonCol>
                <IonCol>{item.dosage}</IonCol>
                <IonCol>{item.scheduleTime}</IonCol>
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
