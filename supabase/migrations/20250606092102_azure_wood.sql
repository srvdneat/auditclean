/*
  # Add company_size column to survey_responses table

  1. Changes
    - Add company_size column with default value to handle existing rows
    - Update existing rows with a default value
    - Remove default constraint to match expected schema
    
  2. Notes
    - Uses default value temporarily to avoid null constraint violation
    - Existing rows will get 'unknown' as company_size value
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'survey_responses' AND column_name = 'company_size'
  ) THEN
    -- Add column with default value to handle existing rows
    ALTER TABLE survey_responses ADD COLUMN company_size text NOT NULL DEFAULT 'unknown';
    
    -- Remove the default constraint since we want it to be required for new inserts
    ALTER TABLE survey_responses ALTER COLUMN company_size DROP DEFAULT;
  END IF;
END $$;