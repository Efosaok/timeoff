import React from "react";
import Page from "../../components/partials/bits/Page";
import AddBlockedView from "../../components/partials/modals/AddBlockedView";
import BlockedViewItem from "./BlockedViewItem";
import useBlockViews from "./hooks/useBlockedViews";



const BlockedViews = () => {
  const { isLoading, res, toggleModal } = useBlockViews();

  return (
    <Page isLoading={isLoading} error="">
      <div className="blocked-views">
        <h1>Blocked Views</h1>

         <div className="row">
          <div className="col-md-6 lead">
            All blocked views for Rocco Collison
          </div>
          <div className="col-md-3 col-md-offset-3">
            <div className="btn-group pull-right">
              <button onClick={toggleModal} type="button" className="btn btn-default" aria-haspopup="true" aria-expanded="false">
                Add new
                <span className="sr-only">Toggle Dropdown</span>
              </button>
            </div>
          </div>
        </div>

        <div className="row">&nbsp;</div>

        {!res?.views?.length ? (
          <div className="text-center">
            <h4>Blocked views will appear here.</h4>
          </div>
        ): (
          <div className="blocked-views-list">
            <div className="row">
            <div className="col-md-4"><label className="control-label">Date</label></div>
            <div className="col-md-6"><label className="control-label">Blocked View Name</label></div>
          </div>
          <div className="row">&nbsp;</div>

          {res?.views?.map((view: any, i: number) => (
            <BlockedViewItem key={view?.id} {...view} />
          ))}
          </div>
        )}

      </div>
      <AddBlockedView toggleModal={toggleModal} />
    </Page>
  );
};

export default BlockedViews;
