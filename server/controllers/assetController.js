const assetService = require('../services/assetService');

exports.getAssets = async (req, res) => {
  try {
    let data = await assetService.getAllAssets();
    const { type, plant } = req.query;

    if (type && type !== 'ALL') {
      data = data.filter((m) => m.machineType === type || m.categoryName === type || m.assetType === type);
    }
    if (plant && plant !== 'ALL') {
      data = data.filter((m) => m.factoryName === plant || m.plant === plant);
    }

    res.status(200).json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAssetById = async (req, res) => {
  try {
    const data = await assetService.getAssetById(req.params.id);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getMachineTypes = async (req, res) => {
  try {
    const machineTypes = [
      'Air Jet Loom',
      'Water Jet Loom',
      'Rapier Loom',
      'Projectile Loom',
      'Shuttle Loom',
      'Circular Knitting Machine',
    ];
    res.status(200).json({ success: true, data: machineTypes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createAsset = async (req, res) => {
  try {
    const data = await assetService.createAsset(req.body);
    res.status(201).json({ success: true, message: 'Asset created in MySQL database', data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateAsset = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: `Asset ${req.params.id} updated`, data: req.body });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteAsset = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: `Asset ${req.params.id} deleted` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getDepartments = async (req, res) => {
  try {
    const data = await assetService.getDepartments();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createDepartment = async (req, res) => {
  try {
    res.status(201).json({ success: true, message: 'Department created', data: req.body });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const data = await assetService.getCategories();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    res.status(201).json({ success: true, message: 'Category created', data: req.body });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getPlants = async (req, res) => {
  try {
    const data = await assetService.getPlants();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
