import moment from "moment";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import CalendarCell from "../../components/partials/bits/CalendarCell";
import FlashMessages from "../../components/partials/bits/FlashMessages";
import Page from "../../components/partials/bits/Page";
import ActionButton from "../../components/partials/button/ActionButton";
import AddBankHoliday from "../../components/partials/modals/AddBankHoliday";
import useBankHolidays from "./useBankHolidays";

const BankHolidays = () => {
  const {
    res,
    isLoading,
    toggleModal,
    deleteBankHoliday,
    showDeletingLoader,
    messages,
    onChange,
    errors,
    saveHolidays,
    savingHolidays,
  } = useBankHolidays();

  return (
    <Page isLoading={isLoading} error="">
      <div className="bank-holidays">
        <h1>Bank holidays</h1>

        <div className="row">
          <div className="col-md-6 lead">
            Public holidays for {res?.company?.name}`s account in {res?.yearCurrent}
          </div>
          <div className="col-md-3 col-md-offset-3">
            <div className="btn-group pull-right">
              <button type="button" className="btn btn-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span aria-hidden="true" className="fa fa-plus" /> Add new <span className="caret" />
                <span className="sr-only">Toggle Dropdown</span>
              </button>
              <ul className="dropdown-menu">
                <li><Link to="#" id="bankholiday-import-btn">Import default holidays for
                {res?.yearCurrent}
                </Link></li>
                <li><Link to="#" id="add_new_department" onClick={toggleModal}>Add new bank holiday</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row">&nbsp;</div>

        <FlashMessages messages={messages} errors={errors} />

        <div className="row">
          <div className="col-xs-2">
            <Link className="btn btn-default" to={`?year=${res?.yearPrev}`}><span aria-hidden="true" className="fa fa-chevron-left"></span>
            {res?.yearPrev}
            </Link>
          </div>
          <div className="col-xs-8 calendar-section-caption">
            <strong>January - December {res?.yearCurrent}</strong>
          </div>
          <div className="col-xs-2">
            <Link className="btn btn-default pull-right" to={`?year=${res?.yearNext}`}>
              {res?.yearNext}
            <span aria-hidden="true" className="fa fa-chevron-right"></span></Link>
          </div>
        </div>

        <div className="row">&nbsp;</div>

        <div className="row clearfix">
          <div className="col-md-8">
            <div className="row">
              {res?.calendar?.map((calendar: any) => (
                <div className="col-md-4 month_container">
                  <table className={`calendar_month month_${calendar?.month}`}>
                  <thead>
                    <tr>
                      <td colSpan={14}>
                        {calendar?.month}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>S</td>
                      <td colSpan={2}>M</td>
                      <td colSpan={2}>T</td>
                      <td colSpan={2}>W</td>
                      <td colSpan={2}>T</td>
                      <td colSpan={2}>F</td>
                      <td colSpan={2}>S</td>
                    </tr>
                  </thead>
                  <tbody>
                    {calendar?.weeks?.map((week: any) => (
                      <tr>
                        {week?.map((day: any) => (
                          <CalendarCell day={day} />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              ))}
            </div>
          </div>

          <div className="col-md-4">

            <div className="row">
              <div className="col-md-4"><label className="control-label">Date</label></div>
              <div className="col-md-6"><label className="control-label">Holiday Name</label></div>
            </div>

            <div className="row">&nbsp;</div>


            {!res?.bankHolidays?.length ? (
              <div className="row">
                <div className="col-md-12 tst-no-bank-holidays text-center">No Bank holiday records</div>
              </div>
            ): null}
  
              <form id="import_bankholiday_form" method="post" action="/settings/bankholidays/import/?year={{yearCurrent}}"></form>
              <form id="update_bankholiday_form" method="post" action="/settings/bankholidays/?year={{yearCurrent}}">
                {res?.bankHolidays?.map((holiday: any, i: number) => (
                  <Fragment key={holiday?.id}>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="input-append date">
                        <input type="text" className="form-control" defaultValue={moment(holiday?.date).format('MM/DD/YY')} name={`date__${holiday?.id}`} tom-test-hook={`date__${i}`} data-date-autoclose="1" data-provide="datepicker" data-date-format="mm/dd/yy" data-date-week-start="1" />
                        <span className="add-on"><i className="icon-th"></i></span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <input onChange={onChange} type="text" className="form-control" defaultValue={holiday?.name} name={`name__${holiday?.id}`} />
                      </div>
                      <div className="col-md-2">
                        <ActionButton
                          nativeProps={{
                            className: 'btn btn-default pull-right bankholiday-remove-btn',
                            type: 'button',
                            onClick: () => deleteBankHoliday(holiday?.id),
                          }}
                          isLoading={showDeletingLoader(holiday?.id)}
                        >
                          {!showDeletingLoader(holiday?.id) ? <span className="fa fa-remove" /> : null}
                        </ActionButton>
                      </div>
                    </div>

                  <div className="row">&nbsp;</div>
                  </Fragment>
                ))}

                <div className="row">&nbsp;</div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="pull-right">
                      {/* {{ <button id="bankholiday-import-btn" className="btn btn-default" type="button">Import default holidays</button> }} */}
                      <button onClick={toggleModal} className="btn btn-default" type="button" id="add_new_bank_holiday_btn">Add new</button>{' '}
                      {res?.bankHolidays?.length ? (
                        <ActionButton
                          nativeProps={{
                            type: 'button',
                            className: 'btn btn-success single-click',
                            onClick: saveHolidays,
                          }}
                          text="Save changes"
                          isLoading={savingHolidays}
                        />
                      ): null}
                    </div>
                  </div>
                </div>
              </form>

            </div>
          </div>

          <div className="row">&nbsp;</div>
          <AddBankHoliday yearCurrent={res?.yearCurrent} toggleModal={toggleModal} />
      </div>
    </Page>
  )
};

export default BankHolidays;
