import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Box,
  Paper
} from "@material-ui/core";
import Loading from "../statics/Loading"
import Project from "../../containers/clients/FWProject"
import ProjectDateTime from "../../containers/clients/FWProjectDateTime"
import ProjectConfirm from "../../containers/clients/FWProjectConfirm"


const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: 12,
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
  },
  selected: {
    border: `2px solid ${theme.palette.primary.main}`,
  },
  actions: {
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "space-between",
  },
  timeButton: {
    margin: theme.spacing(1),
  },
  confirmPaper: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(2),
    borderRadius: 12,
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
  },
}));

function stepContent(step) {
  switch (step) {
    case 1:
      return <Project />
    case 2:
      return <ProjectDateTime />
    case 3:
      return <ProjectConfirm />
    default:
      return <></>
  }
}

export default function Bookings(props) {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const { pfetching, error, submitBooking } = props
  const steps = ["選擇服務項目", "選擇日期與時間", "確認預約內容"]

  const handleNext = () => setActiveStep((prev) => prev + 1)
  const handleBack = () => setActiveStep((prev) => prev - 1)
  if (pfetching || error) return pfetching ? <Loading full /> : error
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>預約服務</Typography>

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <section>
        {stepContent(activeStep + 1)}
      </section>

      <div className={classes.actions}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          上一步
        </Button>
        <Button
          variant="contained"
          color="primary"
          // disabled={(activeStep === 0 && !selectedService) || (activeStep === 1 && !selectedTime)}
          onClick={activeStep === steps.length - 1 ? submitBooking : handleNext}
        >
          {activeStep === steps.length - 1 ? "完成預約" : "下一步"}
        </Button>
      </div>
    </Container>
  );
}