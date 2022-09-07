import './App.css';
import FileUpload from './FileUpload';
import Navbar from './Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F0653A',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar />
        <FileUpload />
      </div>
    </ThemeProvider>
  );
}

export default App;
