import SysteamLocation from '../models/systeamLocation.js';

const createSysteamLocation = async (data) => {
  try {
    const newDoc = new SysteamLocation(data);
    const saved = await newDoc.save();
    return {
      status: 'success',
      message: 'Tạo SysteamLocation thành công!',
      data: saved,
    };
  } catch (e) {
    throw e;
  }
};

const updateSysteamLocation = async (id, data) => {
  try {
    const doc = await SysteamLocation.findById(id);
    if (!doc) {
      return { status: 'error', message: 'Không tìm thấy SysteamLocation!' };
    }

    const updatableFields = ['IDusers', 'namecty', 'district', 'address'];
    for (const field of updatableFields) {
      if (data[field] !== undefined) doc[field] = data[field];
    }

    const updated = await doc.save();
    return {
      status: 'success',
      message: 'Cập nhật SysteamLocation thành công!',
      data: updated,
    };
  } catch (e) {
    throw e;
  }
};

const deleteSysteamLocation = async (id) => {
  try {
    const doc = await SysteamLocation.findById(id);
    if (!doc) {
      return { status: 'error', message: 'Không tìm thấy SysteamLocation để xoá!' };
    }
    await doc.deleteOne();
    return { status: 'success', message: 'Xoá SysteamLocation thành công!' };
  } catch (e) {
    throw e;
  }
};

const deleteSysteamLocationMany = async (ids) => {
  try {
    const result = await SysteamLocation.deleteMany({ _id: { $in: ids } });
    if (!result || result.deletedCount === 0) {
      return { status: 'error', message: 'Không tìm thấy SysteamLocation nào để xoá!' };
    }
    return {
      status: 'success',
      message: `Đã xoá ${result.deletedCount} SysteamLocation thành công!`,
    };
  } catch (e) {
    throw e;
  }
};

const getAllSysteamLocation = async () => {
  try {
    return await SysteamLocation.find().populate({
      path: 'IDusers',
      select: 'name'
    });
  } catch (e) {
    throw e;
  }
};

const getSysteamLocationById = async (id) => {
  try {
    return await SysteamLocation.findById(id).populate({
      path: 'IDusers',
      select: 'name'
    });
  } catch (e) {
    throw e;
  }
};

const getSysteamLocationByIduser = async (id) => {
  try {
   
    const systemLocations = await SysteamLocation.find({
      IDusers: id,
    });

    if (!systemLocations || systemLocations.length === 0) {
      return {
        status: "error",
        message: "Không tìm thấy dữ liệu!",
      };
    }

    return {
      status: "success",
      message: "Lấy dữ liệu thành công!",
      data: systemLocations,
    };
  } catch (e) {
    throw e;
  }
};
export default {
  createSysteamLocation,
  updateSysteamLocation,
  deleteSysteamLocation,
  deleteSysteamLocationMany,
  getAllSysteamLocation,
  getSysteamLocationById,
  getSysteamLocationByIduser,
};

