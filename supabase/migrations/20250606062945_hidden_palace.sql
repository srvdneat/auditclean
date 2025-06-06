/*
  # Create survey responses table

  1. New Tables
    - `survey_responses`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `company_name` (text)
      - `industry` (text)
      - `responses` (jsonb)
      - `scores` (jsonb)
      - `total_score` (integer)

  2. Security
    - Enable RLS on `survey_responses` table
    - Add policy for inserting responses
*/

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

ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for all users" ON survey_responses
  FOR INSERT
  TO public
  WITH CHECK (true);