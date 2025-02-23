const PortfolioUser = require("../model/portfolioModel");

const handleGetProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await PortfolioUser.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = { handleGetProfile };
