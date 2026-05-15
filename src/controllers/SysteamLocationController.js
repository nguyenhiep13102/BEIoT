import SysteamLocationServices from '../services/SysteamLocationServices.js';

const createSysteamLocation = async (req, res) => {
  try {
    const result = await SysteamLocationServices.createSysteamLocation(req.body);
    
    return res.status(201).json(result);
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi server: ' + e.message,
    });
  }
};

const updateSysteamLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SysteamLocationServices.updateSysteamLocation(id, req.body);
    if (result.status === 'error') return res.status(400).json(result);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi server: ' + e.message,
    });
  }
};

const deleteSysteamLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SysteamLocationServices.deleteSysteamLocation(id);
    if (result.status === 'error') return res.status(400).json(result);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi server: ' + e.message,
    });
  }
};

const deleteSysteamLocationMany = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Danh sách ID không hợp lệ!',
      });
    }

    const result = await SysteamLocationServices.deleteSysteamLocationMany(ids);
    if (result.status === 'error') return res.status(400).json(result);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi server: ' + e.message,
    });
  }
};

const getAllSysteamLocation = async (req, res) => {
  try {
    const data = await SysteamLocationServices.getAllSysteamLocation();
    return res.status(200).json({
      status: 'success',
      results: data.length,
      data,
    });
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi server: ' + e.message,
    });
  }
};

const getSysteamLocationById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await SysteamLocationServices.getSysteamLocationById(id);
    if (!data) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy SysteamLocation!',
      });
    }
    return res.status(200).json({
      status: 'success',
      data,
    });
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi server: ' + e.message,
    });
  }
};
const getSysteamLocationByIduser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await SysteamLocationServices.getSysteamLocationByIduser(id);
    if (!data) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy SysteamLocation!',
      });
    }
    return res.status(200).json({
      status: 'success',
      data,
    });
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi server: ' + e.message,
    });
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

