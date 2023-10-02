export const isPendedRevokeLeave = (status: number) => status === 4;
export const isNew = (status: number) => status === 1;
export const isRejected = (status: number) => status === 3;
export const isApproved = (status: number) => status === 2;
export const isCancelled = (status: number) => status === 5;

export const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

export const formatScheduleToApiFormat = (schedule: any) => {
  const formattedSchedule: Record<string, string> = {};
  if (schedule.company_id) formattedSchedule.company_wide = schedule.company_id;
  if (schedule.monday === 1) formattedSchedule.monday = 'on';
  if (schedule.tuesday === 1) formattedSchedule.tuesday = 'on';
  if (schedule.wednesday === 1) formattedSchedule.wednesday = 'on';
  if (schedule.thursday === 1) formattedSchedule.thursday = 'on';
  if (schedule.friday === 1) formattedSchedule.friday = 'on';
  if (schedule.saturday === 1) formattedSchedule.saturday = 'on';
  if (schedule.sunday === 1) formattedSchedule.sunday = 'on';

  return formattedSchedule;
}

export const formatUpdateSettingsInputPreflight = (res: Record<any, any>, inputs: Record<string, string>) => ({
  country: res?.company?.country,
  name: res?.company?.name,
  date_format: res?.company?.date_format,
  timezone: res?.company?.timezone,
  carry_over: res?.company?.carry_over,
  share_all_absences: (!inputs?.share_all_absences && !res?.shareAllAbsences) ? undefined : 'on',
  is_team_view_hidden: (!inputs?.is_team_view_hidden && !res?.isTeamViewHidden) ? undefined : 'on',
  ...inputs,
});