import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import MedicalForm from '../components/medicine'; // Import the MedicalForm component

const MedicalFormPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Medical Form</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <MedicalForm />  {/* Include the MedicalForm component here */}
      </IonContent>
    </IonPage>
  );
};

export default MedicalFormPage;
