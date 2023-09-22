const responseParser = ({ req, res, next, defaultResponse, statusCode, body }) => {
  if (next) return next();

  if (!req.headers.react_app) {
    return defaultResponse();
  }

  return res.status(statusCode).send({ ...body, loggedUser: res?.locals?.logged_user, keepTeamViewHidden: res?.locals?.keep_team_view_hidden });
}

module.exports = responseParser;
