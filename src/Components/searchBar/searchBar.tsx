import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Icon } from '../Icons/iconsType';
import Icons from '../Icons/icons';

interface Props {
  text?: string;
  style?: object;
  onSearch?: () => void;
}

export default function SearchBar(props:Props) {
  return (
    <TextField
    label={ props.text ? props.text : ""}
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