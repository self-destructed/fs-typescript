import { Box, Typography } from "@mui/material";
import { Favorite, MedicalServices, Work } from "@mui/icons-material";

import type { Entry, Diagnosis } from "../../types";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const EntryDetails = ({ entry, diagnoses }: { entry: Entry; diagnoses: Record<string, Diagnosis> }) => {
  switch (entry.type) {
    case "HealthCheck":
      return (
        <Box sx={{ border: 1, borderRadius: 1, padding: 1, marginBottom: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography>{entry.date} {entry.description}</Typography>
            <MedicalServices />
          </Box>
          <Favorite color={entry.healthCheckRating === 0 ? "success" : entry.healthCheckRating === 1 ? "warning" : "error"} />
          <Typography>diagnose by {entry.specialist}</Typography>
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map(code => <li key={code}>{code} {diagnoses[code]?.name}</li>)}
            </ul>
          )}
        </Box>
      );
    case "OccupationalHealthcare":
      return (
        <Box sx={{ border: 1, borderRadius: 1, padding: 1, marginBottom: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography>{entry.date} {entry.description}</Typography>
            <Work />
          </Box>
          <Typography>employer: {entry.employerName}</Typography>
          {entry.sickLeave && (
            <Typography>sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</Typography>
          )}
          <Typography>diagnose by {entry.specialist}</Typography>
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map(code => <li key={code}>{code} {diagnoses[code]?.name}</li>)}
            </ul>
          )}
        </Box>
      );
    case "Hospital":
      return (
        <Box sx={{ border: 1, borderRadius: 1, padding: 1, marginBottom: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography>{entry.date} {entry.description}</Typography>
            <MedicalServices />
          </Box>
          <Typography>discharge: {entry.discharge.date} - {entry.discharge.criteria}</Typography>
          <Typography>diagnose by {entry.specialist}</Typography>
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map(code => <li key={code}>{code} {diagnoses[code]?.name}</li>)}
            </ul>
          )}
        </Box>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
