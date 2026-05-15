import HistoryLineServices from '../services/HistoryLineServices.js';

const createHistoryLine = async (req, res) => {
  try {
    const result = await HistoryLineServices.createHistoryLine(req.body);
    return res.status(201).json(result);
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi server: ' + e.message,
    });
  }
};

const updateHistoryLine = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await HistoryLineServices.updateHistoryLine(id, req.body);
    if (result.status === 'error') return res.status(400).json(result);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi server: ' + e.message,
    });
  }
};

const deleteHistoryLine = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await HistoryLineServices.deleteHistoryLine(id);
    if (result.status === 'error') return res.status(400).json(result);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi server: ' + e.message,
    });
  }
};

const deleteHistoryLineMany = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Danh sách ID không hợp lệ!',
      });
    }

    const result = await HistoryLineServices.deleteHistoryLineMany(ids);
    if (result.status === 'error') return res.status(400).json(result);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi server: ' + e.message,
    });
  }
};

const getAllHistoryLine = async (req, res) => {
  try {
    const data = await HistoryLineServices.getAllHistoryLine();
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

const getHistoryLineById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await HistoryLineServices.getHistoryLineById(id);
    if (!data) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy HistoryLine!',
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
  createHistoryLine,
  updateHistoryLine,
  deleteHistoryLine,
  deleteHistoryLineMany,
  getAllHistoryLine,
  getHistoryLineById,
};

