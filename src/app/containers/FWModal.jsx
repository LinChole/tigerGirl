import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "../components/Modal"
import {toggleModalStart,toggleModal,closeModal} from "../actions/modal"

const mapStateToProps = (state) => ({
    ...state.modal
});

export default connect(mapStateToProps, {
    toggleModalStart,
    toggleModal,
    closeModal
})(Modal);