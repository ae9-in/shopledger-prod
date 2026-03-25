import { shopsService } from './shops.service.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { ok } from '../../utils/apiResponse.js';

export const getProfile = asyncHandler(async (req, res) => {
  const profile = await shopsService.getProfile(req.shop.id);
  ok(res, profile);
});

export const updateProfile = asyncHandler(async (req, res) => {
  const updated = await shopsService.updateProfile(req.shop.id, req.body);
  ok(res, updated);
});

export const getSessions = asyncHandler(async (req, res) => {
  const sessions = await shopsService.getSessions(req.shop.id);
  ok(res, sessions);
});

export const revokeSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;
  const result = await shopsService.revokeSession(req.shop.id, sessionId);
  ok(res, { message: result.message });
});

export const deleteShop = asyncHandler(async (req, res) => {
  const { confirmName } = req.body;
  const result = await shopsService.deleteShop(req.shop.id, confirmName);
  ok(res, { message: result.message });
});
