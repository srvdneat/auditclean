/*
  # Add company_size column to survey_responses table

  1. Changes
    - Add `company_size` column to `survey_responses` table
    - Column type: text (to store company size values like "1-10", "11-50", etc.)
    - Column is required (NOT NULL) to match the application logic

  2. Notes
    - This resolves the error where the application tries to insert company_size data
    - The column is added as NOT NULL since the application expects this field to be provided
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'survey_responses' AND column_name = 'company_size'
  ) THEN
    ALTER TABLE survey_responses ADD COLUMN company_size text NOT NULL;
  END IF;
END $$;