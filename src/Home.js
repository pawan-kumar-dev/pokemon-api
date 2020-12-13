import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
     AppBar,
     Backdrop,
     Card,
     CardContent,
     CardMedia,
     CircularProgress,
     Grid,
     makeStyles,
     TextField,
     Toolbar,
     Typography,
} from "@material-ui/core";
import { toFirstCharUppercase } from "./constant";

const useStyles = makeStyles({
     container: {
          padding: "20px",
          boxSizing: "border-box",
          width: "100%",
     },
     cardMedia: {
          margin: "auto",
          cursor: "pointer",
     },
     cardContent: {
          textAlign: "center",
     },
     searchContainer: {
          display: "flex",
          backgroundColor: "white",
          paddingLeft: "20px",
          paddingRight: "20px",
          marginTop: "5px",
          marginBottom: "5px",
     },
     searchIcon: {
          alignSelf: "flex-end",
          marginBottom: "5px",
     },
     searchInput: {
          width: "200px",
          margin: "5px",
     },
});

const Home = () => {
     const classes = useStyles();
     const [pokemons, setPokemons] = useState();
     const history = useHistory();

     const [filter, setFilter] = useState("");
     useEffect(() => {
          axios.get(`https://pokeapi.co/api/v2/pokemon?limit=807`).then(
               function (response) {
                    const { data } = response;
                    const { results } = data;
                    const newPokemonData = {};
                    results.forEach((pokemon, index) => {
                         newPokemonData[index + 1] = {
                              id: index + 1,
                              name: pokemon.name,
                              sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                                   index + 1
                              }.png`,
                         };
                    });
                    setPokemons(newPokemonData);
               }
          );
     }, []);

     const handleSearchChange = (e) => {
          setFilter(e.target.value);
     };

     const getCard = (pokemonId) => {
          const { id, name, sprite } = pokemons[pokemonId];
          return (
               <Grid item xs={12} sm={6} md={4} key={pokemonId}>
                    <Card onClick={() => history.push(`/${id}`)}>
                         <CardMedia
                              className={classes.cardMedia}
                              image={sprite}
                              style={{ width: "130px", height: "130px" }}
                         />
                         <CardContent className={classes.cardContent}>
                              <Typography>{`${id}. ${toFirstCharUppercase(
                                   name
                              )}`}</Typography>
                         </CardContent>
                    </Card>
               </Grid>
          );
     };
     return (
          <>
               <AppBar position="static">
                    <Toolbar>
                         <div className={classes.searchContainer}>
                              <SearchIcon className={classes.searchIcon} />
                              <TextField
                                   className={classes.searchInput}
                                   onChange={handleSearchChange}
                                   label="Pokemon"
                                   variant="standard"
                              />
                         </div>
                    </Toolbar>
               </AppBar>
               {pokemons ? (
                    <Grid container spacing={3} className={classes.container}>
                         {Object.keys(pokemons).map(
                              (pokemonId) =>
                                   pokemons[pokemonId].name.includes(filter) &&
                                   getCard(pokemonId)
                         )}
                    </Grid>
               ) : (
                    <Backdrop style={{ zIndex: "1000" }} open={true}>
                         <CircularProgress
                              size={80}
                              thickness={5}
                              color="primary"
                         />
                    </Backdrop>
               )}
          </>
     );
};

export default Home;
