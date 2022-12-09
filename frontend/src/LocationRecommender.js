import {
  styled, Typography
} from "@mui/material";
import {MapContainer, TileLayer, Marker, Popup, Circle, LayerGroup} from "react-leaflet"
import L from "leaflet"
import React, {useMemo, useState} from "react";
import "./globals.css"
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import useNeighborMapData from "./hooks/useNeighborMapData";

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

export default function LocationRecommender() {
  const { neighborData, getTargetStoreNeighborData } = useNeighborMapData();
  const [ targetData, setTargetData ] = useState([]);
  const [ selectedInput, setSelectedInput ] = useState("");

  const markerIcon = new L.Icon({
    iconUrl: require("./resources/images/marker.png"),
    iconSize: [25, 35],
    iconAnchor: [20, 40],
  })

  const inputValues = []
  const inputMap = {}
  neighborData.forEach((business) => {
    const input = business.name + " (" + business.latitude + ", " + business.longitude+ ")";
    if (!inputValues.includes(input)) {
      inputValues.push(input)
      inputMap[input] = business.id
    }
  })

  const Map = () => {
    const position = useMemo(() => ({lat: 53.55, lng: -113.5}), [])
    console.log(neighborData)
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

          {targetData && targetData.map((business) => {
            return <>
              <Marker
                position={{lat: business.latitude, lng: business.longitude}}
                icon={markerIcon}>
                <Popup>
                  <b>Name: {business.name}</b> <br/>
                  <b>Longitude: {business.longitude}</b> <br/>
                  <b>Latitude: {business.latitude}</b>
                </Popup>
              </Marker>
              <Marker
                position={{lat: business.neighbor_latitude, lng: business.neighbor_longitude}}>
                <Popup>
                  <b>Target Store: {business.name}</b> <br/>
                  <b>Neighbor Name: {business.neighbor_store}</b> <br/>
                  <b>Neighbor Longitude: {business.neighbor_longitude}</b> <br/>
                  <b>Neighbor Latitude: {business.neighbor_latitude}</b> <br/>
                  <b>Distance To Target Store: {business.distance}</b>
                </Popup>
              </Marker>
              <LayerGroup>
                <Circle
                  center={[business.latitude, business.longitude]}
                  pathOptions={{ color: 'blue', fillColor: 'blue' }}
                  radius={500}
                />
              </LayerGroup>
            </>
          })}
      </MapContainer>
    );
  }

  const handleInputChange = async (e) => {
    setSelectedInput(e.target.value)
    const id = inputMap[e.target.value];
    const data = await getTargetStoreNeighborData(id);
    setTargetData(data);
  }

  return (
    <BackgroundPage>
      <Paper>
        <div>
          <CustomTable>
            <Typography variant="h4">
              Select Input Business Value
            </Typography>
            <DropdownWrapper>
              <FilterWrapper variant="h6">
                Input
              </FilterWrapper>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedInput}
                  size="small"
                  onChange={handleInputChange}
                >
                  {inputValues.map((business, index) => {
                    return <MenuItem key={index} value={business}>{business}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </DropdownWrapper>
          </CustomTable>
        </div>
        <Map/>
      </Paper>
    </BackgroundPage>
  )
}