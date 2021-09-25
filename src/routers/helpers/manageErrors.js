const manageErrors = (error, res) => {
  console.log('Error', error);
  const message = process.env.ENV === 'DEV' ? error : 'Internal server error.';
  res.status(500).send({ success: false, message });
};

export default manageErrors;
