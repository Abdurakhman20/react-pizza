import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/index";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";

const Home = () => {
  const dispatch = useDispatch();
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

  const getApiData = async () => {
    setIsLoading(true);
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    axios
      .get(
        `https://644feb3cba9f39c6ab6fd55e.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortProp}&order=${sortMethod}${search}`
      )
      .then((response) => {
        setPizzasData(response.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  };
  React.useEffect(() => {
    getApiData();
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
