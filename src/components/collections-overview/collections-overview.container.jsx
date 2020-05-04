import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors'
import WithSpinner from '../with-wpinner/with-wpinner.component'
import CollectionsOverview from './collections-overview.component'
import { connect } from 'react-redux'

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
})

// Right from left
const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner,
)(CollectionsOverview)

export default CollectionsOverviewContainer
