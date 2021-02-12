import * as React from 'react';
import { ContextProvider } from './components/ContextProvider';
import RootNav from './screens/RootNav'

export default function App() {

  return (
    <ContextProvider>
      <RootNav />
    </ContextProvider>
  );
 
}