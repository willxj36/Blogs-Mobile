import * as React from 'react';
import { LoggedInProvider } from './components/LoggedInProvider';
import RootNav from './screens/RootNav'

export default function App() {

  return (
    <LoggedInProvider>
      <RootNav />
    </LoggedInProvider>
  );
 
}