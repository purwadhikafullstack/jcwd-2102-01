const { User, Address } = require("../lib/sequelize");

const addressController = {

  // -------------------- Get Address-------------------- //
  getAddressUser: async (req, res) => {
    try {
      const { id } = req.params;

      const findAddress = await Address.findAll({
        include: [ User ],
        order: [["default_address", "DESC"]],
        where: {
          id_user: id,
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
      const { id } = req.params;
      const { address, province, province_id, city_name,city_id, type, postal_code, default_address, id_user } = req.body;
      
      const findUserAddress = await Address.findAll({
        where: {
          id_user: id,
        },
      });

      if (findUserAddress.length.result > 3) {
        throw new Error("Maaf anda tidak bisa menambah alamat lebih dari 3");
      }

      const newAddress = await Address.create({
        address, province, province_id, city_name,city_id, type, postal_code, default_address, id_user
      });
      return res.status(201).json({
        message: "Berhasil menambah alamat baru",
        result: newAddress,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.toString(),
      });
    }
  },
  // // -------------------- Add Address -------------------- //
  // addAddress: async (req, res) => {
  //   try {
  //     const { address, province, province_id, city_name,city_id, type, postal_code, default_address, id_user } = req.body;

  //     const newAddress = await Address.create({
  //       address, province, province_id, city_name,city_id, type, postal_code, default_address, id_user
  //     });
  //     return res.status(201).json({
  //       message: "Berhasil menambah alamat baru",
  //       result: newAddress,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(500).json({
  //       message: err.toString(),
  //     });
  //   }
  // },

  // -------------------- Edit Address -------------------- //
  editAddress: async (req, res) => {
    try {
      const { id } = req.params;

      // const findPost = await Post.findOne({
      //   where: {
      //     id,
      //   },
      // });

      // if (!findPost) {
      //   throw new Error("Post doesn't exist");
      // }

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

  // -------------------- Delete Comment -------------------- //
  deleteAddress: async (req, res) => {
    try {
      const { id } = req.params;

      await Address.destroy({
        where: { id },
      });

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
};

module.exports = addressController;
