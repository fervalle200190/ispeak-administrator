import { Button, Grid, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

export const PageHeader = ({ title, buttonTitle, url, elementsToDelete = [], onDeleteAll }) => {
     return (
          <Grid
               container
               justifyContent={"space-between"}
               alignItems={"center"}
               sx={{ mb: 4, pr: 2 }}
          >
               <Typography variant="h4">{title}</Typography>
               {buttonTitle && (
                    <Grid item>
                         <IconButton
                              onClick={onDeleteAll}
                              className={`${
                                   elementsToDelete.length > 0 ? "" : "fade-in-trash"
                              } trash`}
                              sx={{mr: 2}}
                         >
                              <DeleteRoundedIcon color={"primary"} />
                         </IconButton>
                         <Link to={url} style={{ textDecoration: "none" }}>
                              <Button variant="contained">{buttonTitle}</Button>
                         </Link>
                    </Grid>
               )}
          </Grid>
     );
};
