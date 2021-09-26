import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import "./Message.css";

import {
  updateMessageStatus,
  selectMessageStatus,
} from "../features/messageSlice";
import { useDispatch, useSelector } from "react-redux";

// function Alert(props) {
//   return <Stack elevation={5} variant="filled" {...props} />;
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     "& > * + *": {
//       marginTop: theme.spacing(1),
//     },
//     backgroundColor: "white",
//   },
// }));

function Message(props) {
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const messageStatus = useSelector(selectMessageStatus);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
      dispatch(updateMessageStatus(false));
    }, 2000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  return (
    <div className="message">
      <Alert severity="error">{props.message}</Alert>
    </div>
  );
}

export default Message;
