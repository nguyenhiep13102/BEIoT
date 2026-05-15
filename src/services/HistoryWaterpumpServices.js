import SensorData from '../models/historywaterpump.js';

const createHistoryWaterpump = async (data) => {
  try {
    const newDoc = new SensorData(data);
    const saved = await newDoc.save();
    return {
      status: 'success',
      message: 'Tạo historywaterpump thành công!',
      data: saved,
    };
  } catch (e) {
    throw e;
  }
};

const updateHistoryWaterpump = async (id, data) => {
  try {
    const doc = await SensorData.findById(id);
    if (!doc) {
      return { status: 'error', message: 'Không tìm thấy historywaterpump!' };
    }

    const updatableFields = ['humidity', 'pumpStatus', 'temperature', 'deviceId'];
    for (const field of updatableFields) {
      if (data[field] !== undefined) doc[field] = data[field];
    }

    const updated = await doc.save();
    return {
      status: 'success',
      message: 'Cập nhật historywaterpump thành công!',
      data: updated,
    };
  } catch (e) {
    throw e;
  }
};

const deleteHistoryWaterpump = async (id) => {
  try {
    const doc = await SensorData.findById(id);
    if (!doc) {
      return { status: 'error', message: 'Không tìm thấy historywaterpump để xoá!' };
    }
    await doc.deleteOne();
    return { status: 'success', message: 'Xoá historywaterpump thành công!' };
  } catch (e) {
    throw e;
  }
};

const deleteHistoryWaterpumpMany = async (ids) => {
  try {
    const result = await SensorData.deleteMany({ _id: { $in: ids } });
    if (!result || result.deletedCount === 0) {
      return { status: 'error', message: 'Không tìm thấy historywaterpump nào để xoá!' };
    }
    return {
      status: 'success',
      message: `Đã xoá ${result.deletedCount} historywaterpump thành công!`,
    };
  } catch (e) {
    throw e;
  }
};

const getAllHistoryWaterpump = async () => {
  try {
    return await SensorData.find();
  } catch (e) {
    throw e;
  }
};

const getHistoryWaterpumpById = async (id) => {
  try {
    return await SensorData.findById(id);
  } catch (e) {
    throw e;
  }
};

export default {
  createHistoryWaterpump,
  updateHistoryWaterpump,
  deleteHistoryWaterpump,
  deleteHistoryWaterpumpMany,
  getAllHistoryWaterpump,
  getHistoryWaterpumpById,
};

