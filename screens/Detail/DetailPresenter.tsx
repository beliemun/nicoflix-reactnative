import React from "react";
import { View, Text, Dimensions } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { imgaeApi } from "../../api";
import Link from "../../components/Link";
import Poster from "../../components/Poster";
import Title from "../../components/Title";
import Votes from "../../components/Votes";
import { formatDate, trimText } from "../../utils";

const Backdrop = styled.Image`
  position: absolute;
  top: 0;
  width: 100%;
  height: ${Dimensions.get("window").height / 4}px;
`;

const Curtain = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
`;

const BackdropContainer = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: black;
`;

const ScrollContainer = styled.View`
  flex: 1;
  background-color: transparent;
`;

const Container = styled.View`
  flex-direction: row;
  margin-top: 130px;
  margin-bottom: 10px;
`;

const Info = styled.View`
  justify-content: flex-end;
`;

const VotesContainer = styled.View`
  margin-left: 10px;
`;

const Date = styled.Text`
  color: white;
  font-size: 14px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const Overview = styled.Text`
  width: 100%;
  color: white;
  opacity: 0.8;
  line-height: 20px;
  padding: 0 10px;
`;

const DataName = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
  margin: 20px 0 5px;
`;

const DataValue = styled.Text`
  flex: 0;
  color: white;
  opacity: 0.8;
  padding: 5px 10px;
`;

interface IProps {
  media: IMedia;
  loading: boolean;
  getData: () => Promise<void>;
  openBrowser: (url: string) => Promise<void>;
}

const DetailPresenter: React.FC<IProps> = ({
  media,
  loading,
  getData,
  openBrowser,
}) => {
  const {
    id,
    mediaType,
    title,
    date,
    overview,
    vote_average,
    poster_path,
    backdrop_path,
    spoken_languages,
    status,
    imdb_id,
    videos,
  } = media;
  console.log("!!!", media);
  return (
    <>
      <BackdropContainer>
        <Backdrop source={{ uri: imgaeApi(backdrop_path) }} />
        <Curtain />
      </BackdropContainer>
      <ScrollContainer>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
          <Container>
            <Poster url={imgaeApi(poster_path)} />
            <Info>
              {title && <Title title={trimText(title, 24)} />}
              {date && (
                <Date>
                  <Text>{formatDate(date)}</Text>
                </Date>
              )}
              <VotesContainer>
                <Votes votes={vote_average} />
              </VotesContainer>
            </Info>
          </Container>
          <DataName>Overview</DataName>
          <Overview>{overview ? overview : "(No overview)"}</Overview>
          {spoken_languages && (
            <>
              <DataName>Language</DataName>
              {spoken_languages.map((language, index) => (
                <DataValue key={index}>{language.name}</DataValue>
              ))}
            </>
          )}
          {status && (
            <>
              <DataName>Status</DataName>
              <DataValue>{status}</DataValue>
            </>
          )}
          {imdb_id && (
            <>
              <DataName>Link</DataName>
              <Link
                text={"IMDB Page"}
                icon={"imdb"}
                onPress={() =>
                  openBrowser(`https://www.imdb.com/title/${imdb_id}`)
                }
              />
            </>
          )}
          {videos && videos?.length > 0 && (
            <>
              <DataName>Videos</DataName>
              {videos.map((video) => (
                <Link
                  text={video.name}
                  key={video.id}
                  icon={"youtube-play"}
                  onPress={() =>
                    openBrowser(`https://www.youtube.com/watch?v=${video.key}`)
                  }
                />
              ))}
            </>
          )}
        </ScrollView>
      </ScrollContainer>
    </>
  );
};

export default DetailPresenter;
