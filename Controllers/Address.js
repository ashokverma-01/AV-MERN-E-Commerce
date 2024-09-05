const Address = require("../Models/Address.js");

exports.addAddress = async (req, res) => {
    try {
        const { fullName, address, city, state, country, phone, pinCode } = req.body;
        const userId = req.user; // Assuming req.user contains the user object with an id

        // Create the address object
        const addressData = await Address.create({
            userId,
            fullName,
            address,
            city,
            state,
            country,
            phone,
            pinCode
        });

        res.status(201).json({ message: "Address Add Successfully",addressData,success:true });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

exports.getAddress = async (req, res) => {
    try {

      const address = await Address.findOne({userId:req.user}).sort({timeTemps:-1});
      if (!address) {
        return res.status(404).json({ message: 'Address not found',userAddress:address[0] });
      }
      res.status(200).json(address);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
