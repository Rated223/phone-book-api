const manageErrors = (error, res) => {
  let message;
  if (process.env.ENV === 'DEV') {
    message = error.name.includes('Sequelize')
      ? `${error.errors[0].message}, ${error.errors[0].type}`
      : error;
    console.log('Error', error);
  } else {
    message = 'Internal server error.';
  }

  if (!res.headersSent) res.status(500).send({ success: false, message });
};

export default manageErrors;
