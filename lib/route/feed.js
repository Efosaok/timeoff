
"use strict";

const
  express  = require('express'),
  router   = express.Router(),
  _        = require('underscore'),
  moment   = require('moment'),
  Promise  = require('bluebird'),
  ical     = require('ical-generator'),
  config   = require('../config'),
  TeamView = require('../model/team_view');

const
  numberOfFutureMonthsInTeamViewFeed = config.get('number_of_future_months_in_team_view_feed') || 6,
  numberOfPastMonthsInTeamViewFeed   = config.get('number_of_past_months_in_team_view_feed') || 2;

const { getCommentsForLeave } = require('../model/comment');

router.get('/:token/ical.ics', function(req, res){

  var cal = ical({
      domain : 'pto.roccosnetwork.com',
    }),
    token = req.params['token'],
    model = req.app.get('db_model'),
    user;

  Promise
    .resolve()
    .then(() => model.UserFeed.find({
        where   : {feed_token : token},
        include : [{
          model : model.User,
          as    : 'user',
          include : [{
            model : model.Company,
            as    : 'company',
            where : {
              mode : {$ne : model.Company.get_mode_readonly_holidays()},
            },
          }]
        }]
      })
    )
    .then(function(feed){

      if ( ! feed ) {
        throw new Error("Unknown token provided");
      }

      user = feed.user;

      if (feed.is_calendar()){
        cal.name(user.full_name() + ' calendar');

        return user
          .promise_calendar({
            year           : user.company.get_today(),
            show_full_year : true,
          })
          .then(function(calendar){
            let days = _.flatten( calendar.map( cal => cal.as_for_team_view() ));

            days.forEach(day => day.user = user);

            return Promise.resolve(days);
          });
      } else {

        cal.name(`PTO CALENDAR`);

        // Get the list of month deltas in relation to current month, to we can calculate
        // moths for which to build the feed
        let monthDeltas = Array.from(Array(numberOfFutureMonthsInTeamViewFeed + 1).keys())
          .concat( Array.from(Array(numberOfPastMonthsInTeamViewFeed).keys()).map(i => -1 * (i + 1)) );

        return Promise
          .resolve(
            monthDeltas.map(
              delta => user.company.get_today().clone().add(delta, 'months').startOf('month')
            )
          )
          .map(month => {

            const team_view = new TeamView({
              user      : user,
              base_date : month,
            });

            return team_view.promise_team_view_details()
              .then(details => {
                let days = [];

                details.users_and_leaves.forEach(rec => {
                  rec.days.forEach(day => day.user = rec.user);
                  days = days.concat( rec.days );
                });

                return Promise.resolve(days);
              });
          }, { concurrency : 2 })
          .then(arrayOfDays => Promise.resolve( _.flatten(arrayOfDays) ));
      }
    })

    .then(async (days) => {
      for (const day of days) {
        // We care only about days when employee is on leave
        if (!(day.is_leave_morning || day.is_leave_afternoon || day.is_leave_quarter) && !(day.is_approved_leave || day.is_pended_revoke_leave)) {
          continue;
        }

        let start = moment.utc(day.moment),
            end = moment.utc(day.moment),
	    myNote = 'Initial',
            allDay = false;

        if (day.is_leave_morning && day.is_leave_afternoon) {
          start.hour(9).minute(0);
          end.hour(17).minute(0);
          allDay = true;
        } else if (!day.is_leave_morning && day.is_leave_afternoon) {
          start.hour(13).minute(0);
          end.hour(17).minute(0);
          allDay = true;
        } else if (day.is_leave_morning && !day.is_leave_afternoon) {
          start.hour(9).minute(0);
          end.hour(13).minute(0);
          allDay = true;
        }

	if (day.is_leave_morning && day.is_leave_afternoon) {
		myNote = 'Off';
	} else if (!day.is_leave_morning && day.is_leave_afternoon) {
		myNote = 'PM 1/2 Day';
	} else if (day.is_leave_morning && !day.is_leave_afternoon) {
		myNote = 'AM 1/2 Day';
	} else if (day.is_leave_quarter) {
		myNote = 'Quarter Day';
	} else {
		myNote = 'Oops';
	}

        const comments = await getCommentsForLeave({leave: day.leave_obj});

if (day.is_approved_leave || day.is_pended_revoke_leave) {
        cal.createEvent({
          start   : start.toDate(),
          end     : end.toDate(),
          allDay  : true,
          //allDay  : allDay,
          summary : day.user.full_name() + ' - ' + myNote,
          description: (comments.length > 0
            ? `${comments.map(({comment}) => comment).join('. ')}`
            : ''
          ),
        });
      }
      }

      res.send( cal.toString() );
    })
    .catch(error => {

      console.log(`Failed to fetch feed because of: ${error}`);

      // TODO VPP set 404 status
      res.send('N/A');
    });

});


module.exports = router;