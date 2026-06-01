
function getAllConv(req, res) {
  const { id } = req.params;
  const logManager = req.app.locals.logManager;
  const logs = logManager.getAllByUser(id);
  res.json({ count: logs.length, conversations: logs });
}

module.exports = {
    getAllConv
};