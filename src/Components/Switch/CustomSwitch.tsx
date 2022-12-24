import React from 'react';
import Switch from '@mui/material/Switch';

interface Props {
  value: boolean,
  onValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


function CustomSwitch(props: Props) {
  return (
    <Switch
      disableRipple
      sx={{
        marginTop: "10px",
        height: "20px",
        width: "50px",
        padding: "0px",
        "& .MuiSwitch-thumb": {
          backgroundColor: "var(--color4)",
          height: "12px",
          width: "12px",
          margin: "0px",
          boxSizing: 'border-box',
        },
        "& .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked": {
          transform: 'translateX(29px)',
        },
        "& .MuiSwitch-track": {
          backgroundColor: "var(--color3)",
          borderRadius: "20px",
        },
        '& .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track': {
          backgroundColor: 'white',
          opacity: 0.6,
        },
        "& .MuiButtonBase-root": {
          padding: "5px",
        },
      }}
      checked={props.value}
      onChange={props.onValueChange}
    />
  );
}

export default CustomSwitch;