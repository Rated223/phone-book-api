import Contact from './Contact';
import User from './User';

User.hasMany(Contact);
Contact.belongsTo(User);

export { Contact, User };
