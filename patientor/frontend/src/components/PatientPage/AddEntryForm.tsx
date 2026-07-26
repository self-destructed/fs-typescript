import { useState } from "react";
import { Box, Button, TextField, Typography, Select, MenuItem, InputLabel, FormControl, Checkbox, ListItemText, OutlinedInput } from "@mui/material";
import { HealthCheckRating, type EntryWithoutId, type HealthCheckRating as HealthCheckRatingType, type Diagnosis } from "../../types";

interface Props {
  onSubmit: (values: EntryWithoutId) => Promise<void>;
  error: string | null;
  diagnoses: Record<string, Diagnosis>;
}

const ratingLabels: Record<number, string> = {
  [HealthCheckRating.Healthy]: "Healthy",
  [HealthCheckRating.LowRisk]: "Low risk",
  [HealthCheckRating.HighRisk]: "High risk",
  [HealthCheckRating.CriticalRisk]: "Critical risk",
};

const AddEntryForm = ({ onSubmit, error, diagnoses }: Props) => {
  const diagnosisCodesOptions = Object.values(diagnoses).map(d => d.code);
  const [entryType, setEntryType] = useState<"HealthCheck" | "OccupationalHealthcare" | "Hospital">("HealthCheck");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<number>(HealthCheckRating.Healthy);
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const resetFields = () => {
    setDate("");
    setDescription("");
    setSpecialist("");
    setDiagnosisCodes([]);
    setHealthCheckRating(HealthCheckRating.Healthy);
    setEmployerName("");
    setSickLeaveStart("");
    setSickLeaveEnd("");
    setDischargeDate("");
    setDischargeCriteria("");
  };

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const base = {
      date,
      description,
      specialist,
      diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined,
    };

    let entry: EntryWithoutId;

    switch (entryType) {
      case "HealthCheck":
        entry = { ...base, type: "HealthCheck", healthCheckRating: healthCheckRating as HealthCheckRatingType };
        break;
      case "OccupationalHealthcare":
        entry = {
          ...base,
          type: "OccupationalHealthcare",
          employerName,
          ...(sickLeaveStart && sickLeaveEnd ? { sickLeave: { startDate: sickLeaveStart, endDate: sickLeaveEnd } } : {}),
        };
        break;
      case "Hospital":
        entry = { ...base, type: "Hospital", discharge: { date: dischargeDate, criteria: dischargeCriteria } };
        break;
    }

    try {
      await onSubmit(entry);
    } catch {
      return;
    }
    resetFields();
  };

  return (
    <Box sx={{ border: 2, borderRadius: 1, borderColor: "primary.main", padding: 2, marginTop: 2 }}>
      <Typography variant="h6">New entry</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box component="form" onSubmit={submit} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <FormControl fullWidth>
          <InputLabel>Entry type</InputLabel>
          <Select
            value={entryType}
            label="Entry type"
            onChange={({ target }) => setEntryType(target.value as typeof entryType)}
          >
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
          </Select>
        </FormControl>

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
        <FormControl fullWidth>
          <InputLabel>Diagnosis codes</InputLabel>
          <Select
            multiple
            value={diagnosisCodes}
            onChange={({ target }) => setDiagnosisCodes(target.value as string[])}
            input={<OutlinedInput label="Diagnosis codes" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {diagnosisCodesOptions.map(code => (
              <MenuItem key={code} value={code}>
                <Checkbox checked={diagnosisCodes.includes(code)} />
                <ListItemText primary={code} secondary={diagnoses[code]?.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {entryType === "HealthCheck" && (
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
        )}

        {entryType === "OccupationalHealthcare" && (
          <>
            <TextField
              label="Employer name"
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
              fullWidth
            />
            <TextField
              label="Sick leave start"
              type="date"
              value={sickLeaveStart}
              onChange={({ target }) => setSickLeaveStart(target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Sick leave end"
              type="date"
              value={sickLeaveEnd}
              onChange={({ target }) => setSickLeaveEnd(target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </>
        )}

        {entryType === "Hospital" && (
          <>
            <TextField
              label="Discharge date"
              type="date"
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Discharge criteria"
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
              fullWidth
            />
          </>
        )}

        <Button type="submit" variant="contained" color="primary">Add</Button>
      </Box>
    </Box>
  );
};

export default AddEntryForm;
