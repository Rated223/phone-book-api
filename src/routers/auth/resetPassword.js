import jwt from 'jsonwebtoken';
import { manageErrors } from '../helpers';
import { User } from '../../models';

const resetPassword = async (req, res) => {
  const { password, token } = req.body;

  try {
    const decriptedToken = jwt.decode(token, process.env.CONN_KEY, {
      algorithms: [process.env.CONN_ALGORITHM],
    });

    if (!decriptedToken?.email) {
      res.status(400).send({ success: false, message: 'Invalid token.' });
      return;
    }
    const user = await User.findOne({ where: { email: decriptedToken.email } });

    if (user === null) {
      res.status(400).send({ success: false, message: 'Invalid token.' });
      return;
    }

    user.password = password;
    user.save();

    res.status(200).send({
      success: true,
      data: {
        user: { ...user.get(), password: undefined },
      },
    });
  } catch (error) {
    manageErrors(error, res);
  }
};

export default resetPassword;
