const regex = (req, res, next) => {
  try {
    const name = /^[a-zA-Z ]{2,30}$/;
    const gender = /^male$|^female$|^other$/;
    const dob = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    const userName = /^[a-zA-Z ]{2,30}$/;
    const email = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    const password =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (
      name.test(req.body.name) &&
      gender.test(req.body.gender) &&
      dob.test(req.body.dob) &&
      userName.test(req.body.userName) &&
      email.test(req.body.email) &&
      password.test(req.body.password) &&
      req.body.password === req.body.confirmPassword
    ) {
      next();
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = regex;
