import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import { Male, Female, Transgender } from "@mui/icons-material";
import axios from "axios";

import patientService from "../../services/patients";
import type { Patient, Entry, Diagnosis } from "../../types";

const genderIcon = (gender: string) => {
  switch (gender) {
    case "male":
      return <Male />;
    case "female":
      return <Female />;
    default:
      return <Transgender />;
  }
};

const EntryDetails = ({ entry, diagnoses }: { entry: Entry; diagnoses: Record<string, Diagnosis> }) => (
  <Box sx={{ border: 1, borderRadius: 1, padding: 1, marginBottom: 1 }}>
    <Typography>{entry.date} {entry.description}</Typography>
    {entry.diagnosisCodes && (
      <ul>
        {entry.diagnosisCodes.map(code => <li key={code}>{code} {diagnoses[code]?.name}</li>)}
      </ul>
    )}
  </Box>
);

const PatientPage = ({ diagnoses }: { diagnoses: Record<string, Diagnosis> }) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPatient = async () => {
      try {
        const data = await patientService.getById(id);
        setPatient(data);
      } catch (e: unknown) {
        if (axios.isAxiosError(e) && e.response?.status === 404) {
          setError("Patient not found");
        } else {
          setError("Failed to fetch patient data");
        }
      }
    };

    fetchPatient();
  }, [id]);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!patient) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 2 }}>
        <Typography variant="h4">{patient.name}</Typography>
        {genderIcon(patient.gender)}
      </Box>
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>
      {patient.dateOfBirth && <Typography>date of birth: {patient.dateOfBirth}</Typography>}
      <Typography variant="h5" sx={{ marginTop: 2, marginBottom: 1 }}>entries</Typography>
      {patient.entries.map(entry => (
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default PatientPage;
