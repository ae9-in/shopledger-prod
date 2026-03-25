-- 003: Add settings and preferences to shops
ALTER TABLE public.shops 
ADD COLUMN IF NOT EXISTS currency VARCHAR(10) DEFAULT '₹',
ADD COLUMN IF NOT EXISTS date_format VARCHAR(20) DEFAULT 'DD/MM/YYYY';

-- Soft delete column for major tables in tenant schema will be handled in a separate tenant migration if needed.
-- For now, let's keep it simple as the user mentioned "needs DB changes first" for Recycle Bin.
