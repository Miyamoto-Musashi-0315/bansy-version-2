import { Router } from 'express';

const router = Router();

/**
 * GET /api/image
 * Returns JSON containing an imageUrl and metadata.acquisitionDate
 * If ?date=YYYY-MM-DD is provided, that date is echoed back; otherwise a default date is returned.
 */
router.get('/image', (req, res) => {
  const { date } = req.query as { date?: string };

  const acquisitionDate = date && typeof date === 'string' && date.trim() !== ''
    ? date
    : '2024-01-01';

  res.json({
    imageUrl: 'https://via.placeholder.com/500',
    metadata: {
      acquisitionDate,
    },
  });
});

export default router; 