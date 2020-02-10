import React, { useState } from "react";
import {
  makeStyles,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from "@material-ui/core/";

import config from "../../config/config";
import { UserDetails } from "../users/userDetails";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    margin: "20px"
  },
  media: {
    height: 100
  },
  gridItem: {
    maxWidth: 345
  },
  icon: {
    fontSize: "100px",
    color: "#3f51b5"
  }
});

const User = ({ name, email, photo, id }) => {
  const classes = useStyles();
  const uploadsEndPoint = "uploads/";

  const [openDetails, setOpenDetails] = useState(false);
  const [userId, setUserId] = useState("");

  const handleClickSeeUserDetails = id => {
    setOpenDetails(true);
    setUserId(id);
  };

  return (
    <Grid item xs={12} sm={4} className={classes.gridItem} m={2}>
      <Card className={classes.card}>
        <CardActionArea onClick={() => handleClickSeeUserDetails(id)}>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <CardMedia
                className={classes.media}
                image={
                  photo ? `${config.baseUrl + uploadsEndPoint + photo}` : null
                }
                title="User photo"
              >
                {!photo ? <AccountBoxIcon className={classes.icon} /> : null}
              </CardMedia>
            </Grid>
            <Grid item sm={8}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {email}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
      {openDetails ? (
        <UserDetails open={openDetails} setOpen={setOpenDetails} id={userId} />
      ) : null}
    </Grid>
  );
};

export default User;
