const { User, Address } = require("../lib/sequelize");
const { Op } = require("sequelize");

const addressController = {
  // -------------------- Get Address-------------------- //
  getAddressUser: async (req, res) => {
    try {
      const { id } = req.params;

      const findAddress = await Address.findAll({
        include: [ User ],
        // order: [["default_address", "DESC"]],
        where: {
          [Op.and]: [
            {id_user: id}, {is_deleted: {[Op.notIn]:['yes']}}
          ]
        },
      });

      return res.status(200).json({
        message: "fetching data",
        result: findAddress,
      });
    } catch (err) {
      console.log(err);

      res.status(400).json({
        message: err.toString(),
      });
    }
  },

  // -------------------- Get Address-------------------- //
  getAddressId: async (req, res) => {
    try {
      const { id } = req.params;

      const findAddress = await Address.findAll({
        include: [ User ],
        // order: [["default_address", "DESC"]],
        where: {
          id: id,
        },
      });

      return res.status(200).json({
        message: "fetching data",
        result: findAddress,
      });
    } catch (err) {
      console.log(err);

      res.status(400).json({
        message: err.toString(),
      });
    }
  },


  // -------------------- Add Address -------------------- //
  addAddress: async (req, res) => {
    try {
      const { idUser } = req.params;
      const { receiver_name, receiver_phone, address, province, province_id, city_name,city_id, type,districts, postal_code, id_user } = req.body;
      
      const findUserAddress = await Address.findAll({
        include: [ User ],
        where: {
          [Op.and]: [
            {id_user: idUser}, {is_deleted: {[Op.notIn]:['yes']}}
          ]
        },
      });

      // if (findUserAddress.User.default_address == false && findUserAddress.length == 1) {
      //   throw new Error("Maaf anda harus verifikasi terlebih dahulu untuk memiliki lebih dari 1 alamat");
      // }

      if (findUserAddress.length >= 3) {
        throw new Error("Maaf anda tidak bisa menambah alamat lebih dari 3");
      } 

      const newAddress = await Address.create({
        receiver_name,receiver_phone, address, province, province_id, city_name,city_id,districts, type, postal_code, id_user
      });

      return res.status(201).json({
        message: "Berhasil menambah alamat baru",
        result: newAddress
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.toString(),
      });
    }
  },

  // -------------------- Edit Address -------------------- //
  editAddress: async (req, res) => {
    try {
      const { id } = req.params;

      await Address.update(
        {
          ...req.body,
        },
        {
          where: {
            id,
          },
        }
      );

      return res.status(200).json({
        message: "Berhasil merubah data alamat",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  },

  // -------------------- deleteAddress Address -------------------- //
  deleteAddress: async (req, res) => {
    try {
      const { idAddress, idUser } = req.params;

      const findUser = await User.findOne({
        where: { id: idUser },
      });

      if(findUser.default_address == idAddress) {
      await User.update(
        {
          default_address: 0,
        },
        {
          where: { id: idUser }
        }
      );
      } 

      await Address.update(
        {
          is_deleted: 'yes',
        },
        {
          where: {
           id: idAddress,
          },
        }
      );

      

      return res.status(200).json({
        message: "Berhasil menghapus data alamat",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  },

  // -------------------- Delete Address -------------------- //
//   deleteAddress: async (req, res) => {
//     try {
//       const { id } = req.params;

//       await Address.destroy({
//         where: { id },
//       });

//       return res.status(200).json({
//         message: "Berhasil menghapus data alamat",
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({
//         message: err.toString(),
//       });
//     }
//   },
};

module.exports = addressController;
