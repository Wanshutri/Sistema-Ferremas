import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
        <Box sx={{ minWidth: 120, paddingBottom: 2 }}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Herramientas</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
            >
            <MenuItem value={10}>Construcción</MenuItem>
            <MenuItem value={20}>Hogar</MenuItem>
            <MenuItem value={30}>Empresarial</MenuItem>
            </Select>
        </FormControl>
        </Box>
        <Box sx={{ minWidth: 120, paddingBottom: 2 }}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Precio</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
            >
            <MenuItem value={10}>De menor a mayor</MenuItem>
            <MenuItem value={20}>De mayor a menor</MenuItem>
            </Select>
        </FormControl>
        </Box>

        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Material</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
            >
            <MenuItem value={10}>Metal</MenuItem>
            <MenuItem value={20}>Madera</MenuItem>
            <MenuItem value={30}>Plástico</MenuItem>
            </Select>
        </FormControl>
        </Box>


        
    </div>
  );
}
