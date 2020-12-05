
exports.index = (req, res) => {
    res.render('index');
}

exports.roles = async (req, res) => {
    try {
      const { role } = req.body;
      const allowedRoles = ['user', 'admin'];
  
      if (!allowedRoles.includes(role)) {
        return res
          .status(400)
          .json({ message: 'Role not allowed' });
      }
      await User.findOneAndUpdate(
        { _id: req.user.sub },
        { role }
      );
      res.json({
        message:
          'User role updated. You must log in again for the changes to take effect.'
      });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
}
  
