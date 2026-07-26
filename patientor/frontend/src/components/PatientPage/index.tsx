import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, Button } from "@mui/material";
import { Male, Female, Transgender } from "@mui/icons-material";
import axios from "axios";

import patientService from "../../services/patients";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryForm";
import type { Patient, Diagnosis, EntryWithoutId } from "../../types";

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



const PatientPage = ({ diagnoses }: { diagnoses: Record<string, Diagnosis> }) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleAddEntry = async (values: EntryWithoutId) => {
    try {
      const newEntry = await patientService.addEntry(id!, values);
      setPatient(prev => prev && { ...prev, entries: prev.entries.concat(newEntry) });
      setShowForm(false);
      setFormError(null);
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.response?.data && typeof e.response.data === "object" && "error" in e.response.data) {
        setFormError(JSON.stringify(e.response.data.error));
      } else {
        setFormError("Failed to add entry");
      }
      throw e;
    }
  };

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
      {patient.entries.length > 0 && <Typography variant="h5" sx={{ marginTop: 2, marginBottom: 1 }}>entries</Typography>}
      {patient.entries.map(entry => (
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
      {showForm && <AddEntryForm onSubmit={handleAddEntry} error={formError} diagnoses={diagnoses} />}
      {!showForm && (
        <Button variant="contained" sx={{ marginTop: 2 }} onClick={() => setShowForm(true)}>
          Add New Entry
        </Button>
      )}
    </div>
  );
};

export default PatientPage;
