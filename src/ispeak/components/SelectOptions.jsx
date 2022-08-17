import { MenuItem, TextField } from "@mui/material";

export const SelectOptions = ({ label, options, handleSelect, value }) => {
     return (
          <>
               <TextField
                    label={label}
                    fullWidth
                    value={value}
                    onChange={handleSelect}
                    variant={"outlined"}
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
