import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import qs from "qs";

import Categories from "../components/Categories";
import Sort, { SORT_ITEMS_LIST } from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/index";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortProp = useSelector((state) => state.filter.sortType.sortProp);
  const sortMethod = useSelector((state) => state.filter.sortMethod);
  const currentPage = useSelector((state) => state.filter.currentPage);

  const { searchValue } = React.useContext(SearchContext);
  const [pizzasData, setPizzasData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  //const [currentPage, setCurrentPage] = React.useState(1);

  const onChangeCategory = (index) => {
    dispatch(setCategoryId(index));
  };
  const onChangePageHandler = (pageCount) => {
    dispatch(setCurrentPage(pageCount));
  };

  React.useEffect(() => {
    // Если не было первого рендера, тогда не надо вшивать в адресную строчку параметры
    if (isMounted.current) {
      const querryString = qs.stringify({
        sortProp,
        categoryId,
        currentPage,
        sortMethod,
      });
      navigate(`?${querryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortProp, sortMethod, searchValue, currentPage]);

  React.useEffect(() => {
    // Если был первый рендер, то сохраняем URL-параметры и сохраняем в redux
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      console.log(params);
      const sort = SORT_ITEMS_LIST.find(
        (obj) => obj.sortProp === params.sortProp
      );
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  const getApiData = async () => {
    setIsLoading(true);
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    const res = await axios.get(
      `https://644feb3cba9f39c6ab6fd55e.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortProp}&order=${sortMethod}${search}`
    );
    setPizzasData(res.data);
    setIsLoading(false);
    window.scrollTo(0, 0);
  };
  React.useEffect(() => {
    // Если был первый рендер, то запрашиваем пиццы
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getApiData();
    }
    isSearch.current = false;
  }, [categoryId, sortProp, sortMethod, searchValue, currentPage]);

  const pizzasArr = pizzasData.map((pizza) => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ));
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(index) => onChangeCategory(index)}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzasArr}</div>
      <Pagination
        currentPage={currentPage}
        onChangePage={(pageCount) => onChangePageHandler(pageCount)}
      />
    </div>
  );
};

export default Home;
