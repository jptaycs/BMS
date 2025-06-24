import { QueryClient } from '@tanstack/query-core'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClientProvider } from '@tanstack/react-query'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import LoginPage from './pages/Login';
import AppLayout from './components/ui/applayout';
import Dashboard from './pages/Dashboard';
function App() {
  const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 1000 * 60 * 60 * 24
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Router>
        <Routes>
          <Route
            element={<AppLayout />}
          >
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
          <Route index element={<LoginPage />}></Route>
        </Routes>
      </Router >
    </QueryClientProvider>
  )
}

export default App;
