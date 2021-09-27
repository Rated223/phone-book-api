import jwt from 'jsonwebtoken';
import { manageErrors } from '../helpers';
import { User } from '../../models';
import mailer from '../../mailer';

const newPasswordRequest = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ where: { email } });

    if (user === null) {
      res
        .status(400)
        .send({ success: false, message: 'This email does not exist.' });
      return;
    }

    const token = jwt.sign({ email }, process.env.CONN_KEY, {
      expiresIn: '12h',
      algorithm: process.env.CONN_ALGORITHM,
    });

    await mailer({
      to: email,
      subject: 'Change password request',
      text: `Enter this link to change your password: ${process.env.WEB_URL}reset-password?token=${token}`,
    });

    res.status(200).send({ success: true });
  } catch (error) {
    manageErrors(error, res);
  }
};

export default newPasswordRequest;
