import { MenuItem, TextField } from "@mui/material";

export const SelectOptions = ({
     label,
     options,
     handleSelect,
     value,
     multiple = false,
}) => {
     return (
          <>
               <TextField
                    label={label}
                    fullWidth
                    value={value}
                    onChange={handleSelect}
                    SelectProps={{
                         multiple,
                         sx: {
                              maxWidth: {
                                   xs: '300px',
                                   sm: "600px",
                                   md: "900px",
                                   lg: "1200px",
                              },
                         },
                    }}
                    variant={"outlined"}
                    multiple={multiple}
                    select
                    placeholder={label}
                    InputLabelProps={{
                         className: "textfield-label",
                    }}
               >
                    {options.map((option) => (
                         <MenuItem key={option.value} value={option.value}>
                              {option.label}
                         </MenuItem>
                    ))}
               </TextField>
          </>
     );
};
