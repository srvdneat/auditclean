/*
  # Survey Responses Table Migration

  1. Changes
    - Safely create survey_responses table if it doesn't exist
    - Enable RLS
    - Add insert policy for public access
    
  2. Security
    - Row Level Security enabled
    - Public insert policy
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_name = 'survey_responses'
  ) THEN
    CREATE TABLE survey_responses (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      created_at timestamptz DEFAULT now(),
      first_name text NOT NULL,
      last_name text NOT NULL,
      email text NOT NULL,
      company_name text NOT NULL,
      industry text NOT NULL,
      responses jsonb NOT NULL,
      scores jsonb NOT NULL,
      total_score integer NOT NULL
    );
  END IF;
END $$;

-- Enable RLS if not already enabled
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable insert for all users" ON survey_responses;

-- Create insert policy
CREATE POLICY "Enable insert for all users" ON survey_responses
  FOR INSERT
  TO public
  WITH CHECK (true);