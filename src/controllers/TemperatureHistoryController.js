import TemperatureHistoryServices from '../services/TemperatureHistoryServices.js';

const createTemperatureHistory = async (req, res) => {
  try {
    const result = await TemperatureHistoryServices.createTemperatureHistory(req.body);
    return res.status(201).json(result);
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi server: ' + e.message,
    });
  }
};

const updateTemperatureHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await TemperatureHistoryServices.updateTemperatureHistory(id, req.body);
    if (result.status === 'error') return res.status(400).json(result);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi server: ' + e.message,
    });
  }
};

const deleteTemperatureHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await TemperatureHistoryServices.deleteTemperatureHistory(id);
    if (result.status === 'error') return res.status(400).json(result);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi server: ' + e.message,
    });
  }
};

const deleteTemperatureHistoryMany = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Danh sách ID không hợp lệ!',
      });
    }

    const result = await TemperatureHistoryServices.deleteTemperatureHistoryMany(ids);
    if (result.status === 'error') return res.status(400).json(result);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi server: ' + e.message,
    });
  }
};

const getAllTemperatureHistory = async (req, res) => {
  try {
    const data = await TemperatureHistoryServices.getAllTemperatureHistory();
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

const getTemperatureHistoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await TemperatureHistoryServices.getTemperatureHistoryById(id);
    if (!data) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy TemperatureHistory!',
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
  createTemperatureHistory,
  updateTemperatureHistory,
  deleteTemperatureHistory,
  deleteTemperatureHistoryMany,
  getAllTemperatureHistory,
  getTemperatureHistoryById,
};

