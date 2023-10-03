import React from "react";
import { Link } from "react-router-dom";
import Page from "../../components/partials/bits/Page";
import useFeedsList from "./useFeedsList";

const FeedsList = () => {
  const { isLoading, showTeamFeed, currentHost, teamFeedToken, calendarFeedToken, error } = useFeedsList();

  return (
    <Page isLoading={isLoading} error={error}>
      <div className="feeds-list">
        <h1>My feeds</h1>

        <p className="lead">Feeds for external calendars</p>

        {/* {{> show_flash_messages }} */}

        <div className="row">

          <div className="col-md-6">

            <div className="row">&nbsp;</div>

            <div className="row">
              <div className="col-md-12">

                <p className="description-paragraph">Share your Rocco's Collision PTO data with external calendar providers such as Microsoft Outlook, Apple Calendar (iCal) or Google Calendar.</p>

                <p className="description-paragraph">We provide following streams from:</p>
                <p className="description-paragraph">
                  <Link to="/calendar/">My Calendar</Link> page - feeds all data from My Calendar page
                </p>
                {!showTeamFeed ? (
                  <p className="description-paragraph">
                    <Link to="/teamview/">Team view</Link> page - feeds Team view data for current month
                  </p>
                ): null}

                <p className="description-paragraph">To export particular feed into default calendar application just click on corresponding link.</p>

                <p className="description-paragraph">Otherwise copy the link location and pass it to external application.</p>

              </div>
            </div>

            <div className="row feeds-holder">

              <div className="col-md-5 well">
                <form method="POST" action={`${currentHost}/calendar/feeds/regenerate/`}>
                <a href={`webcal://${currentHost}/feed/${calendarFeedToken}/ical.ics`}>My calendar feed <i className="fa fa-rss"></i></a>

                <input type="hidden" name="token" value={calendarFeedToken}/>
                <button type="submit" className="close" aria-label="Close"><span aria-hidden="true"><i className="fa fa-trash"></i></span></button>
                </form>
              </div>

              {!showTeamFeed ? (
                <div className="col-md-5 col-md-offset-2 well">
                  <form method="POST" action={`${currentHost}/calendar/feeds/regenerate/`}>
                  <a href={`webcal://${currentHost}/feed/${teamFeedToken}/ical.ics`}>Team view feed <i className="fa fa-rss"></i></a>

                  <input type="hidden" name="token" value={teamFeedToken}/>
                  <button type="submit" className="close" aria-label="Close"><span aria-hidden="true"><i className="fa fa-trash"></i></span></button>
                  </form>
                </div>
              ) : null}

            </div>
          </div>


          <div className="col-md-6">
            <div className="row feed-calendar-big-picture-holder">
              <i className="fa fa-calendar feed-calendar-big"></i>
            </div>
          </div>



        </div>

      </div>
    </Page>
  );
};

export default FeedsList;
