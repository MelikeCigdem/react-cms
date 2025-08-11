import { useSelectedBrand } from '../../context/SelectedBrandContext';
import './Home.module.css';
import { Grid } from '@mui/material';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';
import SectionOne from './SectionOne/SectionOne';
import { useEffect, useState } from 'react';

export default function Home() {
    const [tabValue, setTabValue] = useState(0);
    //   const { selectedBrand } = useSelectedBrand();
    // console.log("Selected Brand:", selectedBrand);



    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 3 }}>
            <Grid item size={tabValue === 3 ? 8 : 4}>
                <SectionOne tabValue={tabValue} setTabValue={setTabValue} />
            </Grid>
            {tabValue !== 3 && (
                <Grid item size={4}>
                    <SectionTwo />
                </Grid>
            )}
            <Grid item size={4}>
                <SectionThree />
            </Grid>
        </Grid>
    )
}
