import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { devHost, proHost } from 'Config'

const host = process.env.NODE_ENV === 'development' ? devHost : proHost

function DownloadFile(props) {
  const { AID, UUID, section, children, xls, CID, OID, TName } = props
  const txt = children || '下載'
  const relatedUrl = getRelatedUrl(props)
  const cnt = ((AID && UUID) || xls || (CID && OID) || (CID && TName)) ? (
    <a
      href={relatedUrl}
      // target='_blank'
      download
      className='w3-hover-text-blue'
    >{txt}</a>
  ) : '尚未上傳'
  return (
    <div className={classNames({ 'w3-section': section })}>
      {section ? ((AID && UUID) || xls || (CID && OID)) ? <>【{cnt}】</> : cnt : cnt}
    </div>
  )
}

function getRelatedUrl(props) {
  const {
    AID, UUID, related, xls, TName, TDes, CID, OID,
    isManager, isReviewer, isMeeting
  } = props
  if (related) return `${host}api/relatedFiles/${AID}/file/${UUID}`
  if (xls) {
    if (TName && TDes) return `${host}file/xls/n/${TName}_${TDes.replace('/', '')}.xlsx`
    return `${host}file/xls/g/核定文號.xlsx`
  }
  if (CID && OID) {
    if (isReviewer) return `${host}api/activity/${CID}/docxProcessorReview/${OID}`
    return `${host}api/activity/${CID}/docxProcessor/${OID}`
  }
  if (CID && TName) {
    if (isMeeting) return `${host}api/activity/${CID}/docxProcessorMeeting/${TName}`
    return `${host}api/activity/${CID}/${TName}`
  }
  if (isManager) return `${host}api/file/adm/${AID}/uploadPDF/${UUID}`
  return `${host}api/file/${AID}/uploadPDF/${UUID}`
}

DownloadFile.defaultProps = {
  section: true
}

DownloadFile.propTypes = {
  AID: PropTypes.number,
  UUID: PropTypes.string,
  section: PropTypes.bool,
  children: PropTypes.string,
  related: PropTypes.bool,
  xls: PropTypes.bool,
  TName: PropTypes.string,
  TDes: PropTypes.string,
  isManager: PropTypes.bool,
  CID: PropTypes.string,
  OID: PropTypes.number,
  isReviewer: PropTypes.bool,
  isMeeting: PropTypes.bool
}

export default DownloadFile