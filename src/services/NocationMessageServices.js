import NocationMessage from '../models/nocationmessege.js';

const createNotification = async (
  item,
  type,
  content,
  description
) => {

  const ALERT_REPEAT_MINUTES = 1;

  const lastNotification =
    await NocationMessage.findOne({

      deviceId: item.IdStyemLocation,

      type

    })
      .sort({
        createdAt: -1
      });

  if (lastNotification) {

    const diffMinutes =
      (Date.now() -
        lastNotification.createdAt.getTime())
      / (1000 * 60);

    if (diffMinutes < ALERT_REPEAT_MINUTES) {
      return;
    }
  }

  await NocationMessage.create({

    IDusers: item.IDusers,

    deviceId: item.IdStyemLocation,

    type,

    content,

    description,

  });

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

const getNocationMessageById = async (userId) => {
  try {

    console.log('User ID:', userId);

    return await NocationMessage
      .find({
        IDusers: userId
      })
      
      .sort({
        createdAt: -1
      });

  } catch (e) {
    throw e;
  }
};

export default {
  createNotification,
  updateNocationMessage,
  deleteNocationMessage,
  deleteNocationMessageMany,
  getAllNocationMessage,
  getNocationMessageById,
};

