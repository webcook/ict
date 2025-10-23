-- Create table for weather/air information
CREATE TABLE IF NOT EXISTS public.air_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  icao_code TEXT NOT NULL,
  airport_name TEXT,
  forecast_time TIMESTAMP WITH TIME ZONE NOT NULL,
  wind_direction TEXT,
  wind_speed NUMERIC,
  temperature NUMERIC,
  pressure NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX idx_air_info_icao_forecast ON public.air_info(icao_code, forecast_time DESC);

-- Enable Row Level Security
ALTER TABLE public.air_info ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (since this is public weather data)
CREATE POLICY "Air info is viewable by everyone" 
ON public.air_info 
FOR SELECT 
USING (true);

-- Create policy for service role to insert/update
CREATE POLICY "Service role can manage air info" 
ON public.air_info 
FOR ALL 
USING (auth.role() = 'service_role');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_air_info_updated_at
BEFORE UPDATE ON public.air_info
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();