import { manageErrors } from '../helpers';
import { User } from '../../models';

const signup = async (req, res) => {
  try {
    const userData = req.body;
    const user = await User.create(userData);

    res.status(202).send({
      success: true,
      data: {
        user: { ...user.get(), password: undefined },
      },
    });
  } catch (error) {
    manageErrors(error, res);
  }
};

export default signup;
