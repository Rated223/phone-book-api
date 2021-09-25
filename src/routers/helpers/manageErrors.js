const manageErrors = (error, res) => {
  let message;
  if (process.env.ENV === 'DEV') {
    console.log('Error', error);
    message = error;
  } else {
    message = 'Internal server error.';
  }

  if (!res.headersSent) res.status(500).send({ success: false, message });
};

export default manageErrors;
