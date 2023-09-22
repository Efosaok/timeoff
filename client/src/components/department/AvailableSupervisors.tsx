import React from 'react';

const AvailableSupervisors = () => {
  return (
    <div className="list-group">
        {/* {{# if users }} */}
        {/* {{#each users}} */}
          {/* <label class="list-group-item label-plain"><input type="checkbox" name="supervisor_id" value="{{ this.id }}" {{#if this._marked }} checked=checked {{/if}}> {{ this.full_name }}</label> */}
        {/* {{/each}} */}
      
      {/* {{else}} */}
        <p>No employees axvailable to be added as secondary supervisors.</p>
        <p> <a href="/users/add/" data-vpp-add-supervisor-modal-add-new-user="1" />Add new employee <i className="fa fa-angle-double-right"></i></p>
      {/* {{/if}} */}
    </div>
  );
};

export default AvailableSupervisors;
