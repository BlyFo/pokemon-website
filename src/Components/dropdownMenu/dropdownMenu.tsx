import React from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
    text: string;
    style?: object;
    options: Array<string>;
    onSearch?: () => void;
  }

export default function DropdownMenu(props:Props) {

    const [selected, setSelected] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value as string);
  };

  return ( 
  <>
    <InputLabel id="select-label">{props.text}</InputLabel>
    <Select
      labelId="select-label"
      id="select"
      value={selected}
      label={props.text}
      onChange={handleChange}
    >
        {props.options.map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
        ))}
    </Select>
  </>
  );
}