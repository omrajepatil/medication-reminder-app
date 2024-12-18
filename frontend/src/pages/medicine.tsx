import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom'; // Import useHistory for navigation
import MedicalForm from '../components/medicine'; // Import the MedicalForm component

const MedicalFormPage: React.FC = () => {
  const history = useHistory(); // Initialize useHistory for navigation

  const navigateToMedicalTable = () => {
    history.push('/medical-table'); // Navigate to the Medical Table page
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Medical Form</IonTitle>
          <IonButtons slot="end"> {/* Place button on the right (end slot) */}
            <IonButton onClick={navigateToMedicalTable}>Medical Table</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <MedicalForm /> {/* Include the MedicalForm component here */}
      </IonContent>
    </IonPage>
  );
};

export default MedicalFormPage;
