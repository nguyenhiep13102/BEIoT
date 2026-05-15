import CareplantServices from '../services/CareplantServices.js';

const createCareplant = async (req, res) => {
  try {
    const result = await CareplantServices.createCareplant(req.body);
    return res.status(201).json(result);
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi server: ' + e.message,
    });
  }
};

const updateCareplant = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await CareplantServices.updateCareplant(id, req.body);
    if (result.status === 'error') return res.status(400).json(result);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi server: ' + e.message,
    });
  }
};
const controllerWaterpump  = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;



    const result = await CareplantServices.controllerWaterpump(data);
    if (result.status === 'error') return res.status(400).json(result);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi server: 1' + e.message,
    });
  }
}

const deleteCareplant = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await CareplantServices.deleteCareplant(id);
    if (result.status === 'error') return res.status(400).json(result);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi server: ' + e.message,
    });
  }
};

const deleteCareplantMany = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Danh sách ID không hợp lệ!',
      });
    }

    const result = await CareplantServices.deleteCareplantMany(ids);
    if (result.status === 'error') return res.status(400).json(result);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi server: ' + e.message,
    });
  }
};

const getAllCareplant = async (req, res) => {
  try {
    const data = await CareplantServices.getAllCareplant();
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

const getCareplantById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await CareplantServices.getCareplantById(id);
    if (!data) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy Careplant!',
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
  createCareplant,
  updateCareplant,
  deleteCareplant,
  deleteCareplantMany,
  getAllCareplant,
  getCareplantById,
  controllerWaterpump,
};

