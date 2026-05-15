import HistoryWaterpumpServices from '../services/HistoryWaterpumpServices.js';

const createHistoryWaterpump = async (req, res) => {
  try {
    const result = await HistoryWaterpumpServices.createHistoryWaterpump(req.body);
    return res.status(201).json(result);
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi server: ' + e.message,
    });
  }
};

const updateHistoryWaterpump = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await HistoryWaterpumpServices.updateHistoryWaterpump(id, req.body);
    if (result.status === 'error') return res.status(400).json(result);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi server: ' + e.message,
    });
  }
};

const deleteHistoryWaterpump = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await HistoryWaterpumpServices.deleteHistoryWaterpump(id);
    if (result.status === 'error') return res.status(400).json(result);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi server: ' + e.message,
    });
  }
};

const deleteHistoryWaterpumpMany = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Danh sách ID không hợp lệ!',
      });
    }

    const result = await HistoryWaterpumpServices.deleteHistoryWaterpumpMany(ids);
    if (result.status === 'error') return res.status(400).json(result);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi server: ' + e.message,
    });
  }
};

const getAllHistoryWaterpump = async (req, res) => {
  try {
    const data = await HistoryWaterpumpServices.getAllHistoryWaterpump();
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

const getHistoryWaterpumpById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await HistoryWaterpumpServices.getHistoryWaterpumpById(id);
    if (!data) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy historywaterpump!',
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
  createHistoryWaterpump,
  updateHistoryWaterpump,
  deleteHistoryWaterpump,
  deleteHistoryWaterpumpMany,
  getAllHistoryWaterpump,
  getHistoryWaterpumpById,
};

