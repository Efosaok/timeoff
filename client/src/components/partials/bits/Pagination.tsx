import classNames from "classnames";
import React, { FC } from "react";
import { Link } from "react-router-dom";

interface PagerProps {
  pager: any;
  userId?: string
}

const Pagination: FC<PagerProps> = ({ pager, userId }) => (
  <div className="pager">
    <ul className="pagination">
      <li
        className={classNames({ disabled: pager?.page_prev })}
      >
          <span>
            {pager?.page_prev ? (
              <Link to={`?user_id=${userId}&page=${pager?.page_prev}`}>
                &laquo; Prev
              </Link>
              ): <>&laquo; Prev</>
            }
          </span>
      </li>
          <li>
            <span>
              <Link to={`?user_id=${userId}&page=${pager?.page}`}>
                {pager?.page} of {pager?.page_qnty}
              </Link>
            </span>
          </li>
      <li className={classNames({ disabled: pager?.page_next })}>
        <span>
          {
            pager?.page_next ? (
              <Link to={`?user_id=${userId}&page=${pager?.page_next}`}>
                Next &raquo;
              </Link>
            ): <>Next &raquo;</>
          }
        </span>
      </li>
    </ul>
  </div>
);

export default Pagination;
