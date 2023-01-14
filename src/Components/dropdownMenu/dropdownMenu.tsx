import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Icons from '../Icons/icons';
import { Icon } from '../Icons/iconsType';

interface Props {
  text: string;
  style?: object;
  options: Array<string>;
  nullValue?: string;
  onSelect?: React.Dispatch<React.SetStateAction<any>>;
  icons?: boolean;
}

const selectStyle = {
  height: "35px",
  maxWidth: "200px",
  width: "auto",
  color: "var(--color3)",
  display: "flex",
  justifyContent: "center",
  border: "1px solid var(--color3)",
  borderRadius: "7px",
  "& .MuiSvgIcon-root": {
    color: "var(--color3)",
  },
  "& .MuiFilledInput-input": {
    display: "flex",
    alignItems: "center",
    marginBottom: "14px",
  },
}

export default function DropdownMenu(props: Props) {

  const [selected, setSelected] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value as string);
    if (props.onSelect) {
      if (event.target.value === props.nullValue) {
        props.onSelect(null);
      } else {
        props.onSelect(event.target.value)
      }
    }
  };

  const getItems = (items: Array<string>) => {
    if (!items || items.length === 0) return [];
    const itemsTotal = [...items]
    if (props.nullValue) {
      itemsTotal.unshift(props.nullValue);
    }
    if (selected === "") setSelected(itemsTotal[0]);
    return itemsTotal;
  }

  const dropDownStyle = {
    display: 'flex',
    alignItems: "center",
    marginTop: "10px",
    height: "35px",
    width: "fit-content",
    border: "1px solid rgba(255, 255, 255, 0)", // necesary to fix a problem with the navbar
  }

  return (
    <div style={dropDownStyle}>
      <InputLabel
        id="select-label"
        sx={{
          marginRight: "10px",
          userSelect: "none",
          color: "var(--color3)",
          '@media (max-width: 1120px)': {
            display: "none"
          }
        }}>{props.text}</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={selected}
        defaultValue={"fire"}
        variant="filled"
        disableUnderline={true}
        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: 300,
              minHeight: 100,
              borderRadius: "10px",
              backgroundColor: "--var(color3)",
              marginTop: "5px",
              '&::-webkit-scrollbar': {
                width: "8px",
                backgroundColor: "white"
              },
              "&::-webkit-scrollbar-thumb": {
                border: "2px solid transparent",
                backgroundClip: "content-box",
                backgroundColor: "var(--color2)",
                borderRadius: "100px",
              }
            }
          }
        }}
        sx={{ ...selectStyle, ...props.style }}
        onChange={(e) => handleChange(e)}>
        {getItems(props.options).map((option) => (
          <MenuItem key={option} value={option}>
            {props.icons && <Icons icon={option as Icon} size={"s"} style={{ marginRight: "7px" }} />}
            {option}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}