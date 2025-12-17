import { connect } from "react-redux";
import Home from "../../components/clients/Home";
import {
  getHomePageImages
} from "../../actions/homePage";

const mapStateToProps = (state) => ({
  slideshowImg: state.slidesImages
});

export default connect(mapStateToProps, {
  getHomePageImages
})(Home);