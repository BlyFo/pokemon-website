import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

interface Props {
    text?: string;
    style?: object;
    onSearch?: () => void;
  }

export default function SearchBar(props:Props) {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={ props.text ? props.text : "" }
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        {/*<SearchIcon />*/}
      </IconButton>
    </Paper>
  );
}