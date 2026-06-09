import Careplant from '../models/Careplant.js';
import sendFanCommand from '../config/mqttController.js';
const createCareplant = async (careplantData) => {
  try {
    const newCareplant = new Careplant(careplantData);
    const savedCareplant = await newCareplant.save();

    return {
      status: 'success',
      message: 'Tạo Careplant thành công!',
      data: savedCareplant,
    };
  } catch (e) {
    throw e;
  }
};

const updateCareplant = async (id, data) => {
  try {
    // tìm theo IdStyemLocation
    const careplant = await Careplant.findOne({
      IdStyemLocation: id,
    });

    if (!careplant) {
      return {
        status: "error",
        message: "Không tìm thấy Careplant!",
      };
    }

    const updatableFields = [
      
      "IDmaybom",
      "loaimaybom",
      "trangthaiMaybom",
      "tocdoMaybom",
      "IDden",
      "loaiden",
      "trangthaiDen",
      "cuongdoDen",
      "cambienNhietdo",
      "cambienDoam_Mat_Dat",
      "cambienAnhSang",
      "cambienDoam_Khong_Khi",
      "chedoTuDong",
      "gioBatMaybom",
      "gioTatMaybom",
      "gioBatDen",
      "gioTatDen",
    ];

    for (const field of updatableFields) {
      if (data[field] !== undefined) {
        careplant[field] = data[field];
      }
    }

    const updatedCareplant = await careplant.save();

    return {
      status: "success",
      message: "Cập nhật Careplant thành công!",
      data: updatedCareplant,
    };
  } catch (e) {
    throw e;
  }
};

const deleteCareplant = async (id) => {
  try {
    const careplant = await Careplant.findById(id);
    if (!careplant) {
      return {
        status: 'error',
        message: 'Không tìm thấy Careplant để xoá!',
      };
    }

    await careplant.deleteOne();
    return {
      status: 'success',
      message: 'Xoá Careplant thành công!',
    };
  } catch (e) {
    throw e;
  }
};

const deleteCareplantMany = async (ids) => {
  try {
    const result = await Careplant.deleteMany({ _id: { $in: ids } });
    if (!result || result.deletedCount === 0) {
      return {
        status: 'error',
        message: 'Không tìm thấy Careplant nào để xoá!',
      };
    }

    return {
      status: 'success',
      message: `Đã xoá ${result.deletedCount} Careplant thành công!`,
    };
  } catch (e) {
    throw e;
  }
};

const getAllCareplant = async () => {
  try {
    return await Careplant.find().populate('IDusers');
  } catch (e) {
    throw e;
  }
};

const getCareplantById = async (id) => {
  try {
    const data = await Careplant.find({
      IdStyemLocation: id,
    });

    return data;
  } catch (e) {
    throw e;
  }
};

const controllerWaterpump = async (data) => {
  try {
    
    const controllerData = {
      IdStyemLocation: data.IdStyemLocation,
      trangthaiMaybom: data.trangthaiMaybom,
      tocdoMaybom: data.tocdoMaybom,
      trangthaiDen: data.trangthaiDen,
      cuongdoDen: data.cuongdoDen,
    };

    console.log("🚀 Sending command:", controllerData);

    
    sendFanCommand.sendFanCommand(controllerData);

    return {
      status: "success",
      message: "Đã gửi lệnh điều khiển xuống thiết bị!",
      data: controllerData,
    };
  } catch (e) {
    throw e;
  }
};


export default {
  createCareplant,
  updateCareplant,
  deleteCareplant,
  deleteCareplantMany,
  getAllCareplant,
  getCareplantById,
  controllerWaterpump,
  
};

