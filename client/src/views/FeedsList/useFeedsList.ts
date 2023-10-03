import { useQuery } from "react-query";
import fetchInstance from "../../axios/fetchInstance";

const useFeedsList = () => {
  const url = '/calendar/feeds';
  const { data: feedsData, isLoading, error } = useQuery(url, () => fetchInstance.get(url));

  const res = feedsData?.data;
  const currentHost = res?.current_host;
  const showTeamFeed = !!res?.keep_team_view_hidden;
  const teamFeedToken = res?.calendar_feed?.feed_token;
  const calendarFeedToken = res?.team_view_feed?.feed_token;

  return {
    currentHost,
    isLoading,
    showTeamFeed,
    teamFeedToken,
    calendarFeedToken,
    error,
  }
}

export default useFeedsList;
