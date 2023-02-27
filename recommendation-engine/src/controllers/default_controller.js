const { getRecommendation } = require('../services/default_service');

const defaultController = () => {
  const saveRecommendation = async (req, res) => {
    const { body } = req;
    const { user_id, group_contents } = body;
    try {
      const results = await getRecommendation(user_id, group_contents);
      return res.status(200).json({results});
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: 'error', data: error });
    }
  };

  return {
    saveRecommendation,
  };
};

module.exports = defaultController;
