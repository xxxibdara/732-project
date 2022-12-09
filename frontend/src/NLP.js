import {
  styled, Typography
} from "@mui/material";
import React, {useMemo, useState} from "react";
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import useMapData from "./hooks/useMapData";
import ReactWordcloud from "react-wordcloud";
import useWordCloudData from "./hooks/useWordCloud";

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
  textAlign: "center",
  minHeight: `calc(100vh - 150px)`,
}));

const InfoWrapper = styled("div")(({theme}) => ({
  display: "flex",
  textAlign: "center",
  color: theme.palette.info.main,
}));

const MapWrapper = styled("div")(({theme}) => ({
  margin: theme.spacing(4,2),
}));

const WordCloudWrapper = styled("div")(({theme}) => ({
  margin: theme.spacing(4,4),
  color: theme.palette.info.main,
}));

const HolderWrapper = styled("div")(() => ({
  width: "500px",
  height: "500px"
}));

const NLP= () => {
  const {getPositiveData, getNegativeData} = useWordCloudData();

  const [goodWordCloud, setGoodWordCloud] = useState(null);
  const [badWordCloud, setBadWordCloud] = useState(null);

  const [name, setName] = useState("N/A");
  const [stars, setStars] = useState("N/A");
  const [reviewCount, setReviewCount] = useState("N/A");
  const Map = () => {
    const {businessData} = useMapData();
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

    const onClick = async (name, stars, review_count, id) => {
      const positiveLog = await getPositiveData(id)
      const negativeLog = await getNegativeData(id)

      const processData = (dirtyData) => {
        const data = []
        dirtyData.forEach((row) => {
          const split = row.split(" ");
          const word = split.slice(0, split.length - 1).join(" ")
          const appearance = split[split.length - 1];
          const record = {}
          record["text"] = word;
          record["value"] = appearance;
          data.push(record)
        })
        return data
      }

      if (positiveLog) {
        setGoodWordCloud(SimpleWordCloud(processData(positiveLog)));
      } else {
        setGoodWordCloud(null);
      }

      if (negativeLog) {
        setBadWordCloud(SimpleWordCloud(processData(negativeLog)));
      } else {
        setBadWordCloud(null);
      }

      setName(name)
      setStars(stars)
      setReviewCount(review_count)
    }

    return (
      <>
        <InfoWrapper>
          <Typography variant="h5">Business Name: {name}</Typography> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Typography variant="h5">Star: {stars}</Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Typography variant="h5">Review count: {reviewCount}</Typography>
        </InfoWrapper>
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
            {businessData.map((business, id) => {
              const category = business["category"]
              const customMarker = L.AwesomeMarkers.icon({
                icon: customize_icon[category],
                prefix: 'fa',
                markerColor: color_by_category[category]
              });
              return <Marker
                  position={{lat: business.latitude, lng: business.longitude}}
                  key={id}
                  icon={customMarker}
                  eventHandlers={{ click: () => onClick(business["name"], business["stars"], business["review_count"], business["business_id"]) }}
                >
                </Marker>
            })}
          </MarkerClusterGroup>

        </MapContainer>
      </>
    );
  }

  const SimpleWordCloud= (words) => {
    const options = {
      rotations: 5,
      rotationAngles: [-90, 0],
    };
    const size = [500, 500];
    return <ReactWordcloud
      words={words}
      options={options}
      size={size}
    />
  }
  return (
    <BackgroundPage>
      <Paper>
        <MapWrapper>
          <Map/>
        </MapWrapper>
        <WordCloudWrapper>
          <div>
            <Typography variant="h4">Word Cloud for User's Good Review</Typography>
            {goodWordCloud !== null ? goodWordCloud : <HolderWrapper>N/A</HolderWrapper>}
          </div>
          <div>
            <Typography variant="h4">Word Cloud for User's Bad Review</Typography>
            {badWordCloud !== null ? badWordCloud : <HolderWrapper>N/A</HolderWrapper>}
          </div>
        </WordCloudWrapper>
      </Paper>
    </BackgroundPage>
  )
}

export default NLP;