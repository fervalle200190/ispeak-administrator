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
                    SelectProps={{ multiple }}
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
