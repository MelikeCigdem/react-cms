import { useSelectedBrand } from '../../context/SelectedBrandContext';
import './Home.module.css';
import { Container, Grid, Paper } from '@mui/material';

export default function Home(){
      const { selectedBrand } = useSelectedBrand();
      console.log("selectedBrand",selectedBrand);
      
    return(
        <Container sx={{mt:8}}>
            <Grid container spacing={2}>
                <Grid item md={8} sm={12} xs={12}>
                    <Paper>Liste</Paper>
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                   
                </Grid>
            </Grid>
        </Container>
    )
}