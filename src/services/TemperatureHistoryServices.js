import TemperatureHistory from '../models/temperaturehistory.js';

const createTemperatureHistory = async (data) => {
  try {
    const newDoc = new TemperatureHistory(data);
    const saved = await newDoc.save();
    return {
      status: 'success',
      message: 'Tạo TemperatureHistory thành công!',
      data: saved,
    };
  } catch (e) {
    throw e;
  }
};

const updateTemperatureHistory = async (id, data) => {
  try {
    const doc = await TemperatureHistory.findById(id);
    if (!doc) {
      return { status: 'error', message: 'Không tìm thấy TemperatureHistory!' };
    }

    const updatableFields = ['deviceId', 'cambienNhietdo'];
    for (const field of updatableFields) {
      if (data[field] !== undefined) doc[field] = data[field];
    }

    const updated = await doc.save();
    return {
      status: 'success',
      message: 'Cập nhật TemperatureHistory thành công!',
      data: updated,
    };
  } catch (e) {
    throw e;
  }
};

const deleteTemperatureHistory = async (id) => {
  try {
    const doc = await TemperatureHistory.findById(id);
    if (!doc) {
      return { status: 'error', message: 'Không tìm thấy TemperatureHistory để xoá!' };
    }
    await doc.deleteOne();
    return { status: 'success', message: 'Xoá TemperatureHistory thành công!' };
  } catch (e) {
    throw e;
  }
};

const deleteTemperatureHistoryMany = async (ids) => {
  try {
    const result = await TemperatureHistory.deleteMany({ _id: { $in: ids } });
    if (!result || result.deletedCount === 0) {
      return {
        status: 'error',
        message: 'Không tìm thấy TemperatureHistory nào để xoá!',
      };
    }
    return {
      status: 'success',
      message: `Đã xoá ${result.deletedCount} TemperatureHistory thành công!`,
    };
  } catch (e) {
    throw e;
  }
};

const getAllTemperatureHistory = async () => {
  try {
    return await TemperatureHistory.find();
  } catch (e) {
    throw e;
  }
};

const getTemperatureHistoryById = async (id) => {
  try {
    return await TemperatureHistory.findById(id);
  } catch (e) {
    throw e;
  }
};

export default {
  createTemperatureHistory,
  updateTemperatureHistory,
  deleteTemperatureHistory,
  deleteTemperatureHistoryMany,
  getAllTemperatureHistory,
  getTemperatureHistoryById,
};

