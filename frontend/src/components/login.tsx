import React, { useState } from 'react';
import {IonButton,IonContent,IonPage,IonInput,IonLabel,IonItem,IonSelect,IonSelectOption,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { login, register } from '../services/LoginServices'; // Service for API calls

const LoginRegister: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and registration
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user'); // Default role for registration
  const [responseMessage, setResponseMessage] = useState('');

  const history = useHistory();
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!role){
        setResponseMessage('Please select a role');
    }

    try {
      let response;

      if (isLogin) {
        // Login API call without role
        response = await login(email, password);
        setResponseMessage('Login successful!');
        localStorage.setItem("token",response.token);
        localStorage.setItem("role",response.data.role)
        if(response.data.role == 'user'){
          history.push('/user');
        }
        else{
          history.push('/admin');
        }
        console.log('Login Response:', response.data.role);
      } else {
        // Register API call with role
        response = await register(name, email, password, role);
        setResponseMessage('Registration successful!');
        localStorage.setItem("token",response.token);
        localStorage.setItem("role",response.data.role)
        if(response.data.role == 'user'){
          history.push('/user');
        }
        else{
          history.push('/admin');
        }
        console.log('Register Response:', response.data.role);
      }
    } catch (error) {
    //   setResponseMessage();
      console.error(error);
    }
  };

  return (
    <IonPage>
      <IonContent className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl text-center font-semibold mb-4">
            {isLogin ? 'Login' : 'Register'}
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <IonItem className="mb-4">
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                required
              />
            </IonItem>

            {/* Password Field */}
            <IonItem className="mb-4">
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                required
              />
            </IonItem>

            {/* Registration Fields */}
            {!isLogin && (
              <>
                {/* Name Field */}
                <IonItem className="mb-4">
                  <IonLabel position="floating">Name</IonLabel>
                  <IonInput
                    type="text"
                    value={name}
                    onIonChange={(e) => setName(e.detail.value!)}
                    required
                  />
                </IonItem>

                {/* Role Field */}
                <IonItem className="mb-4">
                  <IonLabel>Role</IonLabel>
                  <IonSelect
                    value={role}
                    onIonChange={(e) => setRole(e.detail.value!)}
                    className="w-full"
                    // required
                  >
                    <IonSelectOption value="user">User</IonSelectOption>
                    <IonSelectOption value="admin">Admin</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </>
            )}

            {/* Submit Button */}
            <div className="flex justify-center mt-4">
              <IonButton type="submit" expand="full" className="bg-blue-500 text-white">
                {isLogin ? 'Login' : 'Register'}
              </IonButton>
            </div>
          </form>

          {/* Response Message */}
          {responseMessage && (
            <div className="mt-4 text-center text-gray-600">{responseMessage}</div>
          )}

          {/* Toggle between Login and Register */}
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-500">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </span>
            <button
              className="text-blue-500 ml-2"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginRegister;
