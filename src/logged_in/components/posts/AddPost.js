import React, { Fragment, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Button, Box } from "@material-ui/core";
import ActionPaper from "../../../shared/components/ActionPaper";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";
import AddPostOptions from "./AddPostOptions";

function AddPost(props) {
  const {
    pushMessageToSnackbar,
    onClose,
  } = props;

  const [loading, setLoading] = useState(false);


  const handleUpload = useCallback(() => {
    setLoading(true);
    setTimeout(() => {

      pushMessageToSnackbar({
        text: "Your phrase has been uploaded",
      });
      onClose();
    }, 1500);
  }, [setLoading, onClose, pushMessageToSnackbar]);

  return (
    <Fragment>
      <ActionPaper
        helpPadding
        maxWidth="md"
        content={
          <AddPostOptions
          />
        }
        actions={
          <Fragment>
            <Box mr={1}>
              <Button onClick={onClose} disabled={loading}>
                Back
              </Button>
            </Box>
            <Button
              onClick={handleUpload}
              variant="contained"
              color="secondary"
              disabled={loading}
            >
              Post {loading && <ButtonCircularProgress />}
            </Button>
          </Fragment>
        }
      />
    </Fragment>
  );
}

AddPost.propTypes = {
  pushMessageToSnackbar: PropTypes.func
};

export default AddPost;
