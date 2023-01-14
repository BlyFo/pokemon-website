import React from 'react';
import Switch from '@mui/material/Switch';

interface Props {
  value: boolean,
  onValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  text?: string;
}


function CustomSwitch(props: Props) {
  return (
    <div style={{ height: "50px", position: "relative", marginRight: "5px" }}>
      <p style={{ margin: 0, fontSize: "16px" }}>{props.text}</p>
      <Switch
        disableRipple
        sx={{
          position: "absolute",
          bottom: "0%",
          marginTop: "0px",
          marginLeft: "2px",
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
    </div>
  );
}

export default CustomSwitch;