import HistoryLine from '../models/historyline.js';

const createHistoryLine = async (data) => {
  try {
    const newDoc = new HistoryLine(data);
    const saved = await newDoc.save();
    return {
      status: 'success',
      message: 'Tạo HistoryLine thành công!',
      data: saved,
    };
  } catch (e) {
    throw e;
  }
};

const updateHistoryLine = async (id, data) => {
  try {
    const doc = await HistoryLine.findById(id);
    if (!doc) {
      return { status: 'error', message: 'Không tìm thấy HistoryLine!' };
    }

    const updatableFields = ['deviceId', 'cambienAnhSang', 'trangthaiDen'];
    for (const field of updatableFields) {
      if (data[field] !== undefined) doc[field] = data[field];
    }

    const updated = await doc.save();
    return {
      status: 'success',
      message: 'Cập nhật HistoryLine thành công!',
      data: updated,
    };
  } catch (e) {
    throw e;
  }
};

const deleteHistoryLine = async (id) => {
  try {
    const doc = await HistoryLine.findById(id);
    if (!doc) {
      return { status: 'error', message: 'Không tìm thấy HistoryLine để xoá!' };
    }
    await doc.deleteOne();
    return { status: 'success', message: 'Xoá HistoryLine thành công!' };
  } catch (e) {
    throw e;
  }
};

const deleteHistoryLineMany = async (ids) => {
  try {
    const result = await HistoryLine.deleteMany({ _id: { $in: ids } });
    if (!result || result.deletedCount === 0) {
      return { status: 'error', message: 'Không tìm thấy HistoryLine nào để xoá!' };
    }
    return {
      status: 'success',
      message: `Đã xoá ${result.deletedCount} HistoryLine thành công!`,
    };
  } catch (e) {
    throw e;
  }
};

const getAllHistoryLine = async () => {
  try {
    return await HistoryLine.find();
  } catch (e) {
    throw e;
  }
};

const getHistoryLineById = async (id) => {
  try {
    return await HistoryLine.findById(id);
  } catch (e) {
    throw e;
  }
};

export default {
  createHistoryLine,
  updateHistoryLine,
  deleteHistoryLine,
  deleteHistoryLineMany,
  getAllHistoryLine,
  getHistoryLineById,
};

