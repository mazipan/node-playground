import { catalogData, promotionRules } from './data/static';

export const catalogAPI = (_, res) => {
  res.status(200).json({
    success: true,
    data: {
      catalog: catalogData,
      promo: promotionRules
    },
  })
}