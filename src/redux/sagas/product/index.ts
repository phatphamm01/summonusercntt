import { all, takeLatest } from "redux-saga/effects";
import {
  getAllProducts,
  getFacets,
  getProductsByType,
  getProductDetail,
} from "@redux/slides/product";
import {
  getAllProductsSaga,
  getProductDetailSaga,
  getProductsByTypeSaga,
} from "./product";
import { getFacetsSaga } from "./facet";

export default function* productSaga() {
  yield all([
    takeLatest(getProductsByType.type, getProductsByTypeSaga),
    takeLatest(getAllProducts.type, getAllProductsSaga),
    takeLatest(getProductDetail.type, getProductDetailSaga),
    takeLatest(getFacets.type, getFacetsSaga),
  ]);
}
