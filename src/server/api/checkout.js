import { catalogData } from './data/static';

export const checkoutAPI = (_, res) => {
  res.status(200).json({
    success: true,
    data: catalogData,
  })
}