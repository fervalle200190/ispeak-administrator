import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const PageHeader = ({ title, buttonTitle, url }) => {
     return (
          <Grid
               container
               justifyContent={"space-between"}
               alignItems={"center"}
               sx={{ mb: 4, pr: 2 }}
          >
               <Typography variant="h4">{title}</Typography>
               {buttonTitle && (
                    <Link to={url} style={{ textDecoration: "none" }}>
                         <Button variant="contained">{buttonTitle}</Button>
                    </Link>
               )}
          </Grid>
     );
};
