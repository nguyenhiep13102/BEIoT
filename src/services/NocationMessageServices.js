import NocationMessage from '../models/nocationmessege.js';

const createNocationMessage = async (data) => {
  try {
    const newDoc = new NocationMessage(data);
    const saved = await newDoc.save();
    return {
      status: 'success',
      message: 'Tạo NocationMessage thành công!',
      data: saved,
    };
  } catch (e) {
    throw e;
  }
};

const updateNocationMessage = async (id, data) => {
  try {
    const doc = await NocationMessage.findById(id);
    if (!doc) {
      return { status: 'error', message: 'Không tìm thấy NocationMessage!' };
    }

    const updatableFields = ['IDusers', 'readBy', 'content', 'description'];
    for (const field of updatableFields) {
      if (data[field] !== undefined) doc[field] = data[field];
    }

    const updated = await doc.save();
    return {
      status: 'success',
      message: 'Cập nhật NocationMessage thành công!',
      data: updated,
    };
  } catch (e) {
    throw e;
  }
};

const deleteNocationMessage = async (id) => {
  try {
    const doc = await NocationMessage.findById(id);
    if (!doc) {
      return { status: 'error', message: 'Không tìm thấy NocationMessage để xoá!' };
    }
    await doc.deleteOne();
    return { status: 'success', message: 'Xoá NocationMessage thành công!' };
  } catch (e) {
    throw e;
  }
};

const deleteNocationMessageMany = async (ids) => {
  try {
    const result = await NocationMessage.deleteMany({ _id: { $in: ids } });
    if (!result || result.deletedCount === 0) {
      return { status: 'error', message: 'Không tìm thấy NocationMessage nào để xoá!' };
    }
    return {
      status: 'success',
      message: `Đã xoá ${result.deletedCount} NocationMessage thành công!`,
    };
  } catch (e) {
    throw e;
  }
};

const getAllNocationMessage = async () => {
  try {
    return await NocationMessage.find().populate('IDusers').populate('readBy');
  } catch (e) {
    throw e;
  }
};

const getNocationMessageById = async (id) => {
  try {
    return await NocationMessage.findById(id).populate('IDusers').populate('readBy');
  } catch (e) {
    throw e;
  }
};

export default {
  createNocationMessage,
  updateNocationMessage,
  deleteNocationMessage,
  deleteNocationMessageMany,
  getAllNocationMessage,
  getNocationMessageById,
};

