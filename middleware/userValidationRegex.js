const regex = (req, res, next) => {
  try {
    const name = /^[a-zA-Z ]{2,30}$/;
    const gender = /^male$|^female$|^other$/;
    const dob = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    const userName = /^[a-zA-Z ]{2,30}$/;
    const email = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

    if (!name.test(req.body.name)) {
      return res.json({ msg: "Write name in correct format" });
    }

    if (!gender.test(req.body.gender)) {
      return res.json({ msg: "Write gender in correct format" });
    }

    if (!dob.test(req.body.dob)) {
      return res.json({ msg: "Write dob in correct format" });
    }
    if (!userName.test(req.body.userName)) {
      return res.json({ msg: "Write username  in correct format" });
    }
    if (!email.test(req.body.email)) {
      return res.json({ msg: "Write email in correct format" });
    }
    if (!password.test(req.body.password)) {
      return res.json({ msg: "Write password in correct format" });
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.json({ msg: "Password doesn't match" });
    }
    next();
  } catch (error) {
    return res.json(error);
  }
};

module.exports = regex;
