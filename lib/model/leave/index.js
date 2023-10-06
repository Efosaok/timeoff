
"use strict"

const
  Promise   = require('bluebird'),
  Joi       = require('joi'),
  moment    = require('moment'),
  Exception = require('../../error'),
  {commentLeave} = require('../comment'),
  Models    = require('../db');

const
  schemaCreateNewLeave = Joi.object().required().keys({
    for_employee    : Joi.object().required(),
    of_type         : Joi.object().required(),
    with_parameters : Joi.object().required(),
  });

/*
 * Create new leave for provided parameters.
 * Returns promise that is resolved with newly created leave row
 * */
function createNewLeave(args){

  args = Joi.attempt(
    args,
    schemaCreateNewLeave,
    "Failed to validate arguments"
  );

  const
    employee          = args.for_employee,
    leave_type        = args.of_type,
    valide_attributes = args.with_parameters;

  const
    start_date = moment.utc(valide_attributes.from_date),
    end_date   = moment.utc(valide_attributes.to_date);

  // Check that start date is not bigger then end one
  if ( start_date.toDate() > end_date.toDate() ) {
    Exception.throwUserError({
      user_error   : "Start date is later than end date",
      system_error : `Failed to add new Leave for user ${ employee.id } `
        `because start date ${  start_date } happnned to be after end date ${ end_date }`,
    });
  }
  
  // mbm Check that start date is not bigger then end one
  //if ( start_date.toDate() > end_date.toDate() ) {

// body
//const amIAdmin = async ({user, leave}) => {
//		console.dump(user);
//if (!user.is_admin()) {
if (employee.DepartmentId == 4||employee.DepartmentId == 5) {
	const joeyd_block = [
		new Date ('2022-06-14')
	];
	// block
	const joeyd_date_start = joeyd_block.find(
		joeyd_date_start =>
		joeyd_date_start.toDateString() === new Date(start_date).toDateString(),
	);

	const joeyd_date_end = joeyd_block.find(
		joeyd_date_end =>
		joeyd_date_end.toDateString() === new Date(end_date).toDateString(),
	);

	if (joeyd_date_start || joeyd_date_end) {
		var error = new Error('One or more of the dates you are requesting is blocked (Body).  Please contact your manager. (Dept: ' + employee.DepartmentId + ')');
		error.user_message = 'One or more of the dates you are requesting is blocked (Body).  Please contact your manager. (Dept: ' + employee.DepartmentId + ')';
		throw error;
		Exception.throwUserError({
			user_error   : "DATE BLOCKED",
			system_error : `DATE BLOCKED ${start_date} OR ${end_date}`,
		});
	}
	// end block
}

// corp
else if (employee.DepartmentId == 6||employee.DepartmentId == 8) {
	const joeyd_block = [
		new Date ('2022-06-14')
	];
	// block
	const joeyd_date_start = joeyd_block.find(
		joeyd_date_start =>
		joeyd_date_start.toDateString() === new Date(start_date).toDateString(),
	);

	const joeyd_date_end = joeyd_block.find(
		joeyd_date_end =>
		joeyd_date_end.toDateString() === new Date(end_date).toDateString(),
	);

	if (joeyd_date_start || joeyd_date_end) {
		var error = new Error('One or more of the dates you are requesting is blocked (Corp).  Please contact your manager. (Dept: ' + employee.DepartmentId + ')');
		error.user_message = 'One or more of the dates you are requesting is blocked (Corp).  Please contact your manager. (Dept: ' + employee.DepartmentId + ')';
		throw error;
		Exception.throwUserError({
			user_error   : "DATE BLOCKED",
			system_error : `DATE BLOCKED ${start_date} OR ${end_date}`,
		});
	}
	// end block
}

// det_prep
else if (employee.DepartmentId == 9) {
	const joeyd_block = [
		new Date ('2022-06-14')
	];
	// block
	const joeyd_date_start = joeyd_block.find(
		joeyd_date_start =>
		joeyd_date_start.toDateString() === new Date(start_date).toDateString(),
	);

	const joeyd_date_end = joeyd_block.find(
		joeyd_date_end =>
		joeyd_date_end.toDateString() === new Date(end_date).toDateString(),
	);

	if (joeyd_date_start || joeyd_date_end) {
		var error = new Error('One or more of the dates you are requesting is blocked (Detail & Prep).  Please contact your manager. (Dept: ' + employee.DepartmentId + ')');
		error.user_message = 'One or more of the dates you are requesting is blocked (Detail & Prep).  Please contact your manager. (Dept: ' + employee.DepartmentId + ')';
		throw error;
		Exception.throwUserError({
			user_error   : "DATE BLOCKED",
			system_error : `DATE BLOCKED ${start_date} OR ${end_date}`,
		});
	}
	// end block
}

// est_mgmt
else if (employee.DepartmentId == 10||employee.DepartmentId == 11||employee.DepartmentId == 21) {
	const joeyd_block = [
		new Date ('2022-07-05'),
		new Date ('2022-07-08'),
		new Date ('2022-07-11'),
		new Date ('2022-07-12'),
		new Date ('2022-07-15'),
		new Date ('2022-07-29'),
		new Date ('2022-08-01'),
		new Date ('2023-03-17'),
		new Date ('2023-04-10'),
		new Date ('2023-04-11'),
		new Date ('2023-04-12'),
		new Date ('2023-04-13'),
		new Date ('2023-04-14'),
		new Date ('2023-04-17'),
		new Date ('2023-04-18'),
		new Date ('2023-04-19'),
		new Date ('2023-04-20'),
		new Date ('2023-04-21'),
		new Date ('2023-07-03'),
		new Date ('2023-07-04'),
		new Date ('2023-07-05'),
		new Date ('2023-07-06'),
		new Date ('2023-07-07')
	];
	// block
	const joeyd_date_start = joeyd_block.find(
		joeyd_date_start =>
		joeyd_date_start.toDateString() === new Date(start_date).toDateString(),
	);

	const joeyd_date_end = joeyd_block.find(
		joeyd_date_end =>
		joeyd_date_end.toDateString() === new Date(end_date).toDateString(),
	);

	if (joeyd_date_start || joeyd_date_end) {
		var error = new Error('One or more of the dates you are requesting is blocked (Estimators & Managers).  Please contact your manager. (Dept: ' + employee.DepartmentId + ')');
		error.user_message = 'One or more of the dates you are requesting is blocked (Estimators & Managers).  Please contact your manager. (Dept: ' + employee.DepartmentId + ')';
		throw error;
		Exception.throwUserError({
			user_error   : "DATE BLOCKED",
			system_error : `DATE BLOCKED ${start_date} OR ${end_date}`,
		});
	}
	// end block
}

// fom
else if (employee.DepartmentId == 12||employee.DepartmentId == 13) {
	const joeyd_block = [
		new Date ('2022-07-05'),
		new Date ('2022-07-08'),
		new Date ('2022-07-11'),
		new Date ('2022-07-12'),
		new Date ('2022-07-15'),
		new Date ('2022-07-29'),
		new Date ('2022-08-01'),
		new Date ('2023-03-17'),
		new Date ('2023-04-10'),
		new Date ('2023-04-11'),
		new Date ('2023-04-12'),
		new Date ('2023-04-13'),
		new Date ('2023-04-14'),
		new Date ('2023-04-17'),
		new Date ('2023-04-18'),
		new Date ('2023-04-19'),
		new Date ('2023-04-20'),
		new Date ('2023-04-21'),
		new Date ('2023-07-03'),
		new Date ('2023-07-04'),
		new Date ('2023-07-05'),
		new Date ('2023-07-06'),
		new Date ('2023-07-07')
	];
	// block
	const joeyd_date_start = joeyd_block.find(
		joeyd_date_start =>
		joeyd_date_start.toDateString() === new Date(start_date).toDateString(),
	);

	const joeyd_date_end = joeyd_block.find(
		joeyd_date_end =>
		joeyd_date_end.toDateString() === new Date(end_date).toDateString(),
	);

	if (joeyd_date_start || joeyd_date_end) {
		var error = new Error('One or more of the dates you are requesting is blocked (Front Office).  Please contact your manager. (Dept: ' + employee.DepartmentId + ')');
		error.user_message = 'One or more of the dates you are requesting is blocked (Front Office).  Please contact your manager. (Dept: ' + employee.DepartmentId + ')';
		throw error;
		Exception.throwUserError({
			user_error   : "DATE BLOCKED",
			system_error : `DATE BLOCKED ${start_date} OR ${end_date}`,
		});
	}
	// end block
}

// glass
else if (employee.DepartmentId == 14) {
	const joeyd_block = [
		new Date ('2022-06-14')
	];
	// block
	const joeyd_date_start = joeyd_block.find(
		joeyd_date_start =>
		joeyd_date_start.toDateString() === new Date(start_date).toDateString(),
	);

	const joeyd_date_end = joeyd_block.find(
		joeyd_date_end =>
		joeyd_date_end.toDateString() === new Date(end_date).toDateString(),
	);

	if (joeyd_date_start || joeyd_date_end) {
		var error = new Error('One or more of the dates you are requesting is blocked (Glass).  Please contact your manager. (Dept: ' + employee.DepartmentId + ')');
		error.user_message = 'One or more of the dates you are requesting is blocked (Glass).  Please contact your manager. (Dept: ' + employee.DepartmentId + ')';
		throw error;
		Exception.throwUserError({
			user_error   : "DATE BLOCKED",
			system_error : `DATE BLOCKED ${start_date} OR ${end_date}`,
		});
	}
	// end block
}

// it
else if (employee.DepartmentId == 15||employee.DepartmentId == 2||employee.DepartmentId == 16) {
	const joeyd_block = [
		new Date ('2022-06-14')
	];
	// block
	const joeyd_date_start = joeyd_block.find(
		joeyd_date_start =>
		joeyd_date_start.toDateString() === new Date(start_date).toDateString(),
	);

	const joeyd_date_end = joeyd_block.find(
		joeyd_date_end =>
		joeyd_date_end.toDateString() === new Date(end_date).toDateString(),
	);

	if (joeyd_date_start || joeyd_date_end) {
		var error = new Error('One or more of the dates you are requesting is blocked (IT).  Please contact your manager. (Dept: ' + employee.DepartmentId + ')');
		error.user_message = 'One or more of the dates you are requesting is blocked (IT).  Please contact your manager. (Dept: ' + employee.DepartmentId + ')';
		throw error;
		Exception.throwUserError({
			user_error   : "DATE BLOCKED",
			system_error : `DATE BLOCKED ${start_date} OR ${end_date}`,
		});
	}
	// end block
}

// maint
else if (employee.DepartmentId == 17||employee.DepartmentId == 18) {
	const joeyd_block = [
		new Date ('2022-06-14')
	];
	// block
	const joeyd_date_start = joeyd_block.find(
		joeyd_date_start =>
		joeyd_date_start.toDateString() === new Date(start_date).toDateString(),
	);

	const joeyd_date_end = joeyd_block.find(
		joeyd_date_end =>
		joeyd_date_end.toDateString() === new Date(end_date).toDateString(),
	);

	if (joeyd_date_start || joeyd_date_end) {
		var error = new Error('One or more of the dates you are requesting is blocked (Maintenance).  Please contact your manager. (Dept: ' + employee.DepartmentId + ')');
		error.user_message = 'One or more of the dates you are requesting is blocked (Maintenance).  Please contact your manager. (Dept: ' + employee.DepartmentId + ')';
		throw error;
		Exception.throwUserError({
			user_error   : "DATE BLOCKED",
			system_error : `DATE BLOCKED ${start_date} OR ${end_date}`,
		});
	}
	// end block
}

// paint
else if (employee.DepartmentId == 19||employee.DepartmentId == 20) {
	const joeyd_block = [
		new Date ('2022-06-14')
	];
	// block
	const joeyd_date_start = joeyd_block.find(
		joeyd_date_start =>
		joeyd_date_start.toDateString() === new Date(start_date).toDateString(),
	);

	const joeyd_date_end = joeyd_block.find(
		joeyd_date_end =>
		joeyd_date_end.toDateString() === new Date(end_date).toDateString(),
	);

	if (joeyd_date_start || joeyd_date_end) {
		var error = new Error('One or more of the dates you are requesting is blocked (Paint).  Please contact your manager. (Dept: ' + employee.DepartmentId + ')');
		error.user_message = 'One or more of the dates you are requesting is blocked (Paint).  Please contact your manager. (Dept: ' + employee.DepartmentId + ')';
		throw error;
		Exception.throwUserError({
			user_error   : "DATE BLOCKED",
			system_error : `DATE BLOCKED ${start_date} OR ${end_date}`,
		});
	}
	// end block
}

// parts
else if (employee.DepartmentId == 21) {
	const joeyd_block = [
		new Date ('2022-06-14')
	];
	// block
	const joeyd_date_start = joeyd_block.find(
		joeyd_date_start =>
		joeyd_date_start.toDateString() === new Date(start_date).toDateString(),
	);

	const joeyd_date_end = joeyd_block.find(
		joeyd_date_end =>
		joeyd_date_end.toDateString() === new Date(end_date).toDateString(),
	);

	if (joeyd_date_start || joeyd_date_end) {
		var error = new Error('One or more of the dates you are requesting is blocked (Parts).  Please contact your manager. (Dept: ' + employee.DepartmentId + ')');
		error.user_message = 'One or more of the dates you are requesting is blocked (Parts).  Please contact your manager. (Dept: ' + employee.DepartmentId + ')';
		throw error;
		Exception.throwUserError({
			user_error   : "DATE BLOCKED",
			system_error : `DATE BLOCKED ${start_date} OR ${end_date}`,
		});
	}
	// end block
}

// tow
else if (employee.DepartmentId == 22) {
	const joeyd_block = [
		new Date ('2022-06-14')
	];
	// block
	const joeyd_date_start = joeyd_block.find(
		joeyd_date_start =>
		joeyd_date_start.toDateString() === new Date(start_date).toDateString(),
	);

	const joeyd_date_end = joeyd_block.find(
		joeyd_date_end =>
		joeyd_date_end.toDateString() === new Date(end_date).toDateString(),
	);

	if (joeyd_date_start || joeyd_date_end) {
		var error = new Error('One or more of the dates you are requesting is blocked (Towing).  Please contact your manager. (Dept: ' + employee.DepartmentId + ')');
		error.user_message = 'One or more of the dates you are requesting is blocked (Towing).  Please contact your manager. (Dept: ' + employee.DepartmentId + ')';
		throw error;
		Exception.throwUserError({
			user_error   : "DATE BLOCKED",
			system_error : `DATE BLOCKED ${start_date} OR ${end_date}`,
		});
	}
	// end block
}
//}
//}
  const comment = valide_attributes.reason,
    companyId = employee.companyId;

  // Make sure that booking to be created is not going to ovelap with
  // any existing bookings
  return Promise

    .try(() => employee.validate_overlapping(valide_attributes))
    .then(() => employee.promise_boss())
    .then(main_supervisor => {

      const new_leave_status = employee.is_auto_approve()
        ? Models.Leave.status_approved()
        : Models.Leave.status_new();

      // Following statement creates in memory only leave object
      // it is not in database until .save() method is called
      return Promise.resolve(Models.Leave.build({
        userId           : employee.id,
				DepartmentId	 : employee.DepartmentId,
        leaveTypeId      : leave_type.id,
        status           : new_leave_status,
        approverId       : main_supervisor.id,
        employee_comment : valide_attributes.reason,
				time: valide_attributes.time,

        date_start     : start_date.format('YYYY-MM-DD'),
        date_end       : end_date.format('YYYY-MM-DD'),
        day_part_start : valide_attributes.from_date_part,
        day_part_end   : valide_attributes.to_date_part,
      }));
    })

    .then(leave_to_create => employee
      .validate_leave_fits_into_remaining_allowance({
        year       : start_date,
        leave_type : leave_type,
        leave      : leave_to_create,
      })
      .then(() => leave_to_create.save())
    )
    .then(leave => commentLeaveIfNeeded({leave,comment,companyId}).then(() => leave))
    .then(leave => Promise.resolve(leave));
}

const commentLeaveIfNeeded = ({leave,comment, companyId}) => {
  return comment ? commentLeave({leave,comment,companyId}) : Promise.resolve();
};

const getLeaveForUserView = async ({actingUser, leaveId, dbModel}) => {

  const [leave] = await dbModel.Leave.findAll({
    where: {
      id: leaveId,
    },
    include: [{
      model: dbModel.User,
      as: 'user',
      where: {
        companyId: actingUser.companyId,
      }
    }],
  });

  if (!leave) {
    throw new Error(`User [${actingUser.id}] tried to access leave [${leaveId}] which does not belong to the same company.`);
  }

  return leave;
};

const doesUserHasExtendedViewOfLeave = async ({user, leave}) => {
  if (user.companyId !== (await leave.getUser()).companyId) {
    throw new Error(`User [${user.id}] and leave [${leave.id}] do not share company.`);
  }

  let extendedView = false;

  if (user.is_admin()) {
    extendedView = true;
  }

  if (! extendedView) {
    const reports = await user.promise_supervised_users();

    if (reports.filter(u => `${u.id}` === `${leave.userId}`).length > 0) {
      extendedView = true;
    }
  }

  return extendedView;
};

module.exports = {
  createNewLeave,
  doesUserHasExtendedViewOfLeave,
  getLeaveForUserView,
}
