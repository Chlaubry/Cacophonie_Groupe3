
function getAllConv(req, res) {
  const { idUser } = req.params;
  const logManager = req.app.locals.logManager;
  const logs = logManager.getAllByUser(idUser);
  res.json({ count: logs.length, conversations: logs });
}

module.exports = {
    getAllConv
};