import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './theme'
import SchemaEditor from './components/schema/SchemaEditor'
import './App.css'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SchemaEditor />
    </ThemeProvider>
  );
}

export default App;
