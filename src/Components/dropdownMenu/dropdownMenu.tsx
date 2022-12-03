import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
  text: string;
  style?: object;
  options: Array<string>;
  nullValue?: string;
  onSelect?: React.Dispatch<React.SetStateAction<any>>;
}

export default function DropdownMenu(props:Props) {

    const [selected, setSelected] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value as string);
    if(props.onSelect){ 
      if(event.target.value === props.nullValue){
        props.onSelect(null);
      }else{
        props.onSelect(event.target.value) 
      }
    }
  };

  const getItems = (items:Array<string>) => {
    const itemsTotal = [...items]
    if(props.nullValue){
      itemsTotal.unshift(props.nullValue);
    }
    return itemsTotal;
  }

  const dropDownStyle = {
    display: 'flex', 
    alignItems: "center",
    marginTop: "10px", 
    height: "35px", 
    width: "fit-content", 
    border: "1px solid rgba(255, 255, 255, 0)" // necesary to fix a problem with the navbar
  }

  return ( 
  <div style={dropDownStyle}>
    <InputLabel id="select-label" style={{marginRight: "10px", userSelect: "none"}}>{props.text}</InputLabel>
    <Select
      labelId="select-label"
      id="select"
      value={selected}
      style={{height: "35px", width:"200px"}}
      onChange={handleChange}>
        {getItems(props.options).map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
        ))}
    </Select>
  </div>
  );
}