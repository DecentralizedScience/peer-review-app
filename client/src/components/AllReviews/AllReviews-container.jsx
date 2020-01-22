import jsPDF from 'jspdf';
import 'jspdf-autotable';
import PropTypes from 'prop-types';
import React from 'react';
import { getAllBlockchainReviews, getAllDatabaseReviews } from '../../utils/review';
import Loader from '../Loader';
import AllReviewsView from './AllReviews-view';


export default class AllReviewsContainer extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    isUserLoading: PropTypes.bool.isRequired,

  }

  constructor(props) {
    super(props);
    this.state = {
      isReviewsLoading: true,
      DBreviews: [],
      blockchainReviews: []
    };
    this.tableRef = React.createRef();
  }

  componentDidMount() {
    this.fetchAllReviews().then(reviews => {
      console.log('Reviews are here!');
      console.log(reviews);
      this.setState({ DBreviews: reviews[0], blockchainReviews: reviews[1], isReviewsLoading: false });
    });
  }

  fetchAllReviews = () => {
    let address = this.props.user._id;
    return Promise.all([getAllDatabaseReviews(address), getAllBlockchainReviews()]);
  }

  savePDF = () => {
    const doc = new jsPDF();
    console.log(this.tableRef.current);
    doc.autoTable({
      html: this.tableRef.current,
    });
    doc.save('bloxberg-peer-reviews.pdf');
  }

  render() {
    if (this.state.isReviewsLoading) {
      return (<Loader />);
    }
    return (
      <AllReviewsView {...this.props} {...this.state} savePDF={this.savePDF} tableRef={this.tableRef} />
    );
  }
}