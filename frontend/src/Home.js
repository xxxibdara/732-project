import {
  Link,
  styled,
  Typography
} from "@mui/material";
import React, {useMemo, useRef} from "react";
import Bug from "./components/Bug";
import Github from "./components/Github";
import BarChart from "./components/BarChart";
import * as BarChartData from "./util/BarChartData";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import useMapData from "./hooks/useMapData";
import L from "leaflet";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import useBarChartData from "./hooks/useBarChartData";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "./leaflet.awesome-markers";
import "./leaflet.awesome-markers.css"

const BackgroundPage = styled("div")(() => ({
  backgroundImage: `url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg)`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "100%",
  backgroundColor: "#f0f2f5",
  minHeight: `calc(100vh - 70px)`
}));

const Paper = styled("div")(({theme}) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minHeight: `calc(100vh - 150px)`
}));

const TitleStyle = styled(Typography)(({theme}) => ({
  color: theme.palette.info.main,
  margin: theme.spacing(5, 3, 0, 3),
  alignItems: "center",
  textAlign: "center"
}));

const MenuStyle = styled("div")(() => ({
  display: "flex"
}));

const SectionStyle = styled(Link)(({theme}) => ({
  color: theme.palette.error.light,
  margin: theme.spacing(2, 3),
  alignItems: "center"
}));

const Footer = styled("div")(({theme}) => ({
  padding: "1em 0",
  color: theme.palette.grey[600],
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center"
}));

const BarChartWrapper1 = styled("div")(({theme}) => ({
  margin: theme.spacing(2, 5),
  width: "500px",
}));

const BarChartWrapper2 = styled("div")(({theme}) => ({
  margin: theme.spacing(2, 5),
  width: "800px",
}));

const Wrapper = styled("div")(({theme}) => ({
  display: "flex",
}));

const CustomTable = styled("div")(({theme}) => ({
  width: "25vw",
  minWidth: "300px",
  border: `solid ${theme.palette.primary.lighter} 2px`,
  margin: theme.spacing(6, 4, 0, 3),
  padding: theme.spacing(2, 4),
  textAlign: "center",
  color: theme.palette.info.main,
}));

const DropdownWrapper = styled("div")(({theme}) => ({
  display: "flex",
  width: "100%",
  alignItems: "center",
  padding: theme.spacing(2),
}));

const FilterWrapper = styled(Typography)(({theme}) => ({
  margin: theme.spacing(0, 10, 0, 0),
}));

const MapWrapper = styled("div")(({theme}) => ({
  display: "flex",
}));

export default function Home() {
  const starRating = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
  const categoryType= ['Restaurants', 'Food', 'Nightlife', 'Shopping', 'Beauty & Spas',   'Local Services', 'Fashion', 'Active Life',  'Automotive', 'Health & Medical', 'Others']

  const {businessData, setBusinessData, starLevel, setStarLevel, category, setCategory, getAllBusinessData} = useMapData();
  const { groupByStarData, groupByCategoryData } = useBarChartData();

  const BarChartData1 = {
    chartTitle: BarChartData.chartTitle[0],
    xValues: BarChartData.xValues[0],
    yValues: groupByStarData,
    dataSetLabels: BarChartData.dataSetLabels[0],
    backgroundColor: BarChartData.backgroundColor[0]
  }

  const BarChartData2 = {
    chartTitle: BarChartData.chartTitle[1],
    xValues: BarChartData.xValues[1],
    yValues: groupByCategoryData,
    dataSetLabels: BarChartData.dataSetLabels[1],
    backgroundColor: BarChartData.backgroundColor[1]
  }

  const onReset = async () => {
    if (starLevel !== "" || category !== "") {
      setStarLevel("");
      setCategory("");
      const data = await getAllBusinessData()
      setBusinessData(data)
    }
  }

  const onApplyFilter = async e => {
    e.preventDefault();
  }

  const Map = () => {
    const position = useMemo(() => ({lat: 53.55, lng: -113.5}), [])

    const color_by_category = {
      "Restaurants": "darkblue", "Food": "cadetblue", "Nightlife": "black",
      "Shopping": "darkpurple", "Beauty & Spas": "pink", "Local Services": "darktblue",
      "Fashion": "darkpurple", "Active Life": "darkred",
      "Automotive": "orange", "Health & Medical": "darkgreen", "Others": "gray"
    };

    const customize_icon = {
      "Restaurants": "coffee", "Food": "glass", "Nightlife": "bookmark",
      "Shopping": "star", "Beauty & Spas": "star", "Local Services": "flag",
      "Fashion": "star", "Active Life": "bookmark",
      "Automotive": "car", "Health & Medical": "flag", "Others": "tags"
    };
    return (
      <MapContainer
        doubleClickZoom={false}
        center={position}
        zoom={11}
        maxZoom={18}>

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <MarkerClusterGroup>
          {businessData.map((business, index) => {
            const category = business["category"]
            const customMarker = L.AwesomeMarkers.icon({
              icon: customize_icon[category],
              prefix: 'fa',
              markerColor: color_by_category[category]
            });
            return <>
              <Marker
                position={{lat: business.latitude, lng: business.longitude}}
                icon={customMarker}
                key={index}
                >
                <Popup>
                  <b>Name: {business.name}</b> <br/>
                  <b>Star: {business.stars}</b> <br/>
                  <b>Review count: {business.review_count}</b>
                </Popup>
              </Marker>
            </>
          })}
        </MarkerClusterGroup>

      </MapContainer>

    );
  }

  const handleStarLevelChange = (e) => {
    setStarLevel(e.target.value);
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  }

  return (
    <BackgroundPage>
      <Paper>
        <TitleStyle variant="h2">
          <div>
            Welcome to our
          </div>
          <div>
            Yelp Recommender System project demo
          </div>
        </TitleStyle>
        <MenuStyle>
          <SectionStyle href="/" variant="h6" underline="none">
            Home
          </SectionStyle>
          <SectionStyle href="nlp" variant="h6" underline="none">
            NLP
          </SectionStyle>
          <SectionStyle href="location_recommender" variant="h6" underline="none">
            Location Recommender
          </SectionStyle>
        </MenuStyle>
        <Wrapper>
          <BarChartWrapper1>
            <BarChart BarChartData={BarChartData1}/>
          </BarChartWrapper1>
          <BarChartWrapper2>
            <BarChart BarChartData={BarChartData2}/>
          </BarChartWrapper2>
        </Wrapper>
        <MapWrapper>
          <form onSubmit={onApplyFilter}>
            <CustomTable>
              <Typography variant="h3">
                Filter data
              </Typography>
              <DropdownWrapper>
                <FilterWrapper variant="h6">
                  Category
                </FilterWrapper>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    size="small"
                    onChange={handleCategoryChange}
                  >
                    {categoryType.map((category, index) => {
                      return <MenuItem key={index} value={category}>{category}</MenuItem>
                    })}
                  </Select>
                </FormControl>
              </DropdownWrapper>
              <DropdownWrapper>
                <FilterWrapper variant="h6">
                  Star Rating
                </FilterWrapper>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={starLevel}
                    size="small"
                    onChange={handleStarLevelChange}
                  >
                    {starRating.map((starValue, index) => {
                      return <MenuItem key={index} value={starValue}>{starValue}</MenuItem>
                    })}
                  </Select>
                </FormControl>
              </DropdownWrapper>
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                sx={{
                  "& > :not(style)": {marginRight: 2}
                }}
              >
                <Button variant="contained" color="error" onClick={() => onReset()}>
                  Reset
                </Button>
              </Grid>
            </CustomTable>
          </form>
          <Map/>
        </MapWrapper>
      </Paper>

      <Footer>
        <div>
          <Github/> Team No_Error Frontend Demo <Bug/>
        </div>
        <div>Copyright © Made by Ziyao Cui, Xiaoxiao Duan, Jingyi Huang, Zipeng Liang</div>
      </Footer>

    </BackgroundPage>
  )
}