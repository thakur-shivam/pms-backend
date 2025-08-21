import { apiError, apiResponse, asyncHandler, generateUniqueId } from "../utils/index.js";
import model from "../models/reportsModel.js";

const getAllReports = asyncHandler(async (req, res) => {
  const result = await model.getAllReports();

  return res
    .status(200)
    .json(
      new apiResponse(200, result, `All report details fetched successfully`)
    );
});

const getReportById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await model.getReportById(id);
  if (!result) {
    return res
      .status(404)
      .json(new apiError(404, `Report with id: ${id} does not exist!`));
  }

  return res
    .status(200)
    .json(new apiResponse(200, result, `Report details fetched successfully`));
});

const createReport = asyncHandler(async (req, res) => {
  const { project_id, generated_by, report_type, data } = req.body;
  if (!project_id || !generated_by || !report_type || !data) {
    return res.status(400).json(new apiError(400, `All fields are required!`));
  }
  const id = await generateUniqueId();
  const result = await model.createReport(
    id,
    project_id,
    generated_by,
    report_type,
    data
  );

  return res
    .status(201)
    .json(new apiResponse(201, result, `Report created successfully`));
});

const updateReport = asyncHandler(async (req, access, res) => {
  const { id } = req.params;
  const { project_id, generated_by, report_type, data } = req.body;
  const result = await model.updateReport(
    id,
    project_id,
    generated_by,
    report_type,
    data
  );
  if (!result) {
    return res
      .status(404)
      .json(new apiError(404, `Report with id: ${id} does not exist!`));
  }

  return res
    .status(200)
    .json(new apiResponse(200, result, `Report updated successfully`));
});

const deleteReport = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await model.deleteReport(id);
  if (!result) {
    return res
      .status(404)
      .json(new apiError(404, `Report with id: ${id} does not exist!`));
  }

  return res
    .status(200)
    .json(new apiResponse(200, result, `Report deleted successfully`));
});

const getAggregatedReport = asyncHandler(async (req, res) => {
  const result = await model.getAggregateReport();

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        result,
        `Aggregate report details fetched successfully`
      )
    );
});

export {
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
  getAggregatedReport,
};
