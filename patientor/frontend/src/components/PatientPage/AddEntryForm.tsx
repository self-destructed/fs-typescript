import { useState } from "react";
import { Box, Button, TextField, Typography, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { HealthCheckRating, type EntryWithoutId, type HealthCheckRating as HealthCheckRatingType } from "../../types";

interface Props {
  onSubmit: (values: EntryWithoutId) => Promise<void>;
  error: string | null;
}

const ratingLabels: Record<number, string> = {
  [HealthCheckRating.Healthy]: "Healthy",
  [HealthCheckRating.LowRisk]: "Low risk",
  [HealthCheckRating.HighRisk]: "High risk",
  [HealthCheckRating.CriticalRisk]: "Critical risk",
};

const AddEntryForm = ({ onSubmit, error }: Props) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<number>(HealthCheckRating.Healthy);

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const entry = {
      type: "HealthCheck" as const,
      date,
      description,
      specialist,
      diagnosisCodes: diagnosisCodes
        ? diagnosisCodes.split(",").map(c => c.trim())
        : undefined,
      healthCheckRating: healthCheckRating as HealthCheckRatingType,
    };

    try {
      await onSubmit(entry);
    } catch {
      return;
    }
    setDate("");
    setDescription("");
    setSpecialist("");
    setDiagnosisCodes("");
    setHealthCheckRating(HealthCheckRating.Healthy);
  };

  return (
    <Box sx={{ border: 2, borderRadius: 1, borderColor: "primary.main", padding: 2, marginTop: 2 }}>
      <Typography variant="h6">New Health Check entry</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box component="form" onSubmit={submit} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          label="Description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          fullWidth
        />
        <TextField
          label="Specialist"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          fullWidth
        />
        <TextField
          label="Diagnosis codes"
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
          placeholder="e.g. S62.5, Z57.1"
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Health check rating</InputLabel>
          <Select
            value={healthCheckRating}
            label="Health check rating"
            onChange={({ target }) => setHealthCheckRating(Number(target.value))}
          >
            {Object.entries(ratingLabels).map(([value, label]) => (
              <MenuItem key={value} value={Number(value)}>{label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">Add</Button>
      </Box>
    </Box>
  );
};

export default AddEntryForm;
