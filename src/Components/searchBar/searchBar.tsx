import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import { Icon } from '../Icons/iconsType';
import Icons from '../Icons/icons';

interface Props {
  text?: string;
  style?: object;
  onSearch?: React.Dispatch<React.SetStateAction<string>>;
  options?: Array<string>;
}

export default function SearchBar(props: Props) {

  const [text, setText] = React.useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    if (props.onSearch) props.onSearch(event.target.value);
  };

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={props.options ? props.options : []}
      sx={{
        width: 300,
        "& .MuiFormLabel-root": {
          color: "var(--color3)"
        }
      }}
      renderInput={(params) =>
        <TextField
          {...params}
          label={props.text ? props.text : ""}
          value={text}
          onChange={handleChange}
          InputLabelProps={{
            style: { color: 'var(--color3)' },
          }}
          sx={{
            input: { color: 'var(--color3)' },
            '& .MuiInput-underline:before': {
              borderBottomColor: 'var(--color3) !important',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: 'var(--color4)',
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icons icon={Icon.SEARCH} color="var(--color3)" size='s' />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      }
    />
  );
}