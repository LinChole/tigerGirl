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
import Project from "../../containers/clients/FWProject"
import ProjectDateTime from "../../containers/clients/FWProjectDateTime"
import ProjectConfirm from "../../containers/clients/FWProjectConfirm"


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background: "#F7F2FB",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  title: {
    fontWeight: 700,
    marginBottom: theme.spacing(4),
    background: "linear-gradient(135deg, #5998CA 0%, #CD75CE 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  stepper: {
    background: "transparent",
    padding: theme.spacing(3, 0),
    "& .MuiStepIcon-root.MuiStepIcon-active": {
      color: "#5998CA",
    },
    "& .MuiStepIcon-root.MuiStepIcon-completed": {
      color: "#CD75CE",
    },
    "& .MuiStepLabel-label.MuiStepLabel-active": {
      color: "#5998CA",
      fontWeight: 600,
    },
  },
  contentBox: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  actions: {
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "space-between",
  },
  backButton: {
    borderRadius: 30,
    padding: theme.spacing(1, 4),
    borderColor: "#97BCEE",
    color: "#5998CA",
    "&:hover": {
      borderColor: "#5998CA",
      background: "rgba(89, 152, 202, 0.1)",
    },
  },
  nextButton: {
    borderRadius: 30,
    padding: theme.spacing(1, 4),
    fontWeight: 600,
    background: "linear-gradient(135deg, #5998CA 0%, #7C84A4 50%, #CD75CE 100%)",
    backgroundSize: "200% 200%",
    color: "#fff",
    boxShadow: "0 8px 20px rgba(89, 152, 202, 0.4)",
    transition: "all 0.4s ease",
    "&:hover": {
      backgroundPosition: "100% 0",
      boxShadow: "0 12px 30px rgba(205, 117, 206, 0.5)",
      transform: "translateY(-2px)",
    },
    "&:active": {
      transform: "translateY(0)",
    },
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
  const {
    pfetching,
    items,
    error,
    project, subproject, projectDateTime,
    submitBooking } = props
  const steps = ["選擇服務項目", "選擇日期與時間", "確認預約內容"]

  const handleNext = () => setActiveStep((prev) => prev + 1)
  const handleBack = () => setActiveStep((prev) => prev - 1)
  console.log(activeStep)
  const isNextDisabled = () => {
    if (activeStep === 0) {
      return subproject.items.length !== 0 && !subproject.items.some(item => item.selected) || !project.items.some(item => item.selected) && !pfetching
    }
    if (activeStep === 1) {
      return !props.projectDateTime.times.some(item => item.selected) && !pfetching
    }
  }

  return (
    <Box className={classes.root}>
      <Container maxWidth="md">
        <Typography variant="h3" className={classes.title}>
          預約服務
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel className={classes.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box className={classes.contentBox}>
          {stepContent(activeStep + 1)}
        </Box>

        <div className={classes.actions}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
            className={classes.backButton}
          >
            上一步
          </Button>
          <Button
            variant="contained"
            className={classes.nextButton}
            disabled={isNextDisabled()}
            onClick={activeStep === steps.length - 1 ? submitBooking : handleNext}
          >
            {activeStep === steps.length - 1 ? "完成預約" : "下一步"}
          </Button>
        </div>
      </Container>
    </Box>
  );
}