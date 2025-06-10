const authenticateUser = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decode_token = jwt.verify(token, process.env.SECRET);
    req.body.userId = decode_token.id;

    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default authenticateUser;
