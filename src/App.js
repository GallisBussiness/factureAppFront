import { AuthProvider, useIsAuthenticated } from 'react-auth-kit';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import {QueryClient,QueryClientProvider } from 'react-query'
import P404 from './components/P404';
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

import { locale, addLocale } from 'primereact/api';
import { env } from './env';
import { MantineProvider } from '@mantine/core';

addLocale('fr', {
  firstDayOfWeek: 1,
  dayNames: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
  dayNamesShort: ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
  dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  monthNames: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'decembre'],
  monthNamesShort: ['jan', 'fev', 'mar', 'avr', 'mai', 'jun', 'jul', 'aoû', 'sep', 'oct', 'nov', 'dec'],
  today: 'Aujourd\'hui',
  clear: 'Vider',
  accept:	'accepter',
  reject:	'Non',
  choose:	'Choisir',
  upload:	'télécharger',
  cancel:	'Annuler',
  passwordPrompt:	'Entrer un mot de passe',
  weak:	'Faible',
  medium:'Moyen',
  strong:	'Fort',
  emptyMessage: 'Aucun résultats trouvés !'
})


locale('fr');

const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  }
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <AuthProvider authType = {'localstorage'}
                  authName={env.tokenStorageName}
                  cookieDomain={window.location.hostname}
    cookieSecure={window.location.protocol === "https:"}>
       <MantineProvider withGlobalStyles withNormalizeCSS>
         <BrowserRouter>
        <Routes>
       <Route path="/" element={<Login />} />
       <Route element={<PrivateRoute><Dashboard/></PrivateRoute>} path={'dashboard/*'}/>
       <Route path="login" element={<Login/>} />
       <Route path="*" element={<P404/>} />
     </Routes>
      </BrowserRouter>
       </MantineProvider>
   </AuthProvider> 
   </QueryClientProvider>
  );
}

export default App;

const PrivateRoute = ({children}) => {
  const hasAuth = useIsAuthenticated()()
  return (
    <>
     {hasAuth ? children: <Navigate to="/login" />}
    </>
  )
}
