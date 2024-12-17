import React, { useState } from 'react';
import { IonContent, IonItem, IonLabel, IonInput, IonDatetime, IonButton, IonPage } from '@ionic/react';
import { addData } from '../services/medicalServices'; // Assuming this is the service that handles API interaction

const MedicineFormPage: React.FC = () => {
  const [medicineData, setMedicineData] = useState({
    name: '',
    dosage: '',
    scheduleTime: '', // DateTime format (this includes date and time)
  });

  const [error, setError] = useState<string>(''); // Error message for validation

  // Handle changes for form fields
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setMedicineData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!medicineData.name || !medicineData.dosage || !medicineData.scheduleTime) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Extracting just the time part from the scheduleTime (HH:mm:ss)
      const time = new Date(medicineData.scheduleTime).toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      const formattedData = {
        name: medicineData.name,
        dosage: medicineData.dosage,
        scheduleTime: time, // sending time in HH:mm:ss format
      };

      // Call the service to send data to the backend
      await addData(formattedData);
      alert('Medicine added successfully!');
      setMedicineData({ name: '', dosage: '', scheduleTime: '' }); // Reset form
    } catch (error) {
      setError('Error adding medicine');
    }
  };

  return (
    <IonPage>
      <IonContent>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Medicine Name Input */}
          <IonItem>
            <IonLabel position="floating">Medicine Name</IonLabel>
            <IonInput
              name="name"
              value={medicineData.name}
              onIonChange={handleInputChange}
              required
            />
          </IonItem>

          {/* Dosage Input */}
          <IonItem>
            <IonLabel position="floating">Dosage</IonLabel>
            <IonInput
              name="dosage"
              value={medicineData.dosage}
              onIonChange={handleInputChange}
              required
            />
          </IonItem>

          {/* Schedule Time Input */}
          <IonItem>
            <IonLabel position="floating">Schedule Time</IonLabel>
            <IonDatetime
              name="scheduleTime"
              value={medicineData.scheduleTime}
              onIonChange={handleInputChange}
            //   displayFormat="HH:mm" // Display only time (HH:mm)
            //   required
            //   placeholder="Select time"
            />
          </IonItem>

          {/* Display error message if any */}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {/* Submit Button */}
          <IonButton expand="full" onClick={handleSubmit}>
            Add Medicine
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default MedicineFormPage;
