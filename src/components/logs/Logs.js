import React, { useEffect, useState } from "react";
import LogItems from "./LogItems";
import Preloader from "../layout/Preloader";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLogs } from "../../actions/logActions";

const Logs = ({ log: { logs, loading }, getLogs }) => {
  useEffect(() => {
    getLogs();
  }, []);

  if (loading || logs === null) {
    return <Preloader />;
  }

  return (
    <ul className="collection with-header">
      <li className="collection-header">
        <h4>System logs</h4>
      </li>
      {!loading && logs.length === 0 ? (
        <p className="center">No logs to show</p>
      ) : (
        logs.map((log) => <LogItems log={log} key={log.id} />)
      )}
    </ul>
  );
};

Logs.propTypes = {
  log: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  log: state.log,
});

export default connect(mapStateToProps, { getLogs })(Logs);
