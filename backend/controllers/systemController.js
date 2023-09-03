
const { ROLES, UNITS } = require("../utils/constants");

exports.getAllVariables = async (req, res) => {
    try {
        var variables = {
            ROLES: ROLES,
            UNITS: UNITS,
        }

        res.status(200).json({ success: true, variables });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}