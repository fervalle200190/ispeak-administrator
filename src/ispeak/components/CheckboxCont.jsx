import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export const CheckboxCont = ({ label, handleCheck, value, name = '' }) => {
     return (
          <FormGroup>
               <FormControlLabel
                    control={
                         <Checkbox
                              value={value}
                              name={name}
                              onChange={handleCheck}
                              sx={{
                                   color: "primary.main",
                              }}
                         />
                    }
                    label={label}
               />
          </FormGroup>
     );
};
