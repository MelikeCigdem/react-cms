import { useSelectedBrand } from '../../context/SelectedBrandContext';
import './Home.module.css';
import { Grid } from '@mui/material';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';
import SectionOne from './SectionOne/SectionOne';

export default function Home() {
    //   const { selectedBrand } = useSelectedBrand();
    // console.log("Selected Brand:", selectedBrand);

    return (
        <Grid
            container
            direction="row"
            sx={{
                justifyContent: "space-between",
                alignItems: "stretch",
            }}
        >
            <Grid item xs={4}>
                <SectionOne />
            </Grid>
            <Grid item xs={4}>
                <SectionTwo />
            </Grid>
            <Grid item xs={4}>
                <SectionThree />
            </Grid>
        </Grid>
    )
}
