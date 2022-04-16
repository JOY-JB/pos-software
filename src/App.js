import "./App.css";
import {
  Autocomplete,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  InputBase,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import PurchaseTable from "./components/Table/PurchaseTable";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DiscountIcon from "@mui/icons-material/Discount";
import { useEffect, useState } from "react";

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
  {
    label: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { label: "The Good, the Bad and the Ugly", year: 1966 },
  { label: "Fight Club", year: 1999 },
  {
    label: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    label: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { label: "Forrest Gump", year: 1994 },
  { label: "Inception", year: 2010 },
  {
    label: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: "Goodfellas", year: 1990 },
  { label: "The Matrix", year: 1999 },
  { label: "Seven Samurai", year: 1954 },

  { label: "City of God", year: 2002 },
  { label: "Se7en", year: 1995 },
  { label: "The Silence of the Lambs", year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: "Life Is Beautiful", year: 1997 },
  { label: "The Usual Suspects", year: 1995 },
  { label: "Léon: The Professional", year: 1994 },
  { label: "Spirited Away", year: 2001 },
  { label: "Saving Private Ryan", year: 1998 },
  { label: "Once Upon a Time in the West", year: 1968 },
  { label: "American History X", year: 1998 },
  { label: "Interstellar", year: 2014 },
  { label: "Casablanca", year: 1942 },
  { label: "City Lights", year: 1931 },
  { label: "Psycho", year: 1960 },
  { label: "The Green Mile", year: 1999 },
  { label: "The Intouchables", year: 2011 },
  { label: "Modern Times", year: 1936 },
  { label: "Raiders of the Lost Ark", year: 1981 },
  { label: "Rear Window", year: 1954 },
  { label: "The Pianist", year: 2002 },
  { label: "The Departed", year: 2006 },
  { label: "Terminator 2: Judgment Day", year: 1991 },
  { label: "Back to the Future", year: 1985 },
  { label: "Whiplash", year: 2014 },
  { label: "Gladiator", year: 2000 },
  { label: "Memento", year: 2000 },
  { label: "The Prestige", year: 2006 },
  { label: "The Lion King", year: 1994 },
  { label: "Apocalypse Now", year: 1979 },
  { label: "Alien", year: 1979 },
  { label: "Sunset Boulevard", year: 1950 },
  { label: "Dr. Strangelove or: ", year: 1964 },
  { label: "The Great Dictator", year: 1940 },
  { label: "Cinema Paradiso", year: 1988 },
  { label: "The Lives of Others", year: 2006 },
  { label: "Grave of the Fireflies", year: 1988 },
  { label: "Paths of Glory", year: 1957 },
  { label: "Django Unchained", year: 2012 },
  { label: "The Shining", year: 1980 },
  { label: "WALL·E", year: 2008 },
  { label: "American Beauty", year: 1999 },
  { label: "The Dark Knight Rises", year: 2012 },
  { label: "Princess Mononoke", year: 1997 },
  { label: "Aliens", year: 1986 },
  { label: "Oldboy", year: 2003 },
  { label: "Once Upon a Time in America", year: 1984 },
  { label: "Witness for the Prosecution", year: 1957 },
  { label: "Das Boot", year: 1981 },
  { label: "Citizen Kane", year: 1941 },
  { label: "North by Northwest", year: 1959 },
  { label: "Vertigo", year: 1958 },
  { label: "Star Wars: Episode", year: 1983 },
  { label: "Reservoir Dogs", year: 1992 },
  { label: "Braveheart", year: 1995 },
  { label: "M", year: 1931 },
  { label: "Requiem for a Dream", year: 2000 },
  { label: "Amélie", year: 2001 },
  { label: "A Clockwork Orange", year: 1971 },
  { label: "Like Stars on Earth", year: 2007 },
  { label: "Taxi Driver", year: 1976 },
  { label: "Lawrence of Arabia", year: 1962 },
  { label: "Double Indemnity", year: 1944 },
  { label: "Amadeus", year: 1984 },
  { label: "To Kill a Mockingbird", year: 1962 },
  { label: "Toy Story 3", year: 2010 },
  { label: "Logan", year: 2017 },
  { label: "Full Metal Jacket", year: 1987 },
  { label: "Dangal", year: 2016 },
  { label: "The Sting", year: 1973 },
  { label: "2001: A Space Odyssey", year: 1968 },
  { label: "Singin' in the Rain", year: 1952 },
  { label: "Toy Story", year: 1995 },
  { label: "Bicycle Thieves", year: 1948 },
  { label: "The Kid", year: 1921 },
  { label: "Inglourious Basterds", year: 2009 },
  { label: "Snatch", year: 2000 },
  { label: "3 Idiots", year: 2009 },
  { label: "Monty Python and the Holy Grail", year: 1975 },
];

function App() {
  const [products, setProducts] = useState([]);
  const [discount, setDiscount] = useState(0);

  const [method, setMethod] = useState("cash");
  const [tax, setTax] = useState("");
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedProductQty, setSelectedProductQty] = useState([]);

  const handleTaxChange = (e) => {
    setTax(e.target.value);
  };

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
  };

  const handleSelect = (product) => {
    if (!selectedProduct?.find((pro) => pro.id == product.id)) {
      setSelectedProduct([...selectedProduct, product]);
      setSelectedProductQty([
        ...selectedProductQty,
        { productId: product.id, price: product.price, quantity: 1 },
      ]);
    }
  };

  const handleDiscount = (e) => {
    setDiscount(e.target.value);
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);

  return (
    <div className="App">
      <Card sx={{ mb: 3 }}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 2,
            m: 1,
            borderRadius: 1,
          }}
        >
          <Typography color="text.primary">POS</Typography>

          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Typography color="text.primary">POS</Typography>
          </Breadcrumbs>
        </CardContent>
      </Card>

      <Container maxWidth="2xl">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={11}>
                      <Autocomplete
                        disablePortal
                        size="small"
                        options={top100Films}
                        renderInput={(params) => (
                          <TextField {...params} label="Walk in customer" />
                        )}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <Button variant="outlined">Add</Button>
                    </Grid>
                  </Grid>
                </Box>

                <PurchaseTable
                  selectedProduct={selectedProduct}
                  setSelectedProduct={setSelectedProduct}
                  selectedProductQty={selectedProductQty}
                  setSelectedProductQty={setSelectedProductQty}
                ></PurchaseTable>

                <Grid container spacing={2} sx={{ mt: 3 }}>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <FormControl fullWidth size="small">
                      <FormLabel>Vat</FormLabel>
                      <Paper variant="outlined">
                        <IconButton>
                          <MonetizationOnIcon />
                        </IconButton>
                        <InputBase sx={{ ml: 1, flex: 1 }} defaultValue={0} />
                      </Paper>
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <FormControl fullWidth size="small">
                      <FormLabel>Discount</FormLabel>
                      <Paper variant="outlined">
                        <IconButton>
                          <DiscountIcon />
                        </IconButton>
                        <InputBase
                          type="number"
                          sx={{ ml: 1, flex: 1, width: "85%" }}
                          onChange={handleDiscount}
                          defaultValue={0}
                        />
                      </Paper>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 5 }}>
                  <Grid item xs={8}>
                    <FormControl fullWidth sx={{ mb: 2 }} size="small">
                      <InputLabel id="pay-with">Pay By</InputLabel>
                      <Select
                        labelId="pay-with"
                        label="Pay With"
                        value={method}
                        onChange={handleMethodChange}
                      >
                        <MenuItem value="card">Card</MenuItem>
                        <MenuItem value="cash">Cash</MenuItem>
                      </Select>
                    </FormControl>

                    <Button variant="contained" fullWidth>
                      Pay Now
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>
                          Vat :
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          Discount :
                        </Typography>
                        <Typography fontSize="1.2rem" variant="h4" gutterBottom>
                          Grand Total :
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sx={{ textAlign: "right" }}>
                        <Typography variant="body1" gutterBottom>
                          $ 0.00
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          $
                          {isNaN(parseFloat(discount).toFixed(2))
                            ? "0.00"
                            : parseFloat(discount).toFixed(2)}
                        </Typography>
                        <Typography fontSize="1.2rem" variant="h4" gutterBottom>
                          $
                          {parseFloat(
                            selectedProductQty.reduce(function (acc, obj) {
                              return acc + obj.price * obj.quantity;
                            }, 0)
                          ).toFixed(2) -
                            (isNaN(parseFloat(discount).toFixed(2))
                              ? 0
                              : parseFloat(discount).toFixed(2))}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Box sx={{ mb: 2 }}>
                  <Autocomplete
                    disablePortal
                    size="small"
                    options={top100Films}
                    renderInput={(params) => (
                      <TextField {...params} label="Search Product...." />
                    )}
                  />
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    {products.map((product) => (
                      <>
                        <Grid item xs={3}>
                          <Card
                            onClick={() => {
                              handleSelect(product);
                            }}
                            sx={{ maxWidth: 345 }}
                          >
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                height="140"
                                image={product.image}
                                alt="green iguana"
                              />
                              <CardContent>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {product.category}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                            <CardActions>
                              <Typography variant="subtitle1" component="h1">
                                ${product.price}
                              </Typography>
                            </CardActions>
                          </Card>
                        </Grid>
                      </>
                    ))}
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
