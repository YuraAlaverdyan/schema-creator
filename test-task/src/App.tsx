import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import SchemaEditor from "./components/SchemaEditor";
import { theme } from "./theme";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SchemaEditor />
    </ThemeProvider>
  );
}

export default App;
