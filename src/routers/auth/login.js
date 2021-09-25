import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { manageErrors } from '../helpers';
import { User } from '../../models';

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        [Op.or]: {
          username,
          email: username,
        },
      },
    });

    if (user === null || !bcrypt.compareSync(password, user.password)) {
      res
        .status(400)
        .send({ success: false, message: 'Invalid username or password.' });
      return;
    }

    const secretKey = process.env.CONN_KEY || 'secret',
      algorithm = process.env.CONN_ALGORITHM || 'RS256';

    const token = jwt.sign({ userId: user.id }, secretKey, {
      algorithm,
      expiresIn: '7d',
    });

    res.status(200).send({
      success: true,
      data: {
        user: { ...user.get(), password: undefined },
        token,
      },
    });
  } catch (error) {
    manageErrors(error, res);
  }
};

export default login;
