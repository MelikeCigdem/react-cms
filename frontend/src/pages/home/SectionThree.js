import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NewsEntry from '../../components/Steps/NewsEntry';
import PhotoCropping from '../../components/Steps/PhotoCropping';
import PhotoDesign from '../../components/Steps/PhotoDesign';

const steps = ['Haber Girişi', 'Foto Kırpma', 'Foto Dizayn'];

export default function SectionThree() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => step === 1;
    const isStepSkipped = (step) => skipped.has(step);

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) throw new Error("Bu adım opsiyonel değil");
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => setActiveStep(0);

    return (
        <Box sx={{ width: '100%' }}>
            {/* Stepper ve Butonlar yan yana */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Stepper
                    activeStep={activeStep}
                    sx={{
                        width: '60%',
                        mr: 2,
                    }}
                >
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                      
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>


                {/* Butonlar */}
                <Box sx={{ display: 'flex', gap: 0 }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                    {isStepOptional(activeStep) && (
                        <Button color="inherit" onClick={handleSkip}>
                            Skip
                        </Button>
                    )}
                    <Button onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </Box>
            </Box>

            {/* İçerik */}
            <Box sx={{ mt: 3 }}>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            Tüm adımlar tamamlandı
                        </Typography>
                        <Button onClick={handleReset}>Reset</Button>
                    </React.Fragment>
                ) : (
                    activeStep === 0 ? <NewsEntry />: 
                    activeStep === 1 ? <PhotoCropping /> :
                    activeStep === 2 ? <PhotoDesign /> : null
                )}
            </Box>
        </Box>
    );
}
