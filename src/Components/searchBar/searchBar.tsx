import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Icon } from '../Icons/iconsType';
import Icons from '../Icons/icons';

interface Props {
  text?: string;
  style?: object;
  onSearch?: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar(props:Props) {

  const [text,setText] = React.useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    if(props.onSearch) props.onSearch(event.target.value);
  };

  return (
    <TextField
    label={ props.text ? props.text : ""}
    value={text}
    onChange={handleChange}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <Icons icon={ Icon.SEARCH } color="white" size='s' />
        </InputAdornment>
      ),
    }}
    variant="standard"
  />
  );
}