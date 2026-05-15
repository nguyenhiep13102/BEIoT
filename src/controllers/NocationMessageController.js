import NocationMessageServices from '../services/NocationMessageServices.js';

const createNocationMessage = async (req, res) => {
  try {
    const result = await NocationMessageServices.createNocationMessage(req.body);
    return res.status(201).json(result);
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi server: ' + e.message,
    });
  }
};

const updateNocationMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await NocationMessageServices.updateNocationMessage(id, req.body);
    if (result.status === 'error') return res.status(400).json(result);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi server: ' + e.message,
    });
  }
};

const deleteNocationMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await NocationMessageServices.deleteNocationMessage(id);
    if (result.status === 'error') return res.status(400).json(result);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi server: ' + e.message,
    });
  }
};

const deleteNocationMessageMany = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Danh sách ID không hợp lệ!',
      });
    }

    const result = await NocationMessageServices.deleteNocationMessageMany(ids);
    if (result.status === 'error') return res.status(400).json(result);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi server: ' + e.message,
    });
  }
};

const getAllNocationMessage = async (req, res) => {
  try {
    const data = await NocationMessageServices.getAllNocationMessage();
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

const getNocationMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await NocationMessageServices.getNocationMessageById(id);
    if (!data) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy NocationMessage!',
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
  createNocationMessage,
  updateNocationMessage,
  deleteNocationMessage,
  deleteNocationMessageMany,
  getAllNocationMessage,
  getNocationMessageById,
};

